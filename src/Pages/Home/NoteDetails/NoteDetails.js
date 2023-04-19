import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AiOutlinePushpin, AiOutlineRollback, AiFillPushpin } from "react-icons/ai";
import './NoteDetails.css'
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';


const NoteDetails = () => {
    const {user} = useContext(AuthContext);
    // console.log(user)
    const notes = useLoaderData({})
    const {title, note, _id, pinned} = notes;
    console.log("Notebody", notes)

    
    const handleClickToPin = () => {

        const url = `https://mypaste.vercel.app/pin?id=${_id}`
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

    return (
        <div className='md:max-w-[900px] md:p-0 p-3 mx-auto'>
            <div className='py-5 flex justify-end'>
                <div className='text-2xl text-primary flex gap-2 items-center'>
                    <Link to='/'>
                        <button data-tip='Back to home' className='p-2 hover:text-neutral tooltip tooltip-bottom'><AiOutlineRollback></AiOutlineRollback></button>
                    </Link>
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

            <div className="bg-white p-5 rounded-xl shadowNote">
                <h1 className='text-3xl text-neutral font-semibold'>{title}</h1>
                <div className="mt-3">
                <span className='font-bold uppercase mr-2 text-black ' >Note:</span>  <br />
                <p className=' text-neutral text-md break-words'>
                    {note}
                </p>
                </div>
            </div>
        </div>
    );
};

export default NoteDetails;