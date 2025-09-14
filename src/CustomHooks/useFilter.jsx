import { errorMessage, successMessage } from "../utils/ShowMessage";
import axios from "axios";

const useFilter = () => {
    const handleRangeSearch = async (form, setForm , page , dispatch , event ) => {
        // e.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_BASE_URL + `transaction?page=${page}&limit=${4}`, {
                form: form
            }, {
                withCredentials: true
            });

            // console.log("Filter response:", res.data);
            // dispatch(event(res.data));
            dispatch(event({ page: page , data: res.data }));

            successMessage("Filter applied successfully");

        } catch (error) {
            // console.error("Error filtering transactions:", error);
            errorMessage("Failed to filter transactions. Please try again.");
        }
    };

    return { handleRangeSearch };
};

export default useFilter;
