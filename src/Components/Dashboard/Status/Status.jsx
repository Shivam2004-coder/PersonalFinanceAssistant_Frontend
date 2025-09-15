import React from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Status = () => {
  // Fetch data from Redux
  const income = useSelector((store) => store.profile.income || 0);
  const expense = useSelector((store) => store.profile.expense || 0);
  const savings = Math.max( income - expense , 0 );
  const loss = expense > income ? expense - income : 0;

  // Percentages
  const expensePercent = Math.min((expense / income) * 100 , 100 );
  const savingsPercent = Math.min((savings / income) * 100, 100);
  // const savingsPercent = savings >= 0 ? (savings / income) * 100 : 0;
  const overflowPercent = expense > income ? Math.min(((expense - income) / income) * 100 , 100 ) : 0;

  return (
    <div className="flex flex-col justify-between">
      <div className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Total Income */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow shadow-black flex flex-col justify-around items-center">
          <h2 className="text-3xl text-center font-bold text-gray-900">Total Income</h2>
          <p className="text-3xl mt-2 text-gray-700">&#8377; {income}</p>
        </div>

        {/* Expense */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow shadow-black flex flex-col items-center relative">
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={expensePercent}
              text={`${expensePercent.toFixed(1)}%`}
              styles={buildStyles({
                textColor: "#111827", // dark gray for text
                pathColor: "#ef4444", // red for expense
                trailColor: "#e5e7eb", // light gray background
                strokeLinecap: "round",
                textSize: "18px",
              })}
            />
          </div>
          <p className="mt-4 text-gray-700 text-xl">Expense: &#8377; {expense}</p>
        </div>

        {/* Savings */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow shadow-black flex flex-col items-center relative">
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={savingsPercent}
              text={`${savingsPercent.toFixed(1)}%`}
              styles={buildStyles({
                textColor: "#111827",
                pathColor: "#10b981", // green for savings
                trailColor: "#e5e7eb",
                strokeLinecap: "round",
                textSize: "18px",
              })}
            />
          </div>
          <p className="mt-4 text-gray-700 text-xl ">Savings: &#8377; {savings}</p>
        </div>

        {/* Overflow */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow shadow-black flex flex-col items-center relative">
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={overflowPercent}
              text={`${overflowPercent.toFixed(1)}%`}
              styles={buildStyles({
                textColor: "#111827", // dark gray for text
                pathColor: "#8B0000", // red for expense
                trailColor: "#e5e7eb", // light gray background
                strokeLinecap: "round",
                textSize: "18px",
              })}
            />
          </div>
          <p className="mt-4 text-gray-700 text-xl">Debt: &#8377; {loss}</p>
        </div>

      </div>
      {/* Note for percentages */}
      <div className="w-full text-left mt-2  text-gray-900 text-sm">
        * Percentages are calculated relative to total income
      </div>
    </div>
  );
};

export default Status;
