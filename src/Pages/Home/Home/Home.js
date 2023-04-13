import React, { useState } from 'react';
import AddNote from '../AddNote/AddNote';
import MyNotes from '../MyNotes/MyNotes';
import './Home.css'

const Home = () => {

    const [searchField, setSearchField] = useState('');
    const [filteredData, setFilteredData] = useState([])
    // console.table(filteredData)

    const filedData = {
        searchField,
        setSearchField,
        filteredData,
        setFilteredData
    }
    
    return (
        <div className='p-5 homePage'>
            <AddNote filedData={filedData}></AddNote>
            <MyNotes filedData={filedData}></MyNotes>
        </div>
    );
};

export default Home;