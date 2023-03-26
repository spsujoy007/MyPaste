import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../../../Context/AuthProvider';
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const {login, updateUserData} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [headName, setHeadName] = useState('');
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
        .then(result => {
            const user = result.user;
            if(user.uid){
                toast.success(`Welcome ${user.displayName}`)
                navigate('/')
            }
        })
        .catch(e => {
            console.error(e)
            setError(e.message)
        })}


    return (
        <div className="md:p-20 p-5">
            <div className="px-5 py-10 bg-white rounded-xl">
                <div className="flex justify-between items-center border-b-2 border-accent pb-2">
                    <h2 className='text-3xl font-bold uppercase text-primary  text-left '>Login</h2>
                    {
                        headName && headName.length >= 4 && <h5>Hey! "{headName}" 😜</h5>
                    }
                </div>
                <div className="flex md:flex-row flex-col gap-10">
                <form onSubmit={handleSignUp} className="mt-6 flex flex-col md:w-[50%]">

                    <input name='email' required type="email" placeholder='type your email' className='py-3 bg-accent px-2 border-b-2 border-primary outline-none text-lg text-primary mt-5'/>

                    <input name='password' required type="password" placeholder='create a password' className='py-3 bg-accent px-2  border-b-2 border-primary outline-none text-lg text-primary mt-5'/>

                    {error && <h2 className='text-red-500'>{error}</h2>}
                    <button type='submit' className='uppercase mt-6 rounded-full hover:bg-neutral duration-150 py-3 px-5 bg-primary text-white'>
                        Login
                    </button>
                    
                    <h3 className='mt-2 text-primary'>Do you already have an account. Please <Link className='text-neutral font-bold' to='/signup'>Sign up</Link></h3>
                </form>

                <div className='mt-6 flex items-center justify-center md:w-[50%]'>
                    {/* <h2 className='text-primary text-lg'>Social Signup</h2> */}
                    <button className='py-2 px-5 flex gap-2 text-md items-center border-[1px] rounded-full duration-150 border-gray-700 text-gray-700 hover:px-8'><FcGoogle className='text-xl'></FcGoogle> Continue with google</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;