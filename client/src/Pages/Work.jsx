import React, { useContext, useRef } from 'react';
import spect from '../img/spect.png';
import delta from '../img/delta.jpg';
import collegedekho from '../img/collage.webp';
import { userContext } from '../Context/ContextPage';
import { motion, useInView } from 'framer-motion';

const Work = () => {
  const { theme } = useContext(userContext);

  // Refs for animations
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // InView animation triggers
  const card1InView = useInView(card1Ref, {
    triggerOnce: true,
    threshold: 0.3,
  });

  const card2InView = useInView(card2Ref, {
    triggerOnce: true,
    threshold: 0.3,
  });

  const card3InView = useInView(card3Ref, {
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div id="skills" className="pb-20">
      {/* Heading */}
      <div className="wrap text-center">
        <p className={`${theme ? "text-white" : "text-black"}`}>
          My Abilities
        </p>
        <h3 className="text-purple-300 text-4xl font-serif">
          Work Experience
        </h3>
      </div>

      {/* Cards Wrapper */}
      <div className="transition-all duration-700 ease-in-out w-full flex flex-col items-center justify-center p-4 md:p-10">

        {/* Spectrics */}
        <motion.div
          ref={card1Ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: card1InView ? 1 : 0,
            y: card1InView ? 0 : 100,
          }}
          transition={{ duration: 0.8 }}
          className={`${theme ? "text-white" : "text-black"} mt-5 mb-5 backdrop-blur-3xl p-6 md:p-10 rounded-4xl bg-purple-300/15 shadow-white shadow-2xs flex flex-col items-center w-full md:w-[80%] lg:w-[70%]`}
        >
          <div className="imgwrap w-full flex justify-center">
            <img
              className="w-24 md:w-32 pb-8 rounded-full"
              src={spect}
              alt="Spectrics"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold">
              Spectrics Solutions PVT LTD, Ahmedabad
            </h2>
            <p className="text-lg md:text-xl text-purple-300">
              React.js Developer Internship
            </p>
            <p className="text-sm text-gray-400">
              Aug 2023 – Feb 2024
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center mt-4">
            <p className="pt-2 text-sm md:text-base">
              Developed scalable UI components using React.js,
              React Bootstrap, and PrimeReact.
            </p>

            <p className="text-sm md:text-base">
              Handled state management and integrated REST APIs.
            </p>

            <p className="pt-2 text-sm md:text-base">
              Built interactive admin dashboards with charts and tables.
            </p>

            <h4 className="mt-4 text-sm md:text-base text-purple-300">
              Skills - React, Redux, JavaScript, SCSS, Bootstrap
            </h4>
          </div>
        </motion.div>

        {/* Delaware */}
        <motion.div
          ref={card2Ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: card2InView ? 1 : 0,
            y: card2InView ? 0 : 100,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${theme ? "text-white" : "text-black"} backdrop-blur-3xl p-6 mt-5 mb-5 md:p-10 rounded-4xl bg-purple-400/15 shadow-white shadow-2xs flex flex-col items-center w-full md:w-[80%] lg:w-[70%]`}
        >
          <div className="imgwrap w-full flex justify-center">
            <img
              className="w-24 md:w-32 pb-8 rounded-full"
              src={delta}
              alt="Delaware"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold">
              Delaware Solutions Private Limited - Uttar Pradesh
            </h2>
            <p className="text-lg md:text-xl text-purple-300">
              MERN Stack Developer Intern
            </p>
            <p className="text-sm text-gray-400">
              May 2025 – Oct 2025
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center mt-4">
            <p className="pt-2 text-sm md:text-base">
              Designed and implemented user and admin panels with clean UX.
            </p>

            <p className="text-sm md:text-base">
              Contributed to project deployment.
            </p>

            <p className="pt-2 text-sm md:text-base">
              Built dashboards with real-time data using charts.
            </p>

            <h4 className="mt-4 text-sm md:text-base text-purple-300">
              Skills - React, Context API, JavaScript, Tailwind,
              Bootstrap, Framer Motion, Node.js, Express.js, MongoDB
            </h4>
          </div>
        </motion.div>

        {/* CollegeDekho */}
        <motion.div
          ref={card3Ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: card3InView ? 1 : 0,
            y: card3InView ? 0 : 100,
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${theme ? "text-white" : "text-black"} backdrop-blur-3xl p-6 mt-5 mb-5 md:p-10 rounded-4xl bg-purple-400/15 shadow-white shadow-2xs flex flex-col items-center w-full md:w-[80%] lg:w-[70%]`}
        >
          <div className="imgwrap w-full flex justify-center">
            <img
              className="w-24 md:w-32 pb-8 rounded-full"
              src={collegedekho}
              alt="CollegeDekho"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold">
              CollegeDekho Private Limited, Jaipur
            </h2>

            <p className="text-lg md:text-xl text-purple-300">
              Full Stack Developer Intern
            </p>

            <p className="text-sm text-gray-400">
              May 2026 – Present
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center mt-4">
            <p className="pt-2 text-sm md:text-base">
              Collaborated with team members in an agile development
              environment and improved communication and teamwork skills.
            </p>

            <p className="text-sm md:text-base">
              Learned and implemented REST API development,
              API integration, and backend fundamentals
              in real-world projects.
            </p>

            <p className="pt-2 text-sm md:text-base">
              Strengthened understanding of authentication,
              routing, CRUD operations, and database management.
            </p>

            <h4 className="mt-4 text-sm md:text-base text-purple-300">
              Skills - React, Context API, JavaScript, Tailwind,
              Bootstrap, Framer Motion, Node.js, Express.js, MongoDB
            </h4>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Work;
