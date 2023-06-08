import React, { createContext, useState } from 'react';
export const DataContext = createContext()

const DataProvider = ({children}) => {

    const [callRefetch, setCallRefetch] = useState()

    function fetching(){

    }

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