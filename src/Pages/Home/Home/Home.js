import React from 'react';
import AddNote from '../AddNote/AddNote';
import MyNotes from '../MyNotes/MyNotes';

const Home = () => {
    return (
        <div className='p-5'>
            <AddNote></AddNote>
            <MyNotes></MyNotes>
        </div>
    );
};

export default Home;