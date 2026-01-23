import React, { useContext, useRef, useEffect, useState } from 'react';
import { userContext } from '../Context/ContextPage';
import myPhoto2 from "../img/my3.jpg";
import { motion } from "framer-motion";

const Home = () => {
  const { theme } = useContext(userContext);

  // Intersection Observer
  const homeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsVisible(e.isIntersecting)),
      { threshold: 0.3 }
    );

    if (homeRef.current) observer.observe(homeRef.current);
    return () => homeRef.current && observer.unobserve(homeRef.current);
  }, []);


  const bottomVariant = {
    hidden: { opacity: 0, y: -80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const goToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <motion.div
      id='home'
      ref={homeRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`${theme ? "bg-transparent" : "bg-transparent"} transition-all duration-500 ease-in-out pb-10`}
    >


      <motion.div
        variants={bottomVariant}
        className="pt-25 wrap flex flex-col w-full"
      >
        <div className="top items-center text-center justify-center">
          <p className={`${theme ? "text-white" : "text-black"} pb-1`}>
            Hello, I'm
          </p>
          <h2 className="text-purple-300 font-serif text-5xl">
            Jignesh Ramawat
          </h2>

          <p className={`${theme ? "text-white" : "text-black"} pt-2`}>
            (MernStack Developer)
          </p>
        </div>


        <motion.div
          variants={bottomVariant}
          transition={{ delay: 0.3 }}
          className="button pt-10 justify-center items-center text-center flex gap-5"
        >
          <a href="https://drive.google.com/file/d/1JI3u-5TbOGsJD-CYvac4CehXK1Vrcuxj/view?usp=sharing"><button className="hover:bg-purple-200 hover:text-black transition-all duration-300 ease-in-out p-3.5 font-serif bg-transparent border-purple-300 border-2 rounded-2xl cursor-pointer text-purple-300">
            Download CV
          </button></a>

          <button onClick={goToAbout} className="p-3.5 font-serif bg-transparent rounded-2xl cursor-pointer border-purple-300 border-2 text-purple-300">
            About
          </button>
        </motion.div>
      </motion.div>


      <div className="relative flex items-center justify-center pb-5 w-full mt-16">


        <motion.div
          variants={bottomVariant}
          transition={{ delay: 0.6 }}
          className="absolute left-5 sm:left-10 md:left-20 lg:left-50 flex flex-col gap-4"
        >
          <a href="https://www.linkedin.com/in/jignesh-ramawat-47b14121a/"> <i className={`${theme ? "text-purple-400" : "text-gray-950"} hover:text-purple-300 ri-linkedin-fill text-2xl bg-gray-100 rounded-full p-2`}></i></a>
          <a href="https://github.com/jigneshRamawat"> <i className={`${theme ? "text-purple-400" : "text-gray-950"} ri-github-fill hover:text-purple-300 text-2xl bg-gray-100 rounded-full p-2`}></i></a>
          <a href="https://portfolio-1c7l.vercel.app"> <i className={`${theme ? "text-purple-400" : "text-gray-950"} ri-creative-commons-by-line text-2xl bg-gray-100 rounded-full hover:text-purple-300 p-2`}></i></a>
        </motion.div>


        <motion.div
          variants={bottomVariant}
          transition={{ delay: 0.9 }}
          className="flex justify-center h-50 sm:h-65 md:h-80 lg:h-100 w-40 sm:w-50 md:w-60 lg:w-72 rounded-b-3xl"
        >
          <img
            className={`${theme ? "border-white" : "border-purple-200"} rounded-t-full border-4 object-cover`}
            src={myPhoto2}
            alt="Profile"
          />
        </motion.div>


        <motion.div
          variants={bottomVariant}
          transition={{ delay: 1.2 }}
          className="absolute lg:right-50 md:right-20 cursor-pointer right-[0] sm:right-10 flex flex-col justify-end"
        >
          <motion.p onClick={goToAbout}
            animate={{ x: [0, -10, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`${theme ? "text-white" : "text-black"} text-sm rotate-90`}
          >
            <i className="ri-toggle-line mr-1"></i> Scroll Down
          </motion.p>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;