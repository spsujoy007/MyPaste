import React from 'react';
import { Outlet } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import PinnedNote from '../Pages/Home/PinnedNote/PinnedNote';

const Main = () => {
    return (
        <div data-theme='light'>
            <div className="drawer drawer-mobile bg-accent">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side " >
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <div className='p-4 w-80 bg-secondary'>
    {/* information */}
    <div>
        <h2 className='text-xl font-bold mb-6 text-neutral p-2 '>MyPaste</h2>
        <div className='flex justify-between items-center text-neutral gap-x-2 bg-white p-3 rounded-xl'>
            <div className='flex items-start gap-x-2'>
            <div className="avatar">
            <div className="w-12 rounded-full">
                <img src="https://i.ibb.co/zm5y2Z1/275702359-154109040392904-2771545278164783547-n.jpg" />
            </div>
            </div>
            <div>
            <h4 className='text-lg uppercase mt-0 font-semibold'>Sujoy Paul</h4>
            <p className='text-sm'>Total paste: 00</p>
            </div>
            </div>
            <div className='p-3'>
                <AiOutlineLogout className='text-xl text-primary'></AiOutlineLogout>
            </div>
        </div>
    </div>
    
    <ul className="menu  text-base-content mt-10">
      <PinnedNote></PinnedNote>
    </ul>
    </div>

  
  </div>
</div>
        </div>
    );
};

export default Main;