import React, { useState } from "react";
import Form from "../Form";

// import your redux actions like addTransaction, updateTransaction

const Edit = () => {
    


    

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  

  console.log("Form State:", form);

  return (
    <div className="mx-auto m-10 p-6 max-w-2xl bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Add Transaction
      </h2>

      {/* Transaction Form */}
      <Form form={form}
      setForm={setForm}
      which={"add"}
      />

      
    </div>
  );
};

export default Edit;
