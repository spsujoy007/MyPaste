import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useHistory } from 'react-router-dom';
import { AiOutlinePushpin, AiOutlineRollback, AiFillPushpin } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import './NoteDetails.css'
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import { DataContext } from '../../../Context/DataProvider';
import { RiEdit2Line } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query';
import LoaderCustom from '../../../Components/LoaderCustom';


const NoteDetails = () => {
    const {user} = useContext(AuthContext);
    const {setCallRefetch, callRefetch} = useContext(DataContext)
    const [editForm, setEditForm] = useState(false)


    const notes = useLoaderData({})
    const {title, note, _id, pinned} = notes;


    
    const handleClickToPin = () => {

        const url = `https://mypaste.vercel.app/pin?id=${notes._id}`
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            // body: JSON.stringify({insert: true})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                window.location.reload()
                toast.success(`${title.slice(0, 15)}... is pinned`)
            }
        })
    }



    const handleRemovePin = () => {
        const url = `https://mypaste.vercel.app/removePin?id=${_id}`
        fetch(url, {
            method: "PUT"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                window.location.reload()
                toast.success(`${title.slice(0, 12)}... is unpinned`)
            }
        })
    }


    const copyNote = () => {
        try{
            navigator.clipboard.writeText(note)
        }
        finally{
            toast("Note copied", {
                icon: '🌿',
                style: {
                    backgroundColor: 'black',
                    color: "white"
                }
            })
        }
    }


    const handleUpdateNote = (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const note = form.note.value;
        fetch(`https://mypaste.vercel.app/editnote?id=${_id}`, {
            method: 'POST',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify({title, note})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount === 1){
                console.log(data)
                toast.success("note updated", {
                    icon: "👌",
                    backgroundColor: 'primary'
                })
                window.location.reload()
                setEditForm(false)
            }
        })
    }


    return (
        <div className='md:max-w-[900px] md:p-0 p-3 mx-auto'>
            <div className='py-5 flex justify-end'>
                <div className='text-2xl text-primary flex gap-2 items-center'>
                    <Link to='/'>
                        <button data-tip='Back to home' className='p-2 hover:text-neutral tooltip tooltip-bottom'><AiOutlineRollback></AiOutlineRollback></button>
                    </Link>

                        {/* click to copy  */}
                        <button onClick={copyNote} data-tip='Tap to copy' className='p-2 hover:text-neutral tooltip tooltip-bottom'><MdContentCopy></MdContentCopy></button>
                        
                        {/* click to edit  */}
                        <button onClick={() => setEditForm(!editForm)} data-tip='Tap to edit note' className='p-2 hover:text-neutral tooltip tooltip-bottom'><RiEdit2Line></RiEdit2Line></button>

                        {
                        !pinned ?
                            <button onClick={handleClickToPin} data-tip='Tap to Pin this note' className='p-2 hover:text-neutral tooltip tooltip-bottom'>
                                <AiOutlinePushpin></AiOutlinePushpin>
                            </button>
                            :
                            <button onClick={handleRemovePin} data-tip='Tap to Pin this note' className='p-2 hover:text-neutral tooltip tooltip-bottom'>
                                <AiFillPushpin></AiFillPushpin>
                            </button>
                        }
                </div>
            </div>

            <div>
                    <div className='flex justify-end my-3'>
                        <p className='text-neutral'>Just click the title or note to edit</p>
                    </div>
               {
                editForm ?

                <form onSubmit={handleUpdateNote}>
                <div className='bg-accent caret-primary p-5 rounded-t-xl shadowNote '>

                    <input name='title' className='text-3xl bg-accent caret-primary text-neutral font-semibold outline-none cursor-text' type="text" defaultValue={title} placeholder='title' />

                    <div className="mt-5">
                        <span className='font-bold uppercase mr-2 text-primary' >Note:</span>  <br />
                        
                        <textarea name="note" placeholder='type your note...' className='bg-accent caret-primary text-neutral cursor-text p-3 mt-3 outline-none text-md break-words whitespace-pre-line w-full min-h-[300px]' type="text" defaultValue={note} />
                    </div>
                </div>


                <div>
                    <button type='submit' className='text-xl bg-primary hover:bg-secondary duration-200 text-white rounded-b-md py-1 px-5 w-full'>Save</button>
                </div>

                <div className='flex items-center justify-end text-red-500 md:mr-3 gap-2 mt-2'>
                    <RiEdit2Line className='animate-bounce text-2xl'></RiEdit2Line> EDIT MOOD
                </div>
                    
                </form>

                :

                <div className='bg-white p-5 rounded-xl'>
                {
                    title ? 
                    <h1 className='text-3xl text-neutral font-semibold'>{title}</h1>
                    :
                    <h1 className='text-2xl text-neutral font-semibold'>🚀 "Hey Gems! You forgot the title? 😅"</h1>
                }

                <div className="mt-5">
                    <span className='font-bold uppercase mr-2 text-primary ' >Note:</span>  <br />
                    <p className='text-neutral mt-3 text-md break-words whitespace-pre-line'>
                        {note}
                    </p>
                </div>
                </div>
               }
            </div>
        </div>
    );
};

export default NoteDetails;