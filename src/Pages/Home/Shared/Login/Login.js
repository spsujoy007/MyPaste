import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../../../Context/AuthProvider';
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../'

const Login = () => {
    const {login, user, googleSign} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null)



    //// I have to work on this error handling - most important notice ---------------;

    const navigate = useNavigate()

    if(user){
        navigate('/')
        // toast.error('You already logged in')
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
        .then(result => {
            const user = result?.user;
            if(user?.email){
                toast.success(`Welcome ${user.displayName}`)
                handleAddNote(user?.email)
                localStorage.setItem("user_id", user.uid);
                navigate('/');
            }
        })
        .catch(e => {
            if(e.message){
                if(e.message === "Firebase: Error (auth/user-not-found).")
                {
                    setError("Maybe your email or password is incorrect. Try again!")
                }
            }
        })}

        const handleGoogleSign = () => {
            googleSign()
            .then(result => {
                const user = result?.user
                if(result){
                    handleAddNote(user?.email)
                    toast.success(`Welcome ${user?.displayName}`)
                    localStorage.setItem("user_id", user.uid);
                    navigate('/')
                }
            })
        }

        function handleAddNote (userEmail){

            const notebody = {
                title: "🦄 Search themes",
                note: `
    You can change the theme of the website. 💖
    
    #️⃣ The process is when you type on the search bar using these commands: 
    1. cl_bluedream
    2. cl_blackberry
    3. cl_redbull
    4. cl_teal
    
                    If you want to back to the default theme just type "default"
    
                    Hope you enjoy it! Thank you so much for using "MyPaste"
                `,
                email: userEmail,
                copied_count: 0
            }
            const url = `https://mypaste.vercel.app/addnote`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(notebody)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        }


    return (
        <div className="md:p-20 p-5">
            {
                !user &&
                <div className="px-10 py-10 bg-white rounded-3xl">
                <div className="border-b-2 border-accent pb-2">
                    <img alt='' src='../../'/>
                    
                    <h2 className='text-3xl font-bold uppercase text-primary  text-left '>Login</h2>
                    
                </div>
                <div className="flex md:flex-row flex-col gap-10">
                <form onSubmit={handleSignIn} className="mt-6 flex flex-col md:w-[50%]">

                    <input name='email' required type="email" placeholder='type your email' className='py-3 px-2 border-b-[1px] border-primary outline-none text-lg text-primary mt-5'/>

                    <input name='password' required type="password" placeholder='type your password' className='py-3 px-2  border-b-[1px] border-primary outline-none text-lg text-primary mt-5'/>

                    {error && <h2 className='text-red-500'>{error}</h2>}
                    <button type='submit' className='uppercase mt-6 rounded-full hover:bg-neutral duration-150 py-3 px-5 bg-primary text-white'>
                        Login
                    </button>
                    
                    <h3 className='mt-3 ml-1 text-primary'>Are you new in MyPaste? Please <Link className='text-neutral underline font-bold' to='/signup'>Sign up</Link></h3>
                    
                </form>

                <div className='md:mt-0 mt-6 flex items-center justify-center md:w-[50%]'>
                    {/* <h2 className='text-primary text-lg'>Social Signup</h2> */}
                    <button onClick={() => handleGoogleSign()} className='py-2 px-5 flex gap-2 text-md items-center border-[1px] rounded-full duration-150 border-gray-700 text-gray-700 hover:px-8'><FcGoogle className='text-xl'></FcGoogle> Continue with google</button>
                </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Login;