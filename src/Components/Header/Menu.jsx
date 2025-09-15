import axios from 'axios'
import React from 'react'
import { errorMessage } from '../../utils/ShowMessage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cloudinary } from '@cloudinary/url-gen/index';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {resetProfile} from "../../utils/ReduxStore/profileSlice";
import { toggleMenu } from '../../utils/ReduxStore/setSlice'

const Menu = () => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dilpkrfrb'
        }
    });

    // const  location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const firstName = useSelector((store) => store.profile.firstName);
    const lastName = useSelector((store) => store.profile.lastName);
    const emailId = useSelector((store) => store.profile.emailId);
    const profileImage = useSelector((store) => store.profile.profileImage);
    const displayMode = useSelector((store) => store.profile.displayMode);

    const handleDashboardClick = () => {
        if ( location !== "/dashboard" ) {
            navigate("/dashboard");
        }
        dispatch(toggleMenu(false));
    }
    const handleEditClick = () => {
        if ( location !== "/edit" ) {
            navigate("/edit");
        }
        dispatch(toggleMenu(false));
    }
    const handleLogoutClick = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL + "logout" , {} , {withCredentials: true});
            // console.log(response);
            dispatch(resetProfile());

            localStorage.removeItem('user-info');
            navigate("/login");
        } catch (error) {
            errorMessage(error.message);
        }
    }

    // const connectionImage = "TechTribe_User_Profile_Avatar/Logos/Logo_eb57da91-f036-4ee9-b795-94506c77a832";
    // const requestImage = "TechTribe_User_Profile_Avatar/Logos/Logo_250b49e3-cb7f-4603-82f6-5984591bd84d";
    const style = "flex items-center hover:bg-gray-400 select-none hover:rounded-sm cursor-pointer  hover:shadow-black hover:shadow-md active:bg-gray-300 active:shadow-black p-1";
    const lineStyle = `font-bold ${ displayMode === "Light" ? "border-black" : "border-white" } border-dashed my-1`;
    // const iconStyle = displayMode === "Light" ? "bg-gray-800 shadow-inner shadow-white text-white" : "bg-white shadow-xl shadow-black text-black" ;

    return (
        // <div className="h-screen right-0 m-1" >
        <div className="right-0 top-20 bottom-0 max-w-md w-72 p-2 rounded-tl-lg rounded-bl-lg">
            <div className='flex flex-row justify-center mb-5' >
                <div className='flex flex-col  items-center justify-center' >
                    <img 
                        src="/user-profile-icon.jpg" 
                        alt="userProfileImage"
                        className="h-20 w-20 rounded-full border-4 bg-white shadow-lg shadow-black/50 border-white/20"
                    />
                    {/* { membershipType !== "Free" && 
                        <div className={`p-1 absolute top-4 left-4 rounded-full w-13 h-13  flex items-center justify-center ${iconStyle} `} >
                            { membershipType === "Elite" && <i class="fa-solid fa-crown"></i> }
                            { membershipType === "Pro" &&  <i className="material-icons" >workspace_premium</i> }
                        </div>
                    } */}
                    <div className='flex flex-col items-center justify-center' >
                        <h1 className='font-bold' >{firstName} {lastName}</h1>
                        <h2>{emailId}</h2>
                    </div>
                </div>
                <button 
                    className='hover:bg-gray-500 absolute top-2 right-2 hover:rounded-lg cursor-pointer flex items-center justify-center p-2'
                    onClick={() => {
                    dispatch(toggleMenu(false));
                }} >
                    <i className="material-icons">close</i>
                </button>
            </div>
            <div className={`${style}`}
                onClick={handleDashboardClick}
            >
                <i className="material-icons mr-1">dashboard</i>
                <button className="cursor-pointer" >
                    Dashboard
                </button>
            </div>
            <hr className={`${lineStyle}`} />
            <div className={`${style}`}
                onClick={handleEditClick}
            >
                <i className="material-icons mr-1">edit</i>
                <button className="cursor-pointer" >
                    Edit
                </button>
            </div>
            <hr className={`${lineStyle}`} />
            <div className={`${style}`}
                onClick={handleLogoutClick}
            >
                <i className="material-icons mr-1">logout</i>
                <button className="cursor-pointer" >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default Menu