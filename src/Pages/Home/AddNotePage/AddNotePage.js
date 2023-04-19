import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
// import fireimg from '../../../../public/images/fire.gif'

const AddNotePage = () => {
    const {user} = useContext(AuthContext);
    const [fire, setFire] = useState(false);
    const [noteLength, setNoteLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleAddNote = (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const title = form.title.value;
        const note = form.note.value;
        const notebody = {
            title,
            note,
            email: user?.email,
            copied_count: 0
        }

        if(noteLength.length >= 5){
            const url = `https://mypaste.vercel.app/addnote`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(notebody)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                navigator.clipboard.writeText(note)
                toast.success('Note copied')
                navigate('/')
                setLoading(false)
            }
        })
        }
        else{
            toast.error('Hey Gems! Please write something then add, at least 5 letters')
            setLoading(false)
        }
    }

    return (
        <div className='md:px-20 px-3'>
            <div className='py-5 flex justify-end'>
                <div className='text-2xl text-primary flex gap-x-3'>
                    <Link to='/'>
                    <button data-tip='Back to home' className='p-2 hover:text-neutral tooltip tooltip-bottom'><AiOutlineRollback></AiOutlineRollback></button>
                    </Link>
                    <button data-tip='Preview not available' className='p-2 hover:text-neutral tooltip tooltip-left'><AiOutlineEye></AiOutlineEye></button>
                </div>
            </div>
            <form onSubmit={handleAddNote}>
            <div>
                <div className='flex items-center'>
                    <input name='title' onFocus={() => {setFire(true)}} onBlur={() => setFire(false)} type="text" placeholder='title' className='w-full text-xl text-primary p-3 outline-none border-l-4 border-primary'/> 
                    {
                        fire && <img className='w-[35px] -ml-10 -mt-3' src='https://i.gifer.com/5Mz4.gif' alt="fire" />
                    }
                </div>

                <div className='flex'>
                    <textarea name="note" onChange={(e) => {setNoteLength(e.target.value)}} className='mt-2 overflow-hidden border-l-4 border-primary w-full p-3 outline-none rounded-r-md text-primary ' placeholder='write your note champion...' id="" cols="30" rows="13">
                    </textarea>
                    
                </div>

                <div>
                    {
                        loading ?
                        <button className='loading w-full text-center bg-primary text-white hover:bg-secondary hover:text-neutral duration-200 rounded-b-md p-3 uppercase flex items-center justify-center gap-x-3'><AiOutlineFileAdd className='text-xl'></AiOutlineFileAdd> adding...</button>
                        :
                        <button type='submit' data-tip='Click to add and auto copy the "note"' className='tooltip tooltip-top w-full text-center bg-primary text-white hover:bg-secondary hover:text-neutral duration-200 rounded-b-md p-3 uppercase flex items-center justify-center gap-x-3'>Click to add</button>
                    }
                </div>

                <div className=' text-neutral text-sm'>
                    when you add the note will be saved on your clipboard
                </div>
            </div>
            </form>
        </div>
    );
};

export default AddNotePage;