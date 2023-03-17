import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { } from "react-icons/ai";
// import fireimg from '../../../../public/images/fire.gif'

const AddNotePage = () => {
    const [fire, setFire] = useState(false);

    return (
        <div className='px-20'>
            <div className='py-5 flex justify-end'>
                <div className='text-2xl text-primary flex gap-x-3'>
                    <Link to='/'>
                    <button data-tip='Back to home' className='p-2 hover:text-neutral tooltip tooltip-bottom'><AiOutlineRollback></AiOutlineRollback></button>
                    </Link>
                    <button data-tip='Preview text' className='p-2 hover:text-neutral tooltip tooltip-bottom'><AiOutlineEye></AiOutlineEye></button>
                </div>
            </div>
            <div>
                <div className='flex items-center'>
                    <input onFocus={() => {setFire(true)}} onBlur={() => setFire(false)} type="text" placeholder='title' name='title' className='w-full text-xl text-primary p-3 outline-none border-l-8 border-primary'/> 
                    {
                        fire && <img className='w-[35px] -ml-10 -mt-3' src='https://i.gifer.com/5Mz4.gif' alt="fire" />
                    }
                </div>

                <textarea className='mt-2 overflow-hidden border-l-8 border-primary w-full p-3 outline-none rounded-r-md text-primary' placeholder='write your note champion...' name="note" id="" cols="30" rows="13"></textarea>

                <div className='flex items-center justify-between'>
                    <div className=' text-neutral text-sm'>when you add it will be saved on your clipboard</div>
                    
                    <button className='tooltip tooltip-bottom bg-primary text-white hover:bg-secondary hover:text-neutral duration-200 rounded-md p-3 uppercase flex items-center gap-x-3'><AiOutlineFileAdd className='text-xl'></AiOutlineFileAdd> Click to add</button>
                </div>
            </div>
        </div>
    );
};

export default AddNotePage;