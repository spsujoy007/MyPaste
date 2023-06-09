import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
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

    const notes = useLoaderData({})
    const {title, note, _id, pinned} = notes;
    
    // const {data: notes = [], refetch, isLoading} = useQuery({
    //     queryKey: ["notes"],
    //     queryFn: async () => {
    //         const res = await fetch(`https://mypaste.vercel.app/note/${getNoteId}`)
    //         const data = res.json()
    //         return data;
    //     }
    // })

    // if(isLoading){
    //     return <LoaderCustom></LoaderCustom>
    // }
    
    // if(callRefetch){
    //     refetch()
    // }


    
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
                        <button  data-tip='Tap to edit note' className='p-2 hover:text-neutral tooltip tooltip-bottom'><RiEdit2Line></RiEdit2Line></button>

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
                {
                    title ? 
                    <h1 className='text-3xl text-neutral font-semibold'>{title}</h1>
                    :
                    <h1 className='text-2xl text-neutral font-semibold'>🚀 "Hey Gems! You forgot the title? 😅"</h1>
                }

                <div className="mt-3">
                <span className='font-bold uppercase mr-2 text-black ' >Note:</span>  <br />
                <p className='text-neutral mt-5 text-md break-words whitespace-pre-line'>
                    {note}
                </p>
                </div>
            </div>
        </div>
    );
};

export default NoteDetails;