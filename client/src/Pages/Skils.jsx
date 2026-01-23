import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../Context/ContextPage";
import { motion } from "framer-motion";

const Skils = () => {
  const { theme } = useContext(userContext);

  // REF + OBSERVER HOOKS
  const skillRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (skillRef.current) observer.observe(skillRef.current);

    return () => {
      if (skillRef.current) observer.unobserve(skillRef.current);
    };
  }, []);

  // Animation Variants
  const cardVariant = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div id="projects" className="pb-20" ref={skillRef}>
      <div className="wrap text-center">
        <motion.p
          className={`${theme ? "text-white" : "text-black"} text-3xl font-sans`}
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 1.6 }}
        >
          My Skills
        </motion.p>
      </div>

      <div className="skilwrap w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-6 justify-center items-start p-4 md:p-10">

        {/* FRONTEND CARD */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={`${theme ? "text-white" : "text-black"} backdrop-blur-3xl p-6 md:p-10 rounded-4xl bg-purple-300/15 shadow-white shadow-2xs w-full lg:w-[30%]`}
        >
          <h3 className="pt-3 pb-3 text-2xl font-sans text-center">
            Frontend Development
          </h3>

          <div className="wrap w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="left pt-3">
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> HTML5</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> CSS / SCSS</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> Bootstrap</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> Tailwind CSS</p>
            </div>
            <div className="right pt-3">
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> JavaScript</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> React.js</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> Git / GitHub</p>
            </div>
          </div>
        </motion.div>

        {/* BACKEND CARD */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className={`${theme ? "text-white" : "text-black"} backdrop-blur-3xl p-6 md:p-10 rounded-4xl bg-purple-300/15 shadow-white shadow-2xs w-full lg:w-[30%]`}
        >
          <h3 className="pt-3 pb-3 text-2xl font-sans text-center">
            Backend Development
          </h3>

          <div className="wrap w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="left pt-3">
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> Node.js</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> MongoDB</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> Express.js</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> REST APIs</p>
            </div>
            <div className="right pt-3">
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> CRUD Operations</p>
              <p><i className="text-purple-400 ri-verified-badge-fill"></i> Java</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Skils;
