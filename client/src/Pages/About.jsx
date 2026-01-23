import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../Context/ContextPage";
import { motion } from "framer-motion";
import myPhoto from "../img/my3.jpg";

const About = () => {
  const { theme } = useContext(userContext);

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setIsVisible(entry.isIntersecting)),
      { threshold: 0.3 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);


  const left = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const right = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      id="about"
      ref={aboutRef}
      className="mainwrap flex flex-col text-center pt-18 pb-20 overflow-x-hidden"
    >
      <div className="top">
        <p className={`${theme ? "text-white" : "text-gray-800"}`}>My Intro</p>
        <h2 className="text-purple-300 text-3xl">About Me</h2>
      </div>

      <div className="wrap2 flex flex-col md:flex-row justify-evenly items-center p-6 md:p-10">
       
        <motion.div
          variants={left}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="left flex flex-col items-center p-4 md:p-6 rounded-2xl w-full md:w-1/2 mb-6 md:mb-0"
        >
          <img
            className="w-60 sm:w-72 md:w-80 hover:scale-105 transition-all duration-500 ease-in-out rounded-3xl"
            src={myPhoto}
            alt="Jignesh"
          />
        </motion.div>

    
        <motion.div
          variants={right}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="right p-4 md:p-10 w-full md:w-1/2"
        >
          <div className="topright flex flex-col sm:flex-row gap-5 flex-wrap justify-start">
            <div className={`${theme ? "bg-gray-800" : "bg-gray-50"} one w-full sm:w-1/4 p-4 rounded-2xl text-center`}>
              <i className="text-purple-400 text-3xl ri-user-community-fill"></i>
              <p className={`${theme ? "text-white" : "text-black"} text-sm font-serif pb-1 pt-1`}>Experience</p>
              <p className="text-gray-400 text-xs">0.6 Years Working</p>
            </div>

            <div className={`${theme ? "bg-gray-800" : "bg-gray-50"} one w-full sm:w-1/4 p-4 rounded-2xl text-center`}>
              <i className="text-purple-400 text-3xl ri-handbag-fill"></i>
              <p className={`${theme ? "text-white" : "text-black"} text-sm font-serif pb-1 pt-1`}>Completed</p>
              <p className="text-gray-400 text-xs">4+ Projects</p>
            </div>

            <div className={`${theme ? "bg-gray-800" : "bg-gray-50"} one w-full sm:w-1/4 p-4 rounded-2xl text-center`}>
              <i className="text-purple-400 text-3xl ri-customer-service-2-line"></i>
              <p className={`${theme ? "text-white" : "text-black"} text-sm font-serif pb-1 pt-1`}>Support</p>
              <p className="text-gray-400 text-xs">Online 24/7</p>
            </div>
          </div>

          <div className="wrap mt-6">
            <p className={`${theme ? "text-white" : "text-gray-950"} text-start p-2 font-serif`}>
              Passionate MERN Stack Developer with hands-on experience in building responsive websites and web applications.
              Skilled in MongoDB, Express.js, React.js, and Node.js for full-stack development.
              Experienced in developing secure login systems, admin dashboards, and CRUD applications.
              Focused on writing clean, maintainable code and improving user experience (UX).
            </p>
          </div>

          <button
            onClick={goToContact}
            className={`${theme ? "text-white" : "text-gray-700"} flex items-center justify-center mt-5 px-6 py-2 bg-purple-400 hover:bg-purple-500 rounded-3xl transition-all duration-300`}
          >
            Contact Me
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
