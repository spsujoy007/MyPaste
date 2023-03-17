import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import './NoteCard.css'

const NoteCard = ({mynote, refetch}) => {
    const {title, _id, note} = mynote;
    const [buttonCopy, setButtonCopy] = useState(false)
    const [loading, setLoading] = useState(false)

    const clickToCopy = () => {
        navigator.clipboard.writeText(note)
        toast.success(`${title.slice(0,15)} COPIED!`)
    }

    const handleDeleteNote = (id) => {
        setLoading(true)
        fetch(`http://localhost:5000/deletenote?id=${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`${title.slice(0, 15)}... is deleted`);
                refetch()
                setLoading(false)
            }
        })
    }

    return (
        <div className='rounded-xl  '>
            <div className="h-[150px] overflow-hidden">
            <div onClick={clickToCopy} className='bg-primary hover:cursor-pointer rounded-t-xl text-white p-2'> 
                <h4>{title}</h4>
            </div>
            <div className='p-2 text-neutral text-justify'>
                {note.length > 125 ? <p>{note.slice(0, 125)}...</p> : note}
            </div>
            </div>

            <div className="flex justify-between p-2">
            <div className="dropdown dropdown-top dropdown-start">
                <label tabIndex={0}>
                    <button  className=''>
                        <AiFillDelete className='text-primary text-xl'></AiFillDelete>
                    </button>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        loading ?
                        <button className='bg-primary loading text-white uppercase rounded-md text-xl p-3'>Deleting...</button>
                        :
                        <button onClick={() => handleDeleteNote(_id)} className='bg-primary text-white uppercase rounded-md text-xl p-3'>Delete</button>
                    }
                </ul>
            </div>

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