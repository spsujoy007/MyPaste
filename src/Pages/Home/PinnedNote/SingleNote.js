import React from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';


const SingleNote = ({mynote}) => {
    const {title, note} = mynote;
    const navigate = useNavigate()

    const clickToCopy = () => {
        navigator.clipboard.writeText(mynote?.note)
        toast.success(`${mynote?.title ? mynote.title.slice(0,15) : note.slice(0, 15)} COPIED!`)
    }

    return (
        <div className='px-2 py-3 bg-accent mt-2 rounded-xl cursor-pointer hover:rounded-none duration-500'>
            <div className="flex justify-between items-center">
                <h4 onClick={clickToCopy} className='text-neutral font-semibold text-md uppercase'>{title ? title.slice(0,20) : note.slice(0,20)}</h4>
                <Link to={`/note/${mynote._id}`} className='px-2 py-1 h-full'>
                    <AiFillEye className='text-xl text-neutral animate-pulse duration-500'></AiFillEye>
                </Link>
            </div>
        </div>
    );
};

export default SingleNote;