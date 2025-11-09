import React from 'react'

const Menu = () => {
  return (
    <div>
      <div className="wrap w-full fixed bottom-5 left-0 flex justify-center items-center text-center">
        <div className="icons w-100 p-5 justify-center rounded-full flex gap-10 bg-purple-400/10  backdrop-blur shadow-purple-200 shadow-2xs ">
            <i className="  text-2xl text-purple-400 ri-home-2-line hover:scale-110 hover:bg-purple-400/10  hover:backdrop-blur rounded-full w-10 transition-all duration-500 ease-in-out" ></i>
            <i className="text-2xl text-purple-400 ri-user-line cursor-pointer hover:scale-110 hover:bg-purple-400/10  hover:backdrop-blur rounded-full transition-all duration-500 ease-in-out w-10"></i>
            <i className="ri-book-line text-2xl text-purple-400 cursor-pointer hover:scale-110 hover:bg-purple-400/10  hover:backdrop-blur rounded-full w-10 transition-all duration-500 ease-in-out"></i>
            <i className="ri-briefcase-fill text-2xl text-purple-400 cursor-pointer hover:scale-110 hover:bg-purple-400/10  hover:backdrop-blur rounded-full w-10 transition-all duration-500 ease-in-out"></i>
            <i className="ri-message-2-line text-2xl text-purple-400 cursor-pointer hover:scale-110 hover:bg-purple-400/10  hover:backdrop-blur rounded-full w-10 transition-all duration-500 ease-in-out"></i>
        </div>
      </div>
    </div>
  )
}

export default Menu
