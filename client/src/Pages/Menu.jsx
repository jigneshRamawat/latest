import React from "react";

const Menu = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="wrap fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="icons px-4 py-3 rounded-full flex items-center gap-5 
                      bg-purple-400/5 backdrop-blur shadow-purple-200 shadow-md
                      sm:gap-8 sm:px-6">

        {/* Home */}
        <i
          onClick={() => scrollToSection("home")}
          className="text-xl sm:text-2xl text-purple-400 ri-home-2-line 
                     cursor-pointer hover:scale-110 hover:bg-purple-400/10 
                     rounded-full p-2 transition-all duration-500"
        ></i>

        {/* About */}
        <i
          onClick={() => scrollToSection("about")}
          className="text-xl sm:text-2xl text-purple-400 ri-user-line 
                     cursor-pointer hover:scale-110 hover:bg-purple-400/10 
                     rounded-full p-2 transition-all duration-500"
        ></i>

        {/* Skills */}
        <i
          onClick={() => scrollToSection("skills")}
          className="text-xl sm:text-2xl text-purple-400 ri-book-line 
                     cursor-pointer hover:scale-110 hover:bg-purple-400/10 
                     rounded-full p-2 transition-all duration-500"
        ></i>

        {/* Projects */}
        <i
          onClick={() => scrollToSection("projects")}
          className="text-xl sm:text-2xl text-purple-400 ri-briefcase-fill 
                     cursor-pointer hover:scale-110 hover:bg-purple-400/10 
                     rounded-full p-2 transition-all duration-500"
        ></i>

        {/* Contact */}
        <i
          onClick={() => scrollToSection("contact")}
          className="text-xl sm:text-2xl text-purple-400 ri-message-2-line 
                     cursor-pointer hover:scale-110 hover:bg-purple-400/10 
                     rounded-full p-2 transition-all duration-500"
        ></i>

      </div>
    </div>
  );
};

export default Menu;
