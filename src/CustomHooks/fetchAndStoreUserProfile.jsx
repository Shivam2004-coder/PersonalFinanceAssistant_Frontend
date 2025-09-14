// utils/fetchAndStoreUserProfile.js
import axios from "axios";
import {
  setUserId,
  setFirstName,
  setLastName,
  setEmailId,
  setProfileLoaded,
  setIncome,
  setExpense,
} from "../utils/ReduxStore/profileSlice";
import { errorMessage } from "../utils/ShowMessage";

export const fetchAndStoreUserProfile = async (dispatch) => {
  try {
    dispatch(setProfileLoaded(false));
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "profile/view", { withCredentials: true });
    const data = response.data.user;
    // console.log(data);
  
    dispatch(setUserId(data._id || ''));
    dispatch(setFirstName(data.firstName || ''));
    dispatch(setLastName(data.lastName || ''));
    dispatch(setEmailId(data.emailId || ''));
    dispatch(setIncome(data.totalIncome || ''));
    dispatch(setExpense(data.totalExpense || ''));
    dispatch(setProfileLoaded(true))

  } catch (err) {
    const errMessage = err.response?.data?.message || "Something went wrong. Please try again.";
    // console.log("ERROR in handleSignInButton : "+err.message);
    errorMessage(errMessage);
  }
};
