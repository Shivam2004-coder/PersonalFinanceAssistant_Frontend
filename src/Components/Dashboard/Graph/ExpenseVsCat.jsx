import { useState } from "react";
import { useGraph } from "../../../CustomHooks/useGraph";
import { useDispatch, useSelector } from "react-redux";
import { setExpVsCatSearch } from "../../../utils/ReduxStore/graphSlice";

import GraphPie from "./GraphPie";
import GraphBar from "./GraphBar";
import GraphLine from "./GraphLine";

const ExpenseVsCat = () => {
  const { handleSearch } = useGraph();
  const [range, setRange] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const expVsCatSearch = useSelector((store) => store.graph.expVsCatSearch);
  const dispatch = useDispatch();

  const formatLocal = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = async (e) => {
    const newRange = e.target.value;
    setRange(newRange);

    const today = new Date();
    let daysToSubtract = 0;

    switch (newRange) {
      case "yesterday":
        daysToSubtract = 1;
        break;
      case "week":
        daysToSubtract = 7;
        break;
      case "month":
        daysToSubtract = 30;
        break;
      default:
        daysToSubtract = 0;
    }

    const startDate = new Date(
      today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
    );

    const formattedStart = formatLocal(startDate);
    const formattedEnd = formatLocal(today);

    // console.log("Searching from", formattedStart, "to", formattedEnd);

    await handleSearch(
      formattedStart,
      formattedEnd,
      dispatch,
      setExpVsCatSearch
    );
  };

  return (
    <div
      className={`p-4 shadow rounded-xl transition-all duration-300 ${
        isOpen ? "bg-gray-700 text-white" : "bg-gray-600 text-gray-200"
      }`}
    >
      {/* Accordion Header */}
      <div className="flex justify-between items-center cursor-pointer">
        <h2 className="font-bold text-lg">Expenses vs Category</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded-lg transition-transform duration-300"
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-6">
          {/* Dropdown */}
          <select
            value={range}
            onChange={(e) => handleChange(e)}
            className="p-2 border rounded-lg bg-gray-500 text-white w-48"
          >
            <option value="" disabled hidden>
              Select
            </option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>

          {/* Charts side by side */}
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Pie Chart */}
            <GraphPie graphData={expVsCatSearch} which={"expenseVsCat"} />

            {/* Bar Chart */}
            <GraphBar graphData={expVsCatSearch} which={"expenseVsCat"} />

            {/* Line Chart */}
            <GraphLine graphData={expVsCatSearch} which={"expenseVsCat"} />

          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseVsCat;