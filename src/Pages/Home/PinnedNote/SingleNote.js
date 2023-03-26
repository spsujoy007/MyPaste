import React from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";


const SingleNote = ({mynote}) => {

    const clickToCopy = () => {
        navigator.clipboard.writeText(mynote?.note)
        toast.success(`${mynote?.title.slice(0,15)} COPIED!`)
    }

    return (
        <div className='px-2 py-3 bg-accent mt-2 rounded-xl '>
            <div className="flex justify-between items-center">
                <h4 className='text-neutral font-semibold text-md uppercase'>{mynote.title.slice(0,20)}</h4>
                <button onClick={clickToCopy} className='px-3'>
                    <BiCopy className='text-xl text-neutral'></BiCopy>
                </button>
            </div>
        </div>
    );
};

export default SingleNote;