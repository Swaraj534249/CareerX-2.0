import React, { createContext, useState } from 'react'


export const addData = createContext("");

const ContextProvider = ({children}) => {

    const [getuData, setuData] = useState([]);

  return (
    <addData.Provider value={{getuData,setuData}}>
        {{children}}
    </addData.Provider>
  )
}

export default ContextProvider