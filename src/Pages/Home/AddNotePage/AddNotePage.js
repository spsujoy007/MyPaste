import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import './Addnotepage.css' //css
import { AuthContext } from '../../../Context/AuthProvider';
// import fireimg from '../../../../public/images/fire.gif'

const AddNotePage = () => {
    const {user} = useContext(AuthContext);
    const [fire, setFire] = useState(false);
    const [noteLength, setNoteLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const userId = localStorage.getItem("user_id");

    const [notetitle, setNotetitle] = useState('')
    const [noteDetailPreview, setNoteDetailPreview] = useState('')
    const [defaultTitle, setDefaultTitle] = useState('')

    if(!userId)
    {
        // console.log(userId)
        navigate('/login')
        window.location.reload()
    }

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
            console.log(data)
            if(data.acknowledged){
                navigator.clipboard.writeText(note)
                toast.success('Note copied')
                navigate(`/note/${data.insertedId}`)
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
                    {/* <button data-tip='Preview not available' className='p-2 hover:text-neutral tooltip tooltip-left'><AiOutlineEye></AiOutlineEye></button> */}

                    {/* preview of note start */}
                    {/* The button to open modal */}
                    <label htmlFor={`${noteDetailPreview && "modal-preview"}`} className="p-2 cursor-pointer hover:text-neutral tooltip tooltip-left">
                        <AiOutlineEye title={`${!noteDetailPreview && "write something"}`}></AiOutlineEye>
                    </label>

                    <input type="checkbox" id="modal-preview" className="modal-toggle" />
                    <div className="modal">
                      <div className="modal-box relative">
                        <label htmlFor="modal-preview" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-xl font-bold">{notetitle}</h3>
                        <p className="py-4 text-lg"><span className='font-bold text-black'>Note:</span> <br /> {noteDetailPreview}</p>
                      </div>
                    </div>
                    {/* preview of note end */}

                </div>
            </div>
            <form onSubmit={handleAddNote}>
            <div>
                <div className='flex items-center'>
                    <input 
                        name='title'
                        defaultValue={defaultTitle}
                        onFocus={() => {setFire(true)}}
                        onBlur={() => setFire(false)}
                        onChange={(e) => setNotetitle(e.target.value)}
                       type="text" placeholder='Title: ' className='w-full text-sm text-primary p-3 outline-none rounded-t-lg border-b-[1px] border-primary 
                        '/> 
                    {
                        fire && <img className='w-[35px] -ml-10 -mt-3' src='https://i.gifer.com/5Mz4.gif' alt="fire" />
                    }
                </div>

                <div className='flex'>
                    <textarea 
                        name="note" 
                        onChange={(e) => {
                            setNoteLength(e.target.value)
                            setDefaultTitle(e.target.value.slice(0, 25))
                            setNoteDetailPreview(e.target.value)
                        }}
                     className='mt-1 whitespace-pre-line caret-primary overflow-hidden border-primary w-full p-3 outline-none  text-primary noteBody' placeholder='write your note champion...' id="" cols="30" rows="13">
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