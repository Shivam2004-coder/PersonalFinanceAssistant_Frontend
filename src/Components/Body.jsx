import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import RefreshHandler from "./RefreshHandler"
import Login from "./Login/Login";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Edit from "./Edit/Edit";

const Body = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
        <Login />
      </GoogleOAuthProvider>
    )
  }
  const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes  >
        {/* ✅ Parent Route with Layout */}
        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="login" element={<GoogleAuthWrapper />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit" element={<Edit />}/>

        </Route>
      </Routes>
    </>
  )
};

export default Body;