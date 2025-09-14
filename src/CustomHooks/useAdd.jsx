import { errorMessage, successMessage } from "../utils/ShowMessage";
import axios from "axios";

const useAdd = (form, setForm , which) => {
    const handleSubmit = async () => {
        try {

            if ( which === "add" && (!form || !form.amount || !form.category)) {
                return errorMessage("Fill required fields");
            }

            // console.log("Submitting form:", form);
            
            if( which === "add" ){
                const res = await axios.post(
                    import.meta.env.VITE_BASE_URL + "transaction/add",
                    { form },
                    { withCredentials: true }
                );
            }
            else if( which === "update" ){
                const res = await axios.post( import.meta.env.VITE_BASE_URL + "transaction/update",
                    {form},
                    {withCredentials: true}
                )
            }
            else if (which === "delete") {
                const res = await axios.delete(import.meta.env.VITE_BASE_URL + "transaction/delete", {
                    data: { form }, 
                    withCredentials: true
                });
            }
            // console.log(res);

            setForm({
                type: "expense",
                category: "",
                amount: "",
                date: new Date().toISOString().split("T")[0],
                note: "",
            });

            successMessage("Transaction added successfully");

        } catch (error) {
            console.error(error.response || error);
            errorMessage("Error in adding transaction. Please try again.");
        }
    };

    return { handleSubmit };
};

export default useAdd;
