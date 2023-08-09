import React, { createContext, useEffect, useState } from 'react'
export const TabContext = createContext()

const TabProvider = ({children}) => {

    const [tabIndex,setTabIndex] = useState(0)



  return (
    <TabContext.Provider value={{tabIndex,setTabIndex}}>{children}</TabContext.Provider>
  )
}

export default TabProvider
