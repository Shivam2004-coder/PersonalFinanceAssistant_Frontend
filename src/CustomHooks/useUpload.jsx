import axios from "axios";
import { errorMessage, successMessage } from "../utils/ShowMessage";

const useUpload = () => {
    const handleScanPDF = async (file) => {
        try {
            
            console.log(file);
            // const formData = new FormData();
            // formData.append("pdf", file);

            const res = await axios.post(
                import.meta.env.VITE_BASE_URL + "gemini/search",
                { data: file }, // wrap file inside "data"
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );


            console.log("scan pdf result : ",res);
            successMessage("Successfully parsed the invoice.");
            return res.data.data;

        } catch (error) {
            console.error("Error in handleScanPDF:", error);
            errorMessage("Failed to scan the PDF. " + error.message);
        }
    };

    return { handleScanPDF };
};

export default useUpload;
