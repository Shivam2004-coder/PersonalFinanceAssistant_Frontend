import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorMessage } from '../utils/ShowMessage';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { fetchAndStoreUserProfile } from '../CustomHooks/fetchAndStoreUserProfile';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
  const checkUserStatus = async () => {
    let token = null;
    try {
      const data = localStorage.getItem('user-info');
      if (data && data !== 'undefined') {
        const parsed = JSON.parse(data);
        token = parsed?.token;
      }
    } catch (err) {
      console.error("Invalid JSON in localStorage", err);
    }

    if (!token) {
      setIsAuthenticated(false);
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
        errorMessage("Please Login !!");
      }
      return;
    }

    setIsAuthenticated(true);

    try {
      // const res = await axios.get(import.meta.env.VITE_BASE_URL + "profile/view", { withCredentials: true });
      // const userData = res.data.user;
      await fetchAndStoreUserProfile(dispatch);
      

      // const hasCompletedOnboarding = !!userData.gender; // Or more checks if needed



    } catch (err) {

      // console.log("Session expired or user not found"+err.message);
      localStorage.removeItem('user-info');
      setIsAuthenticated(false);
      navigate('/login', { replace: true });

      const errMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      // console.log("ERROR in handleSignInButton : "+err.message);
      errorMessage(errMessage);
    }

  };

  checkUserStatus();
}, [location.pathname, setIsAuthenticated, navigate, dispatch]);

  return null;
}

export default RefreshHandler;
