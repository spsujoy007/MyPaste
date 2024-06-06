import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import './NoteCard.css'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../../Context/DataProvider';

const NoteCard = ({mynote, callRefetch}) => {
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

    // const cardAvatar = [
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Jasmine"},
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Lily"},
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Kitty"},
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Max"},
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Bailey"},

    //     {img: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Zoey"},
    //     {img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Annie"},
    //     {img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Max&backgroundColor=f1f4dc&shapeColor=f88c49"},
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Cleo"},
    //     {img: "https://api.dicebear.com/7.x/shapes/svg?seed=333364455566%2B%2B%2B%2B%2B"},
    // ]
    // let avtnum = Math.ceil(Math.random()*9);


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
        <div className={`rounded-3xl overflow-hidden h-[${title.length}] bg-white noteCard  hover:shadow-2xl hover:shadow-secondary  duration-500`}>
            <div className='p-3 flex items-start md:h-[150px] min-h-[50px]' onClick={() => navigate(`/note/${_id}`)}>
                {/* <img  className='w-[48px] p-[2px] border-2 border-neutral h-[48px] rounded-full' src={cardAvatar[avtnum].img} alt='logo'/> */}
                <h1 className='text-4xl text-white '>{title.slice(0,2) > 'a' ? title.slice(0,2) :  <p className='w-[50px] h-[50px] text-5xl  text-center bg-primary rounded-full'>{title.slice(0,1)}</p> }</h1>
                <div className='ml-[23px]'>
                    <h1 
                        data-tip='Click to copy' 
                        onClick={() => {
                        clickToCopy(_id)
                        setButtonCopy(true)
                        setTimeout(() => setButtonCopy(false), 3000)
                    }} className='text-[20px] tooltip tooltip-bottom text-left font-semibold text-neutral'>{title.length ? title.slice(0,25) : note.slice(0,32)}</h1>
                    <p className='text-neutral text-sm w-[250px] h-[80%] overflow-hidden break-words whitespace-pre-line'>{note.slice(0, 120)}...</p>
                </div>
            </div>

            <div className='w-full mt-[13px] flex items-center gap-[2px] border-t-[2px] border-secondary'>
            <div className="dropdown dropdown-top dropdown-start w-1/2 h-[44px] bg-secondary hover:bg-neutral duration-300 mt-[2px]">
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
                    }} className='text-white h-[44px] flex items-center justify-center gap-2 uppercase bg-secondary hover:bg-neutral duration-300 w-1/2 mt-[2px]'><BiCopy className='text-2xl'></BiCopy> {buttonCopy ? 'copied': 'copy'}
                </button>
            </div>
        </div>
    );
};

export default NoteCard;