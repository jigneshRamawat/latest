import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const data = () => {
    const [project, setProject] = useState([])
    useEffect(() => {
        const getProject = async () => {
            try {
                const res = await axios.get("https://latest-9qs4.onrender.com/project");
                console.log(res.data)
                setProject(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProject();
    }, [])
    return (
        <div>

            <div className="wrap">
                {project.map((item) => {
                    <h1 key={item._id} >{item.id}</h1>
                    
                })}
                <p>hy</p>

            </div>
        </div>
    )
}

export default data
