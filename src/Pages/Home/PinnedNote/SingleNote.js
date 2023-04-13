import React from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const SingleNote = ({mynote}) => {
    const navigate = useNavigate()

    const clickToCopy = () => {
        navigator.clipboard.writeText(mynote?.note)
        toast.success(`${mynote?.title.slice(0,15)} COPIED!`)
    }

    return (
        <div className='px-2 py-3 bg-accent mt-2 rounded-xl cursor-pointer hover:rounded-none duration-500'>
            <div onClick={clickToCopy} className="flex justify-between items-center">
                <h4 className='text-neutral font-semibold text-md uppercase'>{mynote.title.slice(0,20)}</h4>
                <button onClick={() => navigate(`/note/${mynote._id}`)} className='px-3 animate-pulse duration-500'>
                    <AiFillEye className='text-2xl text-neutral'></AiFillEye>
                </button>
            </div>
        </div>
    );
};

export default SingleNote;