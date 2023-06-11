import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import './NoteCard.css'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../../Context/DataProvider';

const NoteCard = ({mynote, callRefetch, index}) => {
    const {setCallRefetch} = useContext(DataContext)

    const {title, _id, note} = mynote;
    const [buttonCopy, setButtonCopy] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const clickToCopy = () => {
        try{
            navigator.clipboard.writeText(note)
        }
        finally{
            toast.success(`${title.slice(0,15)} COPIED!`)
            const url = `http://localhost:5000/copiedCount?id=${_id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        }
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
                callRefetch()
                // setCallRefetch(refetch)
                setCallRefetch(true)
                setLoading(false)
            }
        })
    }

    return (
        <div className={`rounded-3xl ${index === 0 ? "bg-white": "bg-secondary" } noteCard hover:bg-white hover:shadow-xl shadow-primary hover:scale-[1.01] duration-500`}>
            <div className='noteCard'>
            <div onClick={() => navigate(`/note/${_id}`)} className="h-[150px] overflow-hidden">
            <div data-tip='Click to copy' onClick={() => {
                clickToCopy(_id)
                setButtonCopy(true)
                setTimeout(() => setButtonCopy(false), 3000)
                }} className='bg-neutral tooltip tooltip-top w-full text-left hover:cursor-pointer rounded-t-xl text-white p-2'> 
                <h4>{title.length ? title.slice(0,32) : note.slice(0,32)}</h4>
            </div>
            <div className='p-2 text-neutral '>
                <p onClick={() => navigate(`/note/${_id}`)}>
                    {note.length > 125 ? <p>{note.slice(0, 125)}...</p> : note}
                </p>
            </div>
            </div>

            <div className="flex justify-between p-2 rounded-b-xl">
            <div className="dropdown dropdown-top dropdown-start">
                <label tabIndex={0}>
                    <button className=''>
                        <AiFillDelete className='text-primary text-2xl'></AiFillDelete>
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
                    }} className='text-neutral flex gap-2 uppercase'><BiCopy className='text-2xl'></BiCopy> {buttonCopy ? 'copied': 'copy'}
                </button>
            </div>
            </div>
        </div>
    );
};

export default NoteCard;