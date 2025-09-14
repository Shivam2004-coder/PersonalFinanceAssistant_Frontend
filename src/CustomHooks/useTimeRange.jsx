import axios from 'axios';
import React from 'react'
import { errorMessage, successMessage } from '../utils/ShowMessage';

const useTimeRange = () => {

    const handleSearch = async (form, setForm , dispatch , event ) => {
        // e.preventDefault();
        try {
            // console.log("form : ",form);
            const res = await axios.post(import.meta.env.VITE_BASE_URL + `transaction?page=${1}&limit=${100}`, {
                form: form
            }, {
                withCredentials: true
            });

            // console.log("Filter response Time Range:", res.data);
            // dispatch(event(res.data));
            dispatch(event(res.data));

            successMessage("Filter applied successfully");
            
            return res.data; // ✅ return API response
        } catch (error) {
            // console.error("Error filtering transactions:", error);
            errorMessage("Failed to filter transactions. Please try again.");
        }
    };


    return { handleSearch }
}

export default useTimeRange