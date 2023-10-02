
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";





export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    
    
       const  login=(user)=>{
            setUser(user)
       }
       const logout=()=>{
        setUser(null)
       }
         
    
    return(<AuthContext.Provider value={{user,login,logout}}>
        {children} 
    </AuthContext.Provider>);
    
}

export const useAuth=()=>{
    return useContext(AuthContext)
}