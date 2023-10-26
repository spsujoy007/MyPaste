import React, { useContext, useState } from 'react';
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
            const url = `https://mypaste.vercel.app/copiedCount?id=${_id}`
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
        fetch(`https://mypaste.vercel.app/deletenote?id=${id}`, {
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
        <div className={`rounded-3xl overflow-hidden bg-white noteCard hover:bg-white hover:shadow-xl shadow-primary  duration-500`}>
            <div className='p-3 flex items-start h-[250px]'>
                <img className='w-[45px] h-[45px] rounded-full mr-[23px]' src={'https://api.dicebear.com/7.x/shapes/svg?seed=Simba'} alt='logo'/>
                <div>
                    <h1 onClick={() => {
                        clickToCopy(_id)
                        setButtonCopy(true)
                        setTimeout(() => setButtonCopy(false), 3000)
                    }} className='text-[20px] font-semibold text-neutral'>{title.length ? title.slice(0,25) : note.slice(0,32)}</h1>
                    <p className='text-neutral text-sm w-[80%] overflow-hidden'>{note.slice(0, 220)}...</p>
                </div>
            </div>
            <div className='w-full mt-[13px] flex items-center gap-[2px]'>

            <div className="dropdown dropdown-top dropdown-start w-1/2 h-[44px] bg-secondary hover:bg-neutral duration-300">
                <label tabIndex={0}>
                    <button className='flex w-full h-full items-center justify-center text-center'>
                        <AiFillDelete className='text-white text-2xl'></AiFillDelete>
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
                    }} className='text-white h-[44px] flex items-center justify-center gap-2 uppercase bg-secondary hover:bg-neutral duration-300 w-1/2'><BiCopy className='text-2xl'></BiCopy> {buttonCopy ? 'copied': 'copy'}
                </button>
            </div>
        </div>
    );
};

export default NoteCard;