import React, { useState } from "react";
import Filter from "./Filter";
import Recent from "./Recent"; // make sure you have this component
import TimeRangeSearch from "./TimeRangeSearch";
import ExportPDFButton from "./ExportPDFButton";

const TimeRange = () => {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
  });

  const [formRecent, setFormRecent] = useState({
    type: "expense",
    amount: "",
    category: "",
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
  });

  const [activeTab, setActiveTab] = useState("recent"); // "recent" or "range"

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">

      {/* Tab Switcher */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "recent"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 hover:bg-gray-400"
          }`}
          onClick={() => setActiveTab("recent")}
        >
          Recent
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "range"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 hover:bg-gray-400"
          }`}
          onClick={() => setActiveTab("range")}
        >
          Range Search
        </button>
      </div>

      {/* Conditional Render */}
      <div>
        {activeTab === "recent" && <Recent form={formRecent} setForm={setFormRecent} />}
        {activeTab === "range" && <Filter form={form} setForm={setForm} />}
      </div>

      {/* Always Show UpdateSearch */}
      <div className="mt-4">
        { activeTab === "recent" && <TimeRangeSearch form={formRecent} setForm={setFormRecent} which={activeTab} /> }
        { activeTab === "range" && <TimeRangeSearch form={form} setForm={setForm} which={activeTab} /> }
        
      </div>

      <div>
        { activeTab === "recent" && <ExportPDFButton form={formRecent} setForm={setFormRecent} which={activeTab} /> }
        { activeTab === "range" && <ExportPDFButton form={form} setForm={setForm} which={activeTab} /> }
      </div>
      
        <p className="text-xs text-gray-500 mt-1 italic">
          * Only the top 100 transactions from the selected range will be exported
        </p>


    </div>
  );
};

export default TimeRange;
