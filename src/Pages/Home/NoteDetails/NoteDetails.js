import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AiOutlinePushpin, AiOutlineRollback, AiFillPushpin } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import './NoteDetails.css'
import { toast } from 'react-hot-toast';
import { DataContext } from '../../../Context/DataProvider';
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query';
import LoaderCustom from '../../../Components/LoaderCustom';


const NoteDetails = () => {
    const {setCallRefetch} = useContext(DataContext)
    const [editForm, setEditForm] = useState(false)
    const [loading, setLoading] = useState(true);
    const [saveFormLoad, setSaveFormLoad] = useState(false) //when click on the save after edit note (loading!)
    const navigate = useNavigate()


    const notes = useLoaderData({})
    const {_id} = notes;

    const {data: singleNote = {}, refetch} = useQuery({
        queryKey: ["singleNote"],
        queryFn: async () => {
            const res = await fetch(`https://mypaste.vercel.app/singlenote?id=${_id}`);
            const data = res.json()
            setLoading(false)
            return data 
        }
    })
    const {title, note, pinned} = singleNote;


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
                // window.location.reload()
                refetch()
                setCallRefetch(true)
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
                // window.location.reload()
                refetch()
                setCallRefetch(true)
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
        setSaveFormLoad(true)
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
                refetch()
                setEditForm(false)
                setCallRefetch(true)
                setSaveFormLoad(false)
            }
        })
    }
    

    const handleDeleteNote = () => {
        setLoading(true)
        fetch(`https://mypaste.vercel.app/deletenote?id=${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                setLoading(false)
                toast.success(`${title.slice(0, 15)}... is deleted`);
                setCallRefetch(true)
                navigate('/')
            }
        })
    }


    return (
        // <div className='md:max-w-[900px]   mx-auto'>
        <div className='px-10'>
            {
                loading ?
                <LoaderCustom></LoaderCustom>
                :
                <>
                    <div className='py-5 flex justify-end'>
                <div className='text-2xl text-primary flex gap-2 items-center'>
                    <Link to='/'>
                        <button data-tip='Back to home' className='p-2 hover:text-neutral tooltip tooltip-bottom'><AiOutlineRollback></AiOutlineRollback></button>
                    </Link>

                        {/* click to copy  */}
                        <button onClick={copyNote} data-tip='Tap to copy' className='p-2 hover:text-neutral tooltip tooltip-bottom'><MdContentCopy></MdContentCopy></button>
                        
                        {/* click to edit  */}
                        <button onClick={() => setEditForm(!editForm)} data-tip='Tap to edit note' className='p-2 hover:text-neutral tooltip tooltip-bottom'><RiEdit2Line></RiEdit2Line></button>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0}>
                                <button data-tip='Tap to delete note' className='p-2 hover:text-neutral tooltip tooltip-bottom'><RiDeleteBinLine></RiDeleteBinLine></button>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li className='text-xl'><button onClick={handleDeleteNote}>Delete</button></li>
                            </ul>
                        </div>

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
               {
                editForm ?

                <form onSubmit={handleUpdateNote}>
                    <div className='flex justify-end my-3'>
                        <p className='text-neutral'>Just click the <span className='font-bold'>title</span> or <span className='font-bold'>note</span> to edit</p>
                    </div>
                <div className='bg-accent caret-primary p-3 mt-5 rounded-t-xl  border-primary'>

                    <input name='title' className='md:text-3xl text-lg w-full bg-accent caret-red-500 text-neutral font-semibold outline-none cursor-text' type="text" defaultValue={title} placeholder='title' />

                    <div className="mt-5">
                        <span className='font-bold uppercase select-none mr-2 text-primary' >Note:</span>  <br />
                        
                        <textarea name="note" placeholder='type your note...' className=' caret-red-500 text-neutral rounded-xl cursor-text p-3 mt-3 outline-none text-md break-words bg- whitespace-pre-line w-full min-h-[400px]' type="text" defaultValue={note} />
                    </div>
                </div>


                <div>
                    {
                        saveFormLoad ?
                        <button type='submit' className='text-xl bg-primary loading hover:bg-secondary duration-200 text-white rounded-b-md py-1 px-5 w-full'>Saving...</button>
                        :
                        <button type='submit' className='text-xl bg-primary hover:bg-secondary duration-200 text-white rounded-md py-1 px-5 w-full'>Save</button>
                    }
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
                    <span className='font-bold select-none uppercase mr-2 text-primary ' >Note:</span>  <br />
                    <p className='text-neutral mt-3 text-md break-words whitespace-pre-line'>
                        {note}
                    </p>
                </div>
                </div>
               }
            </div>
                </>
            }
        </div>
    );
};

export default NoteDetails;