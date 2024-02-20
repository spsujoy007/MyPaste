import React from 'react';
import toast from 'react-hot-toast';

const SortedNotes = ({notes, callRefetch}) => {
    const {title, _id, note,copied_count} = notes;

    const cardAvatar = [
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Jasmine"},
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Lily"},
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Kitty"},
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Max"},
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Bailey"},

        {img: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Zoey"},
        {img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Annie"},
        {img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Max&backgroundColor=f1f4dc&shapeColor=f88c49"},
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=Cleo"},
        {img: "https://api.dicebear.com/7.x/shapes/svg?seed=333364455566%2B%2B%2B%2B%2B"},
    ]
    let avtnum = Math.ceil(Math.random()*9);

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

    return (
        <div onClick={() => {
            callRefetch()
            clickToCopy()
            }} className='border-[1px] hover:border-transparent hover:shadow-lg hover:border-secondary cursor-pointer bg-white p-2 flex items-center gap-3 min-w-full lg:min-w-[300px] md:min-w-[200px] rounded-2xl duration-300'>
            <img className='w-[40px] h-[40px] rounded-full ' src={cardAvatar[avtnum].img} alt='' />
            <div>
                <h2 className='text-primary uppercase text-xs font-bold  flex items-center'>{title.slice(0,20)} <span className='text-sm'> - {copied_count}</span> </h2>
                
                <p className='text-neutral'>{note.slice(0,25)}...</p>
            </div>
        </div>
    );
};

export default SortedNotes;