import axios from "axios";
export const useGraph = () => {
  // Custom hook logic can be added here if needed   

    const handleSearch = async (startDate , endDate, dispatch , event) => { 
        try {
            // console.log("Searching from", startDate, "to", endDate);
            const res = await axios.get(import.meta.env.VITE_BASE_URL + `graph?startDate=${startDate}&endDate=${endDate}`, {
                withCredentials: true,
            });
            // console.log("Graph Data:", res.data);
            dispatch(event(res.data));
            return res.data;

        } catch (error) {
            // console.error("Error in useGraph hook:", error);
            return { error: "An error occurred while using the graph hook." };
        }
    }


  return {  handleSearch  };
}