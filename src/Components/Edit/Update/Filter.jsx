import React, { useRef } from 'react';
import useFilter from "../../../CustomHooks/useFilter";
import { useDispatch } from 'react-redux';
import { addUpdate, resetUpdate } from '../../../utils/ReduxStore/currentSearchSlice';

const Filter = (props) => {
    const {form,setForm} = props;
//   const [form, setForm] = useState({
//     type: "expense",
//     amount: "",
//     category: "",
//     dateFrom: new Date().toISOString().split("T")[0],
//     dateTo: new Date().toISOString().split("T")[0],
//   });
    const dispatch = useDispatch();


  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const formatDateToInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const openCalendar = (ref) => {
    if (ref.current) {
      ref.current.showPicker?.();
      ref.current.focus();
    }
  };

  const { handleRangeSearch } = useFilter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSaveClick = async () => {
    dispatch(resetUpdate());
    await handleRangeSearch(form, setForm,1,dispatch,addUpdate);
  } ;

  return (
    <div className="mx-auto mb-10 p-6 rounded-lg max-w-3xl bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Filter Transactions</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-white p-4 rounded shadow w-full">

        {/* Type & Amount */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block text-gray-800 font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="" >Both</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-800 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Category */}
        <label className="block text-gray-800 font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-900"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
          <option value="Investment">Investment</option>
        </select>

        {/* From & To Dates */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <label className="block text-gray-800 font-medium">From</label>
            <input
              ref={fromInputRef}
              type="date"
              name="dateFrom"
              value={formatDateToInput(form.dateFrom)}
              onChange={handleChange}
              className="w-full p-2 text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
            />
            <div
              className="absolute top-1/2 right-3 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => openCalendar(fromInputRef)}
            >
              <i className="material-icons">calendar_month</i>
            </div>
          </div>

          <div className="flex-1 relative">
            <label className="block text-gray-800 font-medium">To</label>
            <input
              ref={toInputRef}
              type="date"
              name="dateTo"
              value={formatDateToInput(form.dateTo)}
              onChange={handleChange}
              className="w-full p-2 text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
            />
            <div
              className="absolute top-1/2 right-3 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => openCalendar(toInputRef)}
            >
              <i className="material-icons">calendar_month</i>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">Format: MM-DD-YYYY (or use calendar)</p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
          onClick={handleSaveClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Filter;
