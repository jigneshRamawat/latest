import React, { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../Context/ContextPage";
import { motion, useInView } from "framer-motion";

// ✅ Updated live backend link
const api = "https://latest-9qs4.onrender.com";

async function getProject() {
  return await fetch(`${api}/api/project/all`, {
    method: "GET",
    credentials: "include",
  });
}

const ProjectCard = ({ p, index, theme }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { triggerOnce: true, threshold: 0.2 });
  const [readMore, setReadMore] = useState(false);
  const isLong = p.dec.length > 120;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 60 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="box w-full sm:w-[45%] lg:w-[30%] xl:w-[20%] 
        h-[480px] bg-purple-300/15 shadow-white shadow-xl/30
        rounded-2xl p-5 mb-5 flex flex-col"
    >
      <div className="imgwrap w-full mb-3 h-[55%] flex items-center justify-center">
        <img
          className="border-1 shadow-2xl rounded-4xl border-purple-300 w-[95%] h-[75%] object-cover"
          src={p.img}
          alt={p.title}
        />
      </div>

      <h2 className={`text-center text-xl ${theme ? "text-purple-300" : "text-purple-400"}`}>
        {p.title}
      </h2>

      <p className={`text-center text-sm mt-1 ${theme ? "text-white" : "text-black"} ${!readMore ? "line-clamp-3" : ""}`}>
        {p.dec}
      </p>

      {isLong && (
        <button
          onClick={() => setReadMore(!readMore)}
          className={`text-xs mt-1 underline ${theme ? "text-purple-300" : "text-purple-500"}`}
        >
          {readMore ? "Read Less" : "Read More"}
        </button>
      )}

      <a href={p.link} target="_blank" rel="noreferrer" className="mt-auto">
        <p className={`text-center text-sm mt-2 ${theme ? "text-white" : "text-purple-300"}`}>
          Demo <i className="ri-pages-line"></i>
        </p>
      </a>
    </motion.div>
  );
};

const Project = () => {
  const { theme } = useContext(userContext);
  const [project, setProjects] = useState([]);

  async function loadProjects() {
    try {
      const res = await getProject();
      const data = await res.json();
      if (Array.isArray(data.projectitem)) setProjects(data.projectitem);
      else setProjects([]);
    } catch (err) {
      setProjects([]);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="w-full gap-5 flex flex-wrap justify-center p-10">
      {project.map((p, index) => (
        <ProjectCard key={p._id} p={p} index={index} theme={theme} />
      ))}
    </div>
  );
};

export default Project;
