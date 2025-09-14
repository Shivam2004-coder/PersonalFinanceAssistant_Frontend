import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const rawDisplayMode = useSelector((store) => store.profile.displayMode);
  const displayMode = rawDisplayMode || "Light";
  const borderColor = displayMode === "Light" ? "border-gray-300" : "border-gray-700";
  const bgColor = displayMode === "Light" ? "bg-white text-black" : "bg-gray-900 text-white";

  return (
    <footer className={`${bgColor} w-full py-1 px-6 relative overflow-hidden`}>
      
      {/* Decorative Gradient */}
      {/* <div className="inset-0 bg-gradient-to-t from-yellow-500 via-red-500 to-pink-500 opacity-10 pointer-events-none"></div> */}

      <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        {/* Branding */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-bold">PFA</h2>
          <p className="text-xs md:text-sm text-gray-600">
            Personal Finance Assistant - your trusted companion for financial growth.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Connect with us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-all text-gray-800">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-all text-gray-800">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-all text-gray-800">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline hover:text-yellow-500 transition-all text-gray-600">Home</a></li>
            <li><a href="/about" className="hover:underline hover:text-yellow-500 transition-all text-gray-600">About</a></li>
            <li><a href="/contact" className="hover:underline hover:text-yellow-500 transition-all text-gray-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Contact</h3>
          <p className="text-gray-600 text-sm">support@pfa.com</p>
          <p className="text-gray-600 text-sm">+1 (234) 567-890</p>
        </div>
      </div>

      {/* Paragraph */}
      <div className="max-w-4xl mx-auto mt-10 text-center text-gray-400 text-xs md:text-sm leading-relaxed">
        Personal Finance Assistant (PFA) is a modern platform designed to help users manage their finances effortlessly. 
        Whether it's budgeting, tracking expenses, setting financial goals, or planning investments, 
        PFA empowers you to take control of your financial future. 
        Join PFA to gain insights, stay organized, and make smarter financial decisions every day.
      </div>


      {/* Divider */}
      <div className={`my-8 border-t ${borderColor}`}></div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PFA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;








// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom"; 

// const Footer = () => {
//   const rawDisplayMode = useSelector((store) => store.profile.displayMode);
//   const displayMode = rawDisplayMode || "Light";
//   const borderColor = displayMode === "Light" ? "border-gray-300" : "border-gray-700";
//   const bgColor = displayMode === "Light" ? "bg-white text-black" : "bg-black text-white" ;

//   console.log("Footer Rendered");
//   console.log("Display Mode:", displayMode);

//   return (
//     <footer className={`w-full px-4 py-8 ${bgColor} backdrop-blur-md z-40`}>
//       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        
        

//         {/* Social */}
//         <div className="bg-black flex text-white">
//           <h3 className="font-semibold mb-2">Social</h3>
//           <div className="flex space-x-4 text-xl">
//             <a href="https://twitter.com" target="_blank" rel="noreferrer">
//               <i className="fa-brands fa-x-twitter hover:text-gray-400"></i>
//             </a>
//             <a href="https://github.com" target="_blank" rel="noreferrer">
//               <i className="fa-brands fa-github hover:text-gray-400"></i>
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noreferrer">
//               <i className="fa-brands fa-linkedin hover:text-gray-400"></i>
//             </a>
//           </div>
//         </div>

//       </div>

//       {/* Paragraph and Footer Info */}
//       <div className="max-w-4xl mx-auto mt-10 text-xs text-center leading-relaxed">
//           <p>
//             Tech Tribe is a collaborative platform built for developers to connect, learn, and grow together. 
//             Whether you're contributing to projects, sharing insights, or exploring new tools and technologies, 
//             Tech Tribe empowers you to be part of a vibrant, supportive developer community. 
//             Join the tribe that thrives on innovation, knowledge sharing, and meaningful collaboration.
//           </p>
//       </div>

//       <div className={`my-6 border-t ${borderColor}`}></div>

//       <div className="text-center text-xs">
//         <p>© {new Date().getFullYear()} PFA. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
