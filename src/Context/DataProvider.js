import React, { createContext, useEffect, useState } from 'react';
export const DataContext = createContext()

const DataProvider = ({children}) => {

    const [callRefetch, setCallRefetch] = useState()

    useEffect(() => {
        setInterval(() => {
            setCallRefetch(false)
        }, 2000)
    } ,[callRefetch])

    const provideDatas =  {
        setCallRefetch,
        callRefetch
    }
    
    return (
        <DataContext.Provider value={provideDatas}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;