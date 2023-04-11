import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import PinnedNote from '../Pages/Home/PinnedNote/PinnedNote';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider';

const Main = () => {

  const {user, logout} = useContext(AuthContext)

    const {data: myNotes = [], refetch, isLoading} = useQuery({
      queryKey: ['myNotes'],
      queryFn: async () => {
          const res = await fetch(`http://localhost:5000/notes`);
          const data = await res.json()
          return data
      }
  })

  refetch()

  if(isLoading){
      return <h2 className=''>Loading...</h2>
  }

  const handleSignOut = () => {
    logout()
    .then(() => {})
    .catch(e => console.error(e))
  }

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
    {
      user?.email ?
      <div>
        <Link to='/'>
        <button>
          <h2 className='text-xl font-bold mb-6 text-neutral p-2 '>MyPaste</h2>
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
            <p className='text-sm'>Total paste: {myNotes.length}</p>
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