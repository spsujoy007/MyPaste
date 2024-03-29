import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import PinnedNote from '../Pages/Home/PinnedNote/PinnedNote';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider';

const Main = () => {
  const navigate = useNavigate()
  const theme = localStorage.getItem('currentTheme')

  const {user, logout, fieldValue} = useContext(AuthContext)
  const userData = JSON.parse(localStorage.getItem('userdata'))
  const getuid = localStorage.getItem("user_id");
  const locations = useLocation()

  const {data: myNotesTotal = [], refetch, isLoading} = useQuery({
    queryKey: ['myNotesTotal'],
    queryFn: async () => {
        const res = await fetch(`https://mypaste.vercel.app/notes?email=${userData?.email}&uid=${userData?.uid}`);
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
  refetch()

  const handleSignOut = () => {
    logout()
    .then(() => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("userdata");
      window.location.reload()
    })
    .catch(e => {
      window.location.reload()
      console.error(e)
    })
  }


    return (
        <div data-theme={theme}>
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
    <div className='p-4 w-[80%] md:w-80 bg-secondary'>
    {/* information */}
    {
      userData?.email ?
      <div>
        
        <Link to='/'>
        <button className='flex items-center gap-x-2 mb-5'>
            <img className='w-10' src="https://i.ibb.co/mRLgz9L/logoMP.png" alt="" />
            <h2 className='text-xl font-bold text-neutral'>MyPaste</h2>
        </button>
        </Link>

        <div className='flex justify-between items-center text-neutral gap-x-2 bg-white p-3 rounded-xl'>
            <div className='flex items-start gap-x-2'>
            <Link to="/myprofile">
            <div className="avatar">
            <div className="w-12 rounded-full">
                <img src={user?.photoURL} alt={user?.displayName} />
            </div>
            </div>
            </Link>
            <div>
              <Link to="/myprofile">
                  <h4 className='text-lg uppercase mt-0 font-semibold'>{user?.displayName}</h4>
              </Link>
            {/* <p className='text-sm'>Total note: {myNotesTotal.length}</p> */}
            <p className='text-sm'>Keep Pasting</p>
            </div>
            </div>
            <div data-tip="Tap to logout" className='p-3 tooltip tooltip-left flex items-center'>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0}>
                    <button><AiOutlineLogout className={`text-xl text-primary `}></AiOutlineLogout></button>
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <button className='hover:bg-secondary' onClick={handleSignOut}>Logout</button>
                    </li>
                  </ul>
                </div>
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
        <div className='p-3 bg-white rounded-xl'>
            <h2 className='text-neutral text-md'>Hey devs! Please <span className='font-bold'>login</span> first. Then start copy and pasting!</h2>
            <Link to='/login'><button className='bg-primary w-full py-1 capitalize rounded-md hover:bg-black duration-300 text-white text-sm mt-5'>login</button></Link>
        </div>
        
    </div>
    }
    
    
    </div>

  
  </div>
</div>
        </div>
    );
};

export default Main;