import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";
import './NoteCard.css'

const NoteCard = ({mynote}) => {
    const {title, _id, note} = mynote;
    // const [textCopy, setTextCopy] = useState({note})
    const [buttonCopy, setButtonCopy] = useState(false)
    const clickToCopy = () => {
        navigator.clipboard.writeText(note)
        toast.success(`${title.slice(0,15)} COPIED!`)
    }

    return (
        <div className='rounded-xl border-2 border-primary '>
            <div className="h-[150px] overflow-hidden">
            <div className='bg-primary  rounded-t-xl text-white p-2'> 
                <h4>{title}</h4>
            </div>
            <div className='p-2 text-neutral'>
                {note.length > 125 ? <p>{note.slice(0, 125)}...</p> : note}
            </div>
            </div>

            <div className='styleShape'></div>

            <div className="flex justify-end p-2">
                <button onClick={() => {
                    clickToCopy()
                    setButtonCopy(true)
                    setTimeout(() => setButtonCopy(false), 3000)
                    }} className='text-primary flex gap-2 uppercase'><BiCopy className='text-2xl'></BiCopy> {buttonCopy ? 'copied': 'copy'}</button>
            </div>
        </div>
    );
};

export default NoteCard;