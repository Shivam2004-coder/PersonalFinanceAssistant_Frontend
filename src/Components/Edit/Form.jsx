import React, { useRef, useState } from 'react'
import useAdd from "../../CustomHooks/useAdd";

const Form = (props) => {

    const { form, setForm , which} = props;

    // const [date, setDate] = useState(form.date);
    const dateInputRef = useRef(null);
    const handleDateChange = (e) => {
        // setDate(e.target.value);
        setForm({ ...form, ["date"]: e.target.value });
    };

    const formatDateToInput = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const openCalendar = () => {
        if (dateInputRef.current) {
        dateInputRef.current.showPicker?.(); // For modern browsers
        dateInputRef.current.focus();        // Fallback
        }
    };

    const { handleSubmit } = useAdd();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSaveTransactionClick = async () => {
        await handleSubmit(form, setForm , which);
    }


  return (
    <div>
        <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4 bg-white relative p-4 rounded shadow"
      >
        {/* Type */}
        <div className="flex justify-between items-center space-x-4">
            <div className="w-full justify-between items-center" >
                <label className="block text-gray-800 font-medium">Type</label>
                <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full p-2 border rounded text-gray-900"
                >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                </select>
            </div>
            {/* Amount */}
            <div className="w-full" >
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
          <option value="others">Other</option>
        </select>

        {/* Notes */}
        <label className="block text-gray-800 font-medium">Notes</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Optional note..."
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
        />

        <label className="block text-gray-800 font-medium">Date</label>
        <div className="relative">
        <input
          ref={dateInputRef}
          type="date"
          value={formatDateToInput(form.date)}
          onChange={handleDateChange}
          className="w-full p-2 text-sm md:text-lg pr-12 text-black border-none bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
        />

        {/* Custom Calendar Icon */}
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-700 hover:text-black"
          onClick={openCalendar}
        >
          <i className="material-icons">calendar_month</i>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-1">Format: MM-DD-YYYY (or use calendar)</p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
          onClick={handleSaveTransactionClick}
        >
          { which === "add" ? "Add Transaction" : "Update Transaction"}
        </button>
      </form>
    </div>
  )
}

export default Form