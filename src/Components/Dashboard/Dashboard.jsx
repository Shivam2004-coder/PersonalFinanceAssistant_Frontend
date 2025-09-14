import { useState } from "react";
import Status from "./Status/Status";
import Graph from "./Graph/Graph";
import TimeRange from "./TimeRange/TimeRange";

const Dashboard = () => {
  const[isClicked,setIsClicked]=useState(true);
  const[isTransactionClicked , setIsTransactionClicked] = useState(true);

  return (
    <div>
      <div className="p-2 w-6xl my-4 flex flex-col shadow shadow-black justify-between bg-gray-400 rounded-2xl ">
        {/* Total Income (large screens) */}

        <div className="text-center flex justify-between md:text-left m-2">
          <h2 className="text-2xl font-bold text-gray-900">Current Status</h2>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-2xl cursor-pointer"
            onClick={()=>setIsClicked(!isClicked)}
          >
            {isClicked ? "▲" : "▼"}
          </button>
        </div>
        {isClicked &&
          <Status />
        }
      </div>

      <div className="p-2 w-6xl my-4 flex flex-col shadow shadow-black justify-between bg-gray-400 rounded-2xl ">
        <Graph />
      </div>

      <div className="p-2 w-6xl my-4 flex flex-col shadow shadow-black justify-between bg-gray-400 rounded-2xl ">
        {/* Total Income (large screens) */}

        <div className="text-center flex justify-between md:text-left m-2">
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-2xl cursor-pointer"
            onClick={()=>setIsTransactionClicked(!isTransactionClicked)}
          >
            {isClicked ? "▲" : "▼"}
          </button>
        </div>
        {isTransactionClicked &&
          <TimeRange />
        }
      </div>

    </div>
  );
};

export default Dashboard;
