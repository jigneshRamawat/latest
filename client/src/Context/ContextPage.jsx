import { createContext, useState } from "react";


export const userContext = createContext();

 const ContextPage = ({children})=> {

      const [theme , setTheme] = useState(true);
      const [data,setData] = useState([]);
      const toggleTheme = () => setTheme(!theme);
      return(
        <userContext.Provider value={{theme,toggleTheme,setData,data}}>
        {children}
        </userContext.Provider>
      )

}
export default ContextPage;