import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import PinnedNote from '../Pages/Home/PinnedNote/PinnedNote';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider';

const Main = () => {

  const {user, logout} = useContext(AuthContext)
  const locations = useLocation()
  console.log(locations)

  const {data: myNotesTotal = [], refetch, isLoading} = useQuery({
    queryKey: ['myNotesTotal'],
    queryFn: async () => {
        const res = await fetch(`http://localhost:5000/notes?email=${user?.email}`);
        const data = await res.json()
        return data
    }
})

  if(isLoading){
      return <div className='flex items-center justify-center h-[100vh]'>
      <div>
        <h2 className='text-6xl font-semibold text-primary uppercase animate-pulse'>Loading...</h2>
        <p className='text-2xl text-secondary'>Wait for sometime</p>
      </div>
    </div>
  }

  const handleSignOut = () => {
    logout()
    .then(() => {})
    .catch(e => console.error(e))
  }

    return (
        <div data-theme='light'>
            <div className="drawer drawer-mobile bg-accent">
  <input id="siteDashBoard" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content overflow-hidden">
    <Outlet></Outlet>
    {
      locations.pathname !== '/addnote' && 
      <div className='flex items-end justify-end fixed m-10 lg:hidden top-[80%] left-[70%] z-10'>
      <Link to='/addnote'>
      <div className='bg-primary p-3 rounded-full  mt-5 mr-20 '>
        <AiOutlinePlus className='text-white font-bold text-3xl'></AiOutlinePlus>
      </div>
      </Link>
    </div>
    }
  
  </div> 
  <div className="drawer-side " >
    <label htmlFor="siteDashBoard" className="drawer-overlay"></label> 
    <div className='p-4 w-80 bg-secondary'>
    {/* information */}
    {
      user?.email ?
      <div>
        <Link to='/'>
        <button className='flex items-center gap-x-2 mb-5'>
          <img className='w-10' src="https://i.ibb.co/mRLgz9L/logoMP.png" alt="" />
          <h2 className='text-xl font-bold text-neutral'>MyPaste</h2>
        </button>
        </Link>
        <div className='flex justify-between items-center text-neutral gap-x-2 bg-white p-3 rounded-xl'>
            <div className='flex items-start gap-x-2'>
            <div className="avatar">
            <div className="w-12 rounded-full">
                <img src={user?.photoURL} alt={user?.displayName} />
            </div>
            </div>
            <div>
            <h4 className='text-lg uppercase mt-0 font-semibold'>{user?.displayName}</h4>
            <p className='text-sm'>Total note: {myNotesTotal.length}</p>
            </div>
            </div>
            <div data-tip="Tap to logout" className='p-3 tooltip tooltip-left flex items-center'>
                <button  onClick={handleSignOut}><AiOutlineLogout className={`text-xl text-primary `}></AiOutlineLogout></button>
            </div>
        </div>
        <ul className="menu  text-base-content mt-10">
      <PinnedNote></PinnedNote>
    </ul>
    </div>
    :
    <div>
      <button>
          <h2 className='text-xl font-bold mb-6 text-neutral p-2 '>MyPaste</h2>
        </button>
        <h2 className='text-neutral text-xl p-3 bg-white rounded-xl'>Hey devs! Please login first.</h2>
    </div>
    }
    
    
    </div>

  
  </div>
</div>
        </div>
    );
};

export default Main;