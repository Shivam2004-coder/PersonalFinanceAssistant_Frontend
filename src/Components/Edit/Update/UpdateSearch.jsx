import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addUpdate, decrementUpdatePage, incrementUpdatePage, resetUpdate } from '../../../utils/ReduxStore/currentSearchSlice';
import useFilter from '../../../CustomHooks/useFilter';
import Form from "../Form";
import useAdd from "../../../CustomHooks/useAdd";

const UpdateSearch = (props) => {
    const { form, setForm } = props;

    const [formT, setFormT] = useState({
        _id: "",
        type: "expense",
        amount: "",
        category: "",
        note: "",
        date: new Date().toISOString().split("T")[0],
      });

    const dispatch = useDispatch();
    const update = useSelector((store) => store.currentSearch.update);
    const updatePage = useSelector((store) => store.currentSearch.updatePage);

    const { handleRangeSearch } = useFilter();

    const [openAccordion, setOpenAccordion] = useState(null); // to track which accordion is open

    const verifyNext = async () => {
        const nextPage = updatePage + 1;
        if (!update[nextPage] || !update[nextPage].data) {
            await handleRangeSearch(form, setForm, nextPage, dispatch, addUpdate);
        }
        dispatch(incrementUpdatePage());
    }

    const handlePrev = () => {
        dispatch(decrementUpdatePage());
    }

    const {handleSubmit} = useAdd(formT,setFormT,"delete");

    // single delete function
    const handleDelete = async (txn) => {
        setFormT({
            _id: txn._id,
            type: txn.type,
            amount: txn.amount,
            category: txn.category,
            note: txn.notes,
            // date: new Date().toISOString().split("T")[0],
            date: txn.date,
        });
        await handleSubmit();
        dispatch(resetUpdate());
    }

    const toggleAccordion = (txn) => {
        setFormT({
            _id: txn._id,
            type: txn.type,
            amount: txn.amount,
            category: txn.category,
            note: txn.notes,
            // date: new Date().toISOString().split("T")[0],
            date: txn.date,
        });
        setOpenAccordion(openAccordion === txn._id ? null : txn._id);
    }

    return (
        <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto py-6">
            {/* Transactions List */}
            <div className="w-full mb-6">
                {update[updatePage] && update[updatePage].data && update[updatePage].data.length > 0 ? (
                    <div className="space-y-4">
                        {update[updatePage].data.map((txn) => (
                            <div key={txn._id} className="border rounded-lg shadow-md bg-gray-400">
                                {/* Accordion Header */}
                                <div 
                                    className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors"
                                    onClick={() => toggleAccordion(txn)}
                                >
                                    <div>
                                        <p className="text-black" ><strong>Type:</strong> <span className=" capitalize">{txn.type}</span></p>
                                        <p className="text-black" ><strong>Amount:</strong> <span className="text-green-900 font-semibold">₹{txn.amount}</span></p>
                                        <p className="text-black" ><strong>Category:</strong> <span className="text-blue-600">{txn.category}</span></p>
                                        <p className="text-black" ><strong>Date:</strong> {new Date(txn.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white font-semibold"
                                            onClick={(e) => { e.stopPropagation(); toggleAccordion(txn); }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-white font-semibold"
                                            onClick={(e) => { e.stopPropagation(); handleDelete(txn); }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                {openAccordion === txn._id && (
                                    <div className="p-4 bg-gray-50 border-t">
                                        {/* Fill this div for update form later */}
                                        <p>Update form/content goes here...</p>
                                        
                                        <Form form={formT} setForm={setFormT} which={"update"} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-lg">No transactions found</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-4">
                <button
                    className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                        updatePage <= 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    disabled={updatePage <= 1}
                    onClick={handlePrev}
                >
                    ◀ Previous
                </button>

                <span className="font-bold text-gray-700">{updatePage}</span>

                <button
                    className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                        !update[updatePage] || !update[updatePage].data || update[updatePage].data.length < 4
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    disabled={!update[updatePage] || !update[updatePage].data || update[updatePage].data.length < 4}
                    onClick={verifyNext}
                >
                    Next ▶
                </button>
            </div>
        </div>
    )
}

export default UpdateSearch;






// import { useDispatch, useSelector } from 'react-redux';
// import { addUpdate, decrementUpdatePage, incrementUpdatePage } from '../../../utils/ReduxStore/currentSearchSlice';
// import useFilter from '../../../CustomHooks/useFilter';

// const UpdateSearch = (props) => {
//     const { form, setForm } = props;
//     const dispatch = useDispatch();
//     const update = useSelector((store) => store.currentSearch.update);
//     const updatePage = useSelector((store) => store.currentSearch.updatePage);

//     const { handleRangeSearch } = useFilter();

//     const verifyNext = async () => {
//         await handleRangeSearch(form, setForm, updatePage + 1, dispatch, addUpdate);
//         dispatch(incrementUpdatePage());
//     }

//     const handlePrev = () => {
//         dispatch(decrementUpdatePage());
//     }

//     return (
//         <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto py-6">
//             {/* Transactions List */}
//             <div className="w-full mb-6">
//                 {update[updatePage] && update[updatePage].data && update[updatePage].data.length > 0 ? (
//                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {update[updatePage].data.map((txn) => (
//                             <li key={txn._id} className="p-4 border rounded-lg shadow-md bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-lg transition-shadow">
//                                 <p><strong className="text-gray-700">Type:</strong> <span className="text-gray-900 capitalize">{txn.type}</span></p>
//                                 <p><strong className="text-gray-700">Amount:</strong> <span className="text-green-600 font-semibold">₹{txn.amount}</span></p>
//                                 <p><strong className="text-gray-700">Category:</strong> <span className="text-blue-600">{txn.category}</span></p>
//                                 <p><strong className="text-gray-700">Date:</strong> <span className="text-gray-900">{new Date(txn.date).toLocaleDateString()}</span></p>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500 text-center text-lg">No transactions found</p>
//                 )}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center space-x-4">
//                 <button
//                     className={`px-4 py-2 rounded-md font-semibold transition-colors ${
//                         updatePage <= 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
//                     }`}
//                     disabled={updatePage <= 1}
//                     onClick={handlePrev}
//                 >
//                     ◀ Previous
//                 </button>

//                 <span className="font-bold text-gray-700">{updatePage}</span>

//                 <button
//                     className={`px-4 py-2 rounded-md font-semibold transition-colors ${
//                         !update[updatePage] || !update[updatePage].data || update[updatePage].data.length < 4
//                             ? "bg-gray-600 cursor-not-allowed"
//                             : "bg-blue-600 hover:bg-blue-700 text-white"
//                     }`}
//                     disabled={!update[updatePage] || !update[updatePage].data || update[updatePage].data.length < 4}
//                     onClick={verifyNext}
//                 >
//                     Next ▶
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default UpdateSearch;
