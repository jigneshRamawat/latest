import React, { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../Context/ContextPage";
import { motion, useInView, AnimatePresence } from "framer-motion";

const INITIAL_COUNT = 3;
const api = "https://latest-9qs4.onrender.com";

async function getProject() {
  return await fetch(`${api}/api/project/all`, {
    method: "GET",
    credentials: "include",
  });
}

const SkeletonCard = () => (
  <div
    className="box w-full sm:w-[45%] lg:w-[30%] xl:w-[20%]
      h-[480px] bg-purple-300/15 shadow-white shadow-xl/30
      rounded-2xl p-5 mb-5 flex flex-col overflow-hidden"
  >
    <div className="w-full mb-3 h-[55%] flex items-center justify-center">
      <div className="skeleton-shimmer w-[95%] h-[75%] rounded-2xl" />
    </div>

    <div className="skeleton-shimmer h-5 w-3/4 mx-auto rounded-md mb-3" />

    <div className="flex flex-col gap-2 px-1">
      <div className="skeleton-shimmer h-3 w-full rounded-md" />
      <div className="skeleton-shimmer h-3 w-5/6 rounded-md" />
      <div className="skeleton-shimmer h-3 w-4/6 rounded-md" />
    </div>

    <div className="mt-auto skeleton-shimmer h-4 w-1/3 mx-auto rounded-md" />
  </div>
);

const ProjectCard = ({ p, index, theme }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { triggerOnce: true, threshold: 0.15 });
  const [readMore, setReadMore] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isLong = p.dec?.length > 120;

  return (

    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 60 }}
      exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="box w-full sm:w-[45%] lg:w-[30%] xl:w-[20%]
        h-[480px] bg-purple-300/15 shadow-white shadow-xl/30
        rounded-2xl p-5 mb-5 flex flex-col"
    >
      {/* Image with lazy load + layout-shift prevention */}
      <div className="imgwrap w-full mb-3 h-[55%] flex items-center justify-center relative">
        {!imgLoaded && (
          <div className="skeleton-shimmer absolute w-[95%] h-[75%] rounded-2xl" />
        )}
        <a href={p.link} target="_blank" rel="noreferrer" className="w-[95%] h-[75%] flex items-center justify-center">
          <img
            className={`border-1 shadow-2xl cursor-pointer rounded-4xl border-purple-300 w-full h-full object-cover
            transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            src={p.img}
            alt={p.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
          />
        </a>
      </div>

      <h2 className={`text-center text-xl ${theme ? "text-purple-300" : "text-purple-400"}`}>
        {p.title}
      </h2>

      <p
        className={`text-center text-sm mt-1
          ${theme ? "text-white" : "text-black"}
          ${!readMore ? "line-clamp-3" : ""}`}
      >
        {p.dec || ""}
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
        <p className={`text-center text-sm mt-2 ${theme ? "text-white" : "text-purple-300"} hover:underline cursor-pointer`}>
          Demo <i className="ri-pages-line" />
        </p>
      </a>
    </motion.div>

  );
};

const LoadMoreButton = ({ showAll, onClick, remaining, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center mt-2 pb-8"
  >
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm
        font-medium tracking-wider border border-purple-400/50
        transition-all duration-300
        ${theme
          ? "text-purple-300 bg-purple-400/10 hover:bg-purple-400/20"
          : "text-purple-600 bg-purple-100/30 hover:bg-purple-200/50"
        }`}
    >
      {showAll ? (
        <>
          <i className="ri-arrow-up-s-line text-base" />
          Show Less
        </>
      ) : (
        <>
          <i className="ri-arrow-down-s-line text-base" />
          Load More
          <span className="ml-1 px-2 py-0.5 rounded-full bg-purple-400/20 text-xs">
            +{remaining}
          </span>
        </>
      )}
    </motion.button>
  </motion.div>
);

const Project = () => {
  const { theme } = useContext(userContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getProject();
        const data = await res.json();
        setProjects(Array.isArray(data.projectitem) ? data.projectitem : []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;
  const remaining = projects.length - INITIAL_COUNT;

  return (
    <div id="projects" className="w-full pb-4">

      <motion.div
        className="wrap text-center pt-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className={`${theme ? "text-white" : "text-black"}`}>What I've Built</p>
        <h3 className="text-purple-300 text-4xl font-serif">My Projects</h3>
      </motion.div>

      <div className="w-full gap-5 flex flex-wrap justify-center p-10">
        {loading ? (
          Array.from({ length: INITIAL_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((p, index) => (
              <ProjectCard key={p._id} p={p} index={index} theme={theme} />
            ))}
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {!loading && hasMore && (
          <LoadMoreButton
            showAll={showAll}
            onClick={() => setShowAll((prev) => !prev)}
            remaining={remaining}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;
