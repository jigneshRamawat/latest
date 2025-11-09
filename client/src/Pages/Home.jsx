import React, { useContext, useEffect } from 'react'
import { userContext } from '../Context/ContextPage'
import myPhoto from "../img/portfolioimg.jpg";
import Api from "../Api";

const Home = () => {
    const { theme, setData, data } = useContext(userContext)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await Api("/posts");
        setData(response.data);
    }

    return (
        <div className={`${theme ? "bg-transparent" : "bg-transparent"} transition-all duration-500 ease-in-out pb-10`}>
            <div className=" pt-25 wrap flex flex-col   w-full ">
                <div className="top items-center text-center justify-center">
                    <p className={`${theme ? "text-white" : "text-black"} pb-1 transition-all duration-500 ease-in-out`}>Hello, I'm</p>
                    <h2 className='text-purple-300 font-serif text-5xl'>Jignesh Ramawat</h2>
                    <p className={`${theme ? "text-white" : "text-black"} pt-2 transition-all duration-500 ease-in-out`}>(   MernStack Developer )</p>
                </div>
                <div className="button pt-10 justify-center items-center text-center flex gap-5">
                    <button className='hover:bg-purple-200 hover:text-black transition-all duration-300 ease-in-out p-3.5 font-serif bg-transparent border-purple-300 border-2  rounded-2xl cursor-pointer text-purple-300'>Download CV</button>
                    <button className='p-3.5 font-serif bg-transparent rounded-2xl cursor-pointer  border-purple-300 border-2 text-purple-300'>About</button>
                </div>
            </div>

            <div className="relative flex items-center justify-center  pb-5 w-full mt-16">

                <div className="absolute left-5 sm:left-10 md:left-20 lg:left-50 flex flex-col gap-4">
                    <i
                        className={`${theme ? "text-purple-400" : "text-gray-950"} ri-linkedin-fill 
      text-2xl sm:text-xl md:text-1xl bg-gray-100 rounded-full p-2 sm:p-1 md:p-2`}
                    ></i>
                    <i
                        className={`${theme ? "text-purple-400" : "text-gray-950"} ri-github-fill 
      text-2xl sm:text-xl md:text-1xl bg-gray-100 rounded-full p-2 sm:p-1 md:p-2`}
                    ></i>
                    <i
                        className={`${theme ? "text-purple-400" : "text-gray-950"} ri-dribbble-line 
      text-2xl sm:text-xl md:text-1xl bg-gray-100 rounded-full p-2 sm:p-1 md:p-2`}
                    ></i>
                </div>

                {data.map((p) => (


                    <div key={p._id} className="flex justify-center h-50 sm:h-65 md:h-80 lg:-h-100  w-40 sm:w-50 md:w-60 lg:w-72 rounded-b-3xl">
                        <img
                            className={`${theme ? "border-white" : "border-purple-200"
                                }  rounded-t-full border-4 object-cover`}
                            src={p.image && p.image.url ? p.image.url : myPhoto}
                            alt={p.title || "Post Image"}

                        />
                    </div>
                ))}

                <div className="absolute lg:right-50 md:right-20 cursor-pointer  right-[0] sm:right-10 flex flex-col justify-end">
                    <p
                        className={`${theme ? "text-white" : "text-black"} text-sm sm:text-xs rotate-90`}
                    >
                        <i className="ri-toggle-line mr-1"></i> Scroll Down
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home
