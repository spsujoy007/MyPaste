import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const {user} = useContext(AuthContext)

    return (
        <div className='md:max-w-[800px] mx-auto pt-10 mt-10 px-10 rounded-xl md:px-0 bg-white'>
            <div className=' p-10  md:flex justify-center items-center gap-10'>
                <div className="avatar  flex justify-center">
                    <div className="w-[120px] rounded-full">
                        <img className='' src={user?.photoURL} alt="" />
                    </div>
                </div>
                <div className='md:text-left text-center md:mt-0 mt-5'>
                    <h2 className='text-3xl uppercase font-semibold text-primary'>{user?.displayName}</h2>
                    <h5 className='text-md text-secondary'>{user?.email}</h5>
                    <Link to={'/'}>
                        <button className='px-10 mt-5 py-2 bg-primary hover:bg-secondary text-white uppercase rounded-md'>Home</button>
                    </Link>
                </div>
            </div>
            <div className='p-3 bg-[#2b2b2b]'>
            <div className="avatar">
                <div className="w-[40px] rounded-full">
                        <img className='' src={user?.photoURL} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;