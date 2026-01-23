import React, { useContext, useEffect, useState } from 'react'
import Home from './Home';
import { userContext } from '../Context/ContextPage'

const Navabr = () => {

  const { theme ,toggleTheme} = useContext(userContext);
      const [isScrolled, setIsScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTohome = () => {
    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return (
    <div    className={`   backdrop-grayscale-100 fixed top-0 left-0 w-full h-17 z-50 transition-all duration-500 ease-in-out
        
        ${isScrolled ? 'shadow-lg shadow-gray-500/20' : 'shadow-none'}
      `}>
      <div className="wrapnavelement flex w-full justify-around items-center h-14 px-4 sm:px-6 md:px-8">
        <div className="logo w-50 " >
            <h1 onClick={goTohome} className='text-purple-300 font-serif pt-2 text-1xl tracking-wide cursor-pointer '>Jignesh</h1>
        </div>
        <div className="theameicon w-50  text-end">
            <p onClick={toggleTheme} className=' text-white pt-2 text-1xl tracking-wide cursor-pointer '>{ theme ? (<i className="ri-moon-clear-line"></i>) : (<i className="transition-all duration-300 ease-in-out text-amber-600 ri-sun-line"></i>)}</p>
        </div>
      </div>
       
    </div>
   
  )
}
 
export default Navabr


