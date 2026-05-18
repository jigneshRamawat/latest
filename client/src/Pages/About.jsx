import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../Context/ContextPage";
import { motion } from "framer-motion";
import myPhoto from "../img/my3.jpg";
import GitHubCalendar from "react-github-calendar";


const GH_USER = "jigneshRamawat";

const GitHubSection = ({ theme }) => {
  return (
    <div className="w-full mt-2 flex flex-col items-center justify-center">
      <p className={`text-xs text-center mb-3 ${theme ? "text-gray-400" : "text-gray-500"}`}>
        <i className="ri-bar-chart-2-line mr-1 text-purple-400" />
        GitHub Contributions
      </p>
      
      <div className="w-full text-purple-400 overflow-x-auto rounded-xl flex justify-center pb-2">
        <div className="min-w-max">
          <GitHubCalendar
            username={GH_USER}
            blockSize={11}
            blockMargin={4}
            fontSize={12}
            colorScheme={theme ? "dark" : "light"}
            theme={{
              dark:  ["#1a1a2e", "#3b1a6b", "#6d28d9", "#8b5cf6", "#c4b5fd"],
              light: ["#f3e8ff", "#d8b4fe", "#a855f7", "#7c3aed", "#5b21b6"],
            }}
          />
        </div>
      </div>
    </div>
  );
};


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
  const goToIntern = () => {
    document.getElementById("skills")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const goToProject = () => {
    document.getElementById("projects")?.scrollIntoView({
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
          {/* ── Developer Profile Card ── */}
          <div
            className={`group relative w-72 sm:w-80 rounded-3xl p-[1px] 
              bg-gradient-to-br from-purple-500/60 via-purple-300/20 to-transparent
              shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40
              transition-all duration-500`}
          >
            <div
              className={`relative rounded-3xl p-6 overflow-hidden
                backdrop-blur-xl
                ${theme ? "bg-gray-900/80" : "bg-white/70"}`}
            >
              {/* Glow orb */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/30 transition-all duration-700" />

              {/* Avatar ring + initials */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={myPhoto}
                      alt="Jignesh"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {/* Online badge */}
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-gray-900 rounded-full" />
                </div>
              </div>

              {/* Name & role */}
              <div className="text-center mb-4">
                <h3 className="text-purple-300 text-xl font-serif font-semibold tracking-wide">
                  Jignesh Ramawat
                </h3>
                <p className={`text-sm mt-0.5 ${theme ? "text-gray-300" : "text-gray-600"}`}>
                  Full Stack Developer
                </p>
              </div>

              {/* Stat badges */}
              <div className="flex justify-center gap-3 flex-wrap mb-4">
                {[
                  { label: "MCA Student",         icon: "ri-graduation-cap-line" },
                  { label: "3 Internships",        icon: "ri-briefcase-line" },
                  { label: "Full Stack",           icon: "ri-code-s-slash-line" },
                  { label: "Continuous Learner",   icon: "ri-lightbulb-flash-line" },
                ].map(({ label, icon }) => (
                  <span
                    key={label}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full
                      bg-purple-400/15 border border-purple-400/30
                      ${theme ? "text-purple-200" : "text-purple-700"}`}
                  >
                    <i className={`${icon} text-purple-400`} />
                    {label}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-purple-400/20 my-3" />

              {/* Tech stack chips */}
              <p className={`text-xs text-center mb-2 ${theme ? "text-gray-400" : "text-gray-500"}`}>
                Tech Stack
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {["React", "Node.js", "Express.js", "MongoDB", "Java"].map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs px-2.5 py-1 rounded-lg font-mono
                      ${theme
                        ? "bg-gray-800 text-purple-300 border border-purple-500/30"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <GitHubSection theme={theme} />
            </div>
          </div>
        </motion.div>


        <motion.div
          variants={right}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="right p-4 md:p-10 w-full md:w-1/2"
        >
          <div onClick={goToIntern} className="topright flex cursor-pointer flex-col sm:flex-row gap-5 flex-wrap justify-start">
            <div className={`${theme ? "bg-gray-800" : "bg-gray-50"} one w-full sm:w-1/4 p-4 rounded-2xl text-center`}>
              <i className="text-purple-400 text-3xl ri-user-community-fill"></i>
              <p className={`${theme ? "text-white" : "text-black"} text-sm font-serif pb-1 pt-1`}>Experience</p>
              <p className="text-gray-400 text-xs">0.6 Years Working</p>
            </div>

            <div onClick={goToProject} className={`${theme ? "bg-gray-800" : "bg-gray-50"} cursor-pointer one w-full sm:w-1/4 p-4 rounded-2xl text-center`}>
              <i className="text-purple-400 text-3xl ri-handbag-fill"></i>
              <p className={`${theme ? "text-white" : "text-black"} text-sm font-serif pb-1 pt-1`}>Completed</p>
              <p className="text-gray-400 text-xs">4+ Projects</p>
            </div>

            <div onClick={goToContact} className={`${theme ? "bg-gray-800" : "bg-gray-50"} one w-full sm:w-1/4 p-4 cursor-pointer rounded-2xl text-center`}>
              <i className="text-purple-400 text-3xl ri-customer-service-2-line"></i>
              <p className={`${theme ? "text-white" : "text-black"} text-sm font-serif pb-1 pt-1`}>Support</p>
              <p className="text-gray-400 text-xs">Online 24/7</p>
            </div>
          </div>

          <div className="wrap mt-6">
            <p className={`${theme ? "text-white" : "text-gray-950"} text-start p-2 font-serif`}>
              I’m Jignesh Ramawat, an MCA student and passionate Full-Stack Developer who enjoys turning ideas into real-world web applications. I believe in learning by building, which is why I continuously work on projects to strengthen my skills in React.js, Node.js, Express.js, and MongoDB.

              My journey in tech has been shaped through internships, hands-on development, and a mindset of continuous improvement. I value growth, collaboration, and meaningful work over shortcuts, and I’m always excited to learn from experienced people and contribute to impactful solutions.

              Beyond coding, I focus on consistency, problem-solving, and becoming better every day—both as a developer and as a person..
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
