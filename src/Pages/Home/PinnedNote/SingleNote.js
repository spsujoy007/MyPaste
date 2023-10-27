import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';


const SingleNote = ({mynote}) => {
    const {title, note} = mynote;
    // const navigate = useNavigate()

    const clickToCopy = () => {
        navigator.clipboard.writeText(mynote?.note)
        toast.success(`${mynote?.title ? mynote.title.slice(0,15) : note.slice(0, 15)} COPIED!`)
    }

    return (
        <div onClick={clickToCopy} className='px-2 py-3 bg-accent mt-2 rounded-xl cursor-pointer duration-500 h-[50px] hover:h-[80px] overflow-hidden'>
            <div  className="flex justify-between items-center mb-3">
                <h4  className='text-neutral font-semibold text-md uppercase'>{title ? title.slice(0,20) : note.slice(0,20)}</h4>
                <Link to={`/note/${mynote._id}`} className='px-2 py-1 h-full'>
                    <AiFillEye className='text-xl text-neutral '></AiFillEye>
                </Link>
            </div>
            <div className=''>
                <p className='text-sm text-neutral'>{note.slice(0,30)}...</p>
            </div>
        </div>
    );
};

export default SingleNote;