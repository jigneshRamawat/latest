import React, { useContext, useRef } from 'react';
import spect from '../img/spect.png';
import delta from '../img/delta.jpg';
import { userContext } from '../Context/ContextPage';
import { motion, useInView } from 'framer-motion';

const Work = () => {
  const { theme } = useContext(userContext);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const card1InView = useInView(card1Ref, { triggerOnce: true, threshold: 0.3 });
  const card2InView = useInView(card2Ref, { triggerOnce: true, threshold: 0.3 });

  return (
    <div id='skills' className="pb-20">
      <div className="wrap text-center">
        <p className={`${theme ? "text-white" : "text-black"}`}>My Abilities</p>
        <h3 className="text-purple-300 text-4xl font-serif">Work Experience</h3>
      </div>

      <div className="transition-all duration-700 ease-in-out w-full flex flex-col items-center justify-center p-4 md:p-10">

        <motion.div
          ref={card1Ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: card1InView ? 1 : 0, y: card1InView ? 0 : 100 }}
          transition={{ duration: 0.8 }}
          className={`${theme ? "text-white" : "text-black"} mt-5 mb-5 backdrop-blur-3xl p-6 md:p-10 rounded-4xl bg-purple-300/15 shadow-white shadow-2xs flex flex-col align-middle w-full md:w-[80%] lg:w-[70%]`}
        >
          <div className="imgwrap w-full flex justify-center">
            <img className="w-24 md:w-32 pb-10 rounded-full" src={spect} alt="" />
          </div>

          <div className="pra text-center">
            <h2 className="text-xl md:text-2xl">Spectrics Solutions PVT LTD, Ahmedabad</h2>
            <p className="text-lg md:text-xl">React.js Developer Internship Aug 2023 - Feb 2024</p>
          </div>

          <p className="pt-2 text-sm md:text-base">
            Developing scalable UI components using React.js, React Bootstrap, and PrimeReact.
          </p>
          <p className="text-sm md:text-base">
            Handled state management and integrated REST APIs.
          </p>
          <p className="pt-2 text-sm md:text-base">
            Built interactive admin dashboards with charts and tables.
          </p>

          <h4 className="mt-3 text-sm md:text-base">Skills - React, Redux, JavaScript, SCSS, Bootstrap</h4>
        </motion.div>

        <motion.div
          ref={card2Ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: card2InView ? 1 : 0, y: card2InView ? 0 : 100 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${theme ? "text-white" : "text-black"} backdrop-blur-3xl p-6 mt-5 mb-5 md:p-10 rounded-4xl bg-purple-400/15 shadow-white shadow-2xs flex flex-col align-middle w-full md:w-[80%] lg:w-[70%]`}
        >
          <div className="imgwrap w-full flex justify-center">
            <img className="w-24 md:w-32 pb-10 rounded-full" src={delta} alt="" />
          </div>

          <div className="pra text-center">
            <h2 className="text-xl md:text-2xl">DELAWARE SOLUTIONS PRIVATE LIMITED - Uttar Pradesh</h2>
            <p className="text-lg md:text-xl">MERN Stack Developer Intern May 2025 - Oct 2025</p>
          </div>

          <p className="pt-2 text-sm md:text-base">
            Designed and implemented user and admin panels with clean UX.
          </p>
          <p className="text-sm md:text-base">Contributed to project deployment.</p>
          <p className="pt-2 text-sm md:text-base">
            Built dashboards with real-time data using charts.
          </p>

          <h4 className="mt-3 text-sm md:text-base">
            Skills - React, Context API, JavaScript, Tailwind, Bootstrap, Framer Motion, Node.js, Express.js, MongoDB
          </h4>
        </motion.div>

      </div>
    </div>
  );
};

export default Work;
