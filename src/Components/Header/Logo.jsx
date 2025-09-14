import { useLocation, useNavigate } from "react-router-dom";

const Logo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleLogoClick = () => {
        if ( location.pathname !== "/dashboard" ) {
            navigate("/dashboard");
        }
    }

    return (
        <div
            className={`font-bold text-2xl text-white rounded-lg 
                       w-full 
                       flex ${location.pathname === "/profile" || location.pathname === "/settings" ? " justify-center md:justify-start md:pl-20" : "justify-start" } 
                       items-center
                       cursor-pointer
                       `}
            onClick={handleLogoClick}
        >
            {/* For small screens */}
            <span className="block md:hidden text-2xl">PFA</span>

            {/* For medium and larger screens */}
            <span className="hidden md:block text-3xl">Personal Finance Assistant</span>
        </div>
    );
};

export default Logo;
