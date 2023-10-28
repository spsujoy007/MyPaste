import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const {user} = useContext(AuthContext)
    const userData = JSON.parse(localStorage.getItem('userdata'))

    const {data: myNotes = [], refetch, isLoading} = useQuery({
        queryKey: ['myNotes'],
        queryFn: async () => {
            const res = await fetch(`https://mypaste.vercel.app/notes?email=${userData.email}&uid=${userData.uid}`);
            const data = await res.json()
            return data
        }
    })
    // setFilteredData(myNotes)
    refetch()

    return (
        <div className='md:max-w-[800px] mx-auto py-10 mt-10 px-10 rounded-xl md:px-0 bg-white'>
            <div className=' p-10  md:flex justify-center items-center gap-10'>
                <div className="avatar  flex justify-center">
                    <div className="w-[120px] rounded-full">
                        <img className='' src={user?.photoURL} alt="" />
                    </div>
                </div>
                <div className='md:text-left text-center md:mt-0 mt-5'>
                    <h2 className='text-3xl uppercase font-semibold text-primary select-none'>{user?.displayName}</h2>
                    <h5 className='text-md text-secondary select-none'>{user?.email}</h5>
                    <p className='text-neutral text-left text-sm'>total notes: <span className='font-bold'>{myNotes.length}</span></p>
                    <Link to={'/'}>
                        <button className='px-10 mt-5 py-2 bg-primary hover:bg-secondary text-white uppercase rounded-md'>My Notes</button>
                    </Link>
                </div>
            </div>
            {/* <div className='px-3 py-2 rounded-b-xl   flex items-center gap-5'>
                <div className="avatar">
                    <div className="w-[30px] rounded-full">
                            <img className='' src={user?.photoURL} alt="" />
                    </div>
                </div>
                <div>
                    <p className='text-neutral'>total notes: <span className='font-bold'>{myNotes.length}</span></p>
                </div>
            </div> */}
        </div>
    );
};

export default MyProfile;