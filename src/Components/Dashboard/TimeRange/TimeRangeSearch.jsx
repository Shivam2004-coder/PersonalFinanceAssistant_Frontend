import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRangeSearch,
  addRecentAdded,
  decrementRangeSearchPage,
  decrementRecentAddedPage,
  incrementRangeSearchPage,
  incrementRecentAddedPage,
} from "../../../utils/ReduxStore/currentSearchSlice";

import useFilter from "../../../CustomHooks/useFilter";

const TimeRangeSearch = ({ form, setForm, which }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const dispatch = useDispatch();
  const rangeSearch = useSelector((store) => store.currentSearch.rangeSearch);
  const rangeSearchPage = useSelector(
    (store) => store.currentSearch.rangeSearchPage
  );
  const recentAdded = useSelector((store) => store.currentSearch.recentAdded);
  const recentAddedPage = useSelector(
    (store) => store.currentSearch.recentAddedPage
  );

  const data = which === "range" ? rangeSearch : recentAdded;
  const dataPage = which === "range" ? rangeSearchPage : recentAddedPage;

  const { handleRangeSearch } = useFilter();

  const verifyNext = async () => {
    const nextPage = dataPage + 1;
    if (!data[nextPage] || !data[nextPage].data) {
      if (which === "range") {
        await handleRangeSearch(form, setForm, nextPage, dispatch, addRangeSearch);
      } else {
        await handleRangeSearch(form, setForm, nextPage, dispatch, addRecentAdded);
      }
    }
    which === "range"
      ? dispatch(incrementRangeSearchPage())
      : dispatch(incrementRecentAddedPage());
  };

  const handlePrev = () => {
    which === "range"
      ? dispatch(decrementRangeSearchPage())
      : dispatch(decrementRecentAddedPage());
  };

  const toggleAccordion = (txnId) => {
    setOpenAccordion(openAccordion === txnId ? null : txnId);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto py-6">
      {/* Transactions List */}
      <div className="w-full mb-6 space-y-4">
        {data[dataPage] && data[dataPage].data && data[dataPage].data.length > 0 ? (
          data[dataPage].data.map((txn) => (
            <div
              key={txn._id}
              className="border rounded-lg shadow-md bg-gray-800 hover:shadow-lg transition-shadow"
            >
              {/* Accordion Header */}
              <div
                className="p-4 cursor-pointer flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => toggleAccordion(txn._id)}
              >
                <div className="grid grid-cols-2 gap-4 w-full text-gray-200">
                  <div>
                    <p>
                      <strong>Type:</strong>{" "}
                      <span className="capitalize">{txn.type}</span>
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      <span className="text-blue-400">{txn.category}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Amount:</strong>{" "}
                      <span className="text-green-400 font-semibold">
                        ₹{txn.amount}
                      </span>
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(txn.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              {openAccordion === txn._id && (
                <div className="p-4 bg-gray-700 border-t border-gray-600 text-gray-100">
                  <p>
                    <strong>Note:</strong> {txn.notes || "No notes available"}
                  </p>
                  {/* Update form can go here */}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center text-lg">
            No transactions found
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            dataPage <= 1
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-blue-800 hover:bg-blue-900 text-white"
          }`}
          disabled={dataPage <= 1}
          onClick={handlePrev}
        >
          ◀ Previous
        </button>

        <span className="font-bold text-gray-200">{dataPage}</span>

        <button
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            !data[dataPage] || !data[dataPage].data || data[dataPage].data.length < 4
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-blue-800 hover:bg-blue-900 text-white"
          }`}
          disabled={
            !data[dataPage] || !data[dataPage].data || data[dataPage].data.length < 4
          }
          onClick={verifyNext}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default TimeRangeSearch;