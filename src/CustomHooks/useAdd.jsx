import { errorMessage, successMessage } from "../utils/ShowMessage";
import axios from "axios";

const useAdd = () => {
    const handleSubmit = async (form, setForm , which) => {
        try {

            if ( which === "add" && (!form || !form.amount || !form.category)) {
                return errorMessage("Fill required fields");
            }

            // console.log("Submitting form:", form);
            let message = "";
            
            if( which === "add" ){
                const res = await axios.post(
                    import.meta.env.VITE_BASE_URL + "transaction/add",
                    { form },
                    { withCredentials: true }
                );
                message = "added"
            }
            else if( which === "update" ){
                const res = await axios.post( import.meta.env.VITE_BASE_URL + "transaction/update",
                    {form},
                    {withCredentials: true}
                )
                message = "updated"
            }
            else if (which === "delete") {
                // console.log("form : ",form);
                const res = await axios.delete(import.meta.env.VITE_BASE_URL + "transaction/delete", {
                    data: { form }, 
                    withCredentials: true
                });
                message = "deleted"
            }
            // console.log(res);

            setForm({
                type: "expense",
                category: "",
                amount: "",
                date: new Date().toISOString().split("T")[0],
                note: "",
            });

            successMessage(`Transaction ${message} successfully`);

        } catch (error) {
            console.error("error : ",error);
            errorMessage("Error occured . Please try again.");
        }
    };

    return { handleSubmit };
};

export default useAdd;
