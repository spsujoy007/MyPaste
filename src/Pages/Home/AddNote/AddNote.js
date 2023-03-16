import React from 'react';
import { BiCommentAdd } from "react-icons/bi";

const AddNote = () => {
    return (
        <div>
            <div className='flex itemsc
             gap-x-2'>
                <input type="text" className='input input-bordered w-full border-primary' placeholder='search here...'/>
                <button data-tip='Click to add new note' className='w-[200px] tooltip tooltip-bottom bg-primary text-white hover:bg-secondary hover:text-neutral duration-200 rounded-md flex gap-2 items-center justify-center'><BiCommentAdd className='text-xl'></BiCommentAdd> Add Note</button>
            </div>
        </div>
    );
};

export default AddNote;