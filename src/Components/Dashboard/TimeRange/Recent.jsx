import React from "react";
import { useDispatch } from "react-redux";
import { addRecentAdded, resetRecentAdded } from "../../../utils/ReduxStore/currentSearchSlice";
import useFilter from "../../../CustomHooks/useFilter";

const Recent = ({ form, setForm }) => {
  const dispatch = useDispatch();
  const { handleRangeSearch } = useFilter();

  // helper to format yyyy-mm-dd
  const formatLocal = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRecentChange = async (e) => {
    const val = parseInt(e.target.value, 10);
    if (!val) return;

    const today = new Date();
    const startDate = new Date(today.getTime() - val * 24 * 60 * 60 * 1000);

    const formattedStart = formatLocal(startDate);
    const formattedEnd = formatLocal(today);

    // reset other fields, set only date range
    const updatedForm = {
      type: "",
      amount: "",
      category: "",
      dateFrom: formattedStart,
      dateTo: formattedEnd,
    };

    setForm(updatedForm);

    // console.log( "I am in recent Form :" );
    // console.log(updatedForm);
    // console.log()

    // clear redux old state then trigger search
    dispatch(resetRecentAdded());
    await handleRangeSearch(updatedForm, setForm, 1, dispatch, addRecentAdded );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <label className="block text-gray-800 font-medium mb-2">
        Show Last Transactions
      </label>
      <select
        onChange={handleRecentChange}
        defaultValue=""
        className="w-full p-2 border rounded text-gray-900"
      >
        <option value="" disabled>
          Select Range
        </option>
        <option value="10">Last 10 days</option>
        <option value="20">Last 20 days</option>
        <option value="30">Last 30 days</option>
        <option value="40">Last 40 days</option>
      </select>
    </div>
  );
};

export default Recent;
