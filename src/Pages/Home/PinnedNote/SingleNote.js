import React from 'react';
import { BiCopy } from "react-icons/bi";


const SingleNote = ({mynote}) => {
    return (
        <div className='px-2 py-3 bg-accent mt-2 rounded-r-xl border-l-4 border-neutral'>
            <div className="flex justify-between items-center">
                <h4 className='text-neutral font-semibold text-md uppercase'>{mynote.title.slice(0,20)}</h4>
                <button className='px-3'>
                    <BiCopy className='text-xl text-neutral'></BiCopy>
                </button>
            </div>
        </div>
    );
};

export default SingleNote;