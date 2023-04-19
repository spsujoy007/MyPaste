import React, { useState } from 'react';
import { BiCommentAdd } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const AddNote = ({filedData}) => {
    const {setFieldValue} = useContext(AuthContext);
    const {searchField, setSearchField} = filedData;
    
    const handleCustomTheme = (themeName) => {
        if(themeName === 'cl_redbull' || themeName === 'cl_blackberry' || themeName === 'default' || themeName === 'cl_bluedream' || themeName === 'cl_teal'){
            // setMyTheme(themeName)
            localStorage.setItem('currentTheme', themeName)
        }
    }
    
    return (
        <div>
            <div className=' flex items-center
             gap-x-2'>
                <input type="text" value={searchField} onChange={(e) => {
                    setSearchField(e.target.value)
                    setFieldValue(e.target.value)
                    handleCustomTheme(e.target.value)
                }} className='input input-bordered w-full border-primary' placeholder='search here...'/>
                <div className='hidden md:block'>
                    <Link to='/addnote'>
                    <div>
                    <button data-tip='Click to add new note' className='w-[200px] flex gap-2 items-center justify-center tooltip tooltip-bottom bg-primary text-white hover:bg-secondary hover:text-neutral duration-200 rounded-md h-[47px]'>
                        <BiCommentAdd className='text-xl'></BiCommentAdd> Add Note
                    </button>
                    </div>
                    </Link>
                </div>
                <div className='md:hidden block'>
                    <label htmlFor="siteDashBoard" className="btn btn-primary drawer-button ">
                        <AiOutlineMenu className='text-2xl text-white'></AiOutlineMenu>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AddNote;