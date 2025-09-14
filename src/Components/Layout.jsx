import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {

  // Determine background styles
  let bgClass = "bg-gray-300";
  let useBackgroundImage = false;

  return (

    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-clip" >
      <div className="flex flex-row min-h-screen h-full w-full overflow-x-clip" >

        <div
          className={`flex flex-col justify-between w-full min-h-screen max-w-screen overflow-x-clip ${ useBackgroundImage ? {} : bgClass } `}
        >
            <Header />
            {/* <div className="flex-grow w-full h-full min-h-screen flex items-center justify-center">
              <Outlet />
            </div> */}
            <div className="flex-grow w-full h-full flex justify-center px-4 py-6">
              <Outlet />
            </div>

        </div>
        
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
