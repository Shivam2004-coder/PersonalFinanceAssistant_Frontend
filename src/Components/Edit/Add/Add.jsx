import React, { useState, useRef } from "react";
import Form from "../Form";
import useUpload from "../../../CustomHooks/useUpload";
import {Buffer} from "buffer";

const Edit = () => {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  // console.log("inside the Edit !",form);

  const [loading, setLoading] = useState(false); // new state
  const { handleScanPDF } = useUpload();
  const fileInputRef = useRef(null);

  // Called when user clicks "Auto-fill with invoice"
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Called when a file is selected
  const handleFileChange = async (e) => {

      setLoading(true); // start loading
      const fileUpload = await e.target.files[0].arrayBuffer();
      try {
        // console.log(file);
        const file = {
          type: e.target.files[0].type,
          file: Buffer.from(fileUpload).toString("base64"),
          imageUrl: e.target.files[0].type.includes("pdf") ? "/document-icon.png" : URL.createObjectURL(e.target.files[0])
        }
        // console.log(file);
        const parsedData = await handleScanPDF(file);

        if (parsedData) {
          // Normalize date into YYYY-MM-DD
          let date = new Date(parsedData.date);
          // let normalizedDate = new Date(parsedData.date).toISOString().split("T")[0];
          // console.log(date);
          // console.log(normalizedDate);
          setForm({
            type: parsedData.type,
            amount: parsedData.amount,
            category: parsedData.category,
            note: parsedData.notes,   
            date: date,
          });
        }

      } catch (err) {
        console.error(err);
      } finally {
        
        setLoading(false); // stop loading
      }
  };

  return (
    <div className="mx-auto m-10 p-6 max-w-2xl bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Add Transaction
      </h2>

      <div className="flex flex-col justify-between w-full">
        <div className="bg-blue-600 p-2 text-center rounded-sm">
          {/* <input 
            type="file" 
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleUploadClick}
          /> */}
          <button
            className={`p-4 w-full shadow shadow-white rounded-xl cursor-pointer ${
              loading
                ? "bg-gray-300 animate-pulse"
                : "bg-gray-400 hover:bg-gray-300 active:bg-gray-400"
            }`}
            onClick={handleUploadClick}
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 bg-gray-400 rounded w-1/2 mx-auto" />
            ) : (
              <p className="text-black">Auto-fill with invoice</p>
            )}
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <p className="text-black p-4 text-center">--OR--</p>

        {/* Transaction Form */}
        <Form form={form} setForm={setForm} which={"add"} />
      </div>
    </div>
  );
};

export default Edit;
