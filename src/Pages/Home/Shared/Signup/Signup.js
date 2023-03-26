import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../../../Context/AuthProvider';
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const {user} = useState(AuthContext)
    const {createUser, updateUserData} = useContext(AuthContext);
    const [currentImg, setCurrentImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [headName, setHeadName] = useState('');
    const navigate = useNavigate()

    if(user?.uid){
        return setTimeout(() => {
            navigate('/login')
        }, 3000)
    }
    
    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const imgbbsecret = "876f7bf0abd5da8479ed8a9da69a1c78";
        const formData = new FormData();
        formData.append('image', profileImg);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbsecret}`;
        fetch(url, {
        method: 'POST',
        body: formData
        })
        .then(res => res.json())
        .then(pictureData => {
            if(pictureData.success){
                const pictureURL = pictureData.data.url;
                createUser(email, password)
                .then(result => {
                    const user = result.user;
                    if(user.uid){
                        updateProfile(name, pictureURL)
                        toast.success(`Welcome ${user.displayName}`)
                        navigate('/')
                    }
                })
            }
        })

        }

    const updateProfile = (name, picture) => {
        const profile = {
            displayName: name,
            photoURL: picture
        }
        updateUserData(profile)
        .then(() => {})
        .catch(e => console.error(e))
    }
    
    const handleViewPhoto = (e) => {
        const imgdata = e.target.files[0]
        if(imgdata){
            const img = URL.createObjectURL(imgdata)
            setCurrentImg(img)
            setProfileImg(imgdata)
        }
    }


    return (
        <div className="md:p-20 p-5">
            <div className="px-5 py-10 bg-white rounded-xl">
                <div className="flex justify-between items-center border-b-2 border-accent pb-2">
                    <h2 className='text-3xl font-bold uppercase text-primary  text-left '>Sign up</h2>
                    {
                        headName && headName.length >= 4 && <h5>Hey! "{headName}" 😜</h5>
                    }
                </div>
                <div className="flex md:flex-row flex-col gap-10">
                <form onSubmit={handleSignUp} className="mt-6 flex flex-col md:w-[50%]">
                    
                    <label htmlFor="pic">
                        <div className="flex items-center gap-5">
                            <div data-tip={currentImg ? "Change image" : "Upload Photo"} className="w-[100px] h-[100px] tooltip tooltip-top border-4 border-secondary flex items-center justify-center bg-primary rounded-full cursor-pointer">
                                {
                                    currentImg ? 
                                    <img className='rounded-full h-full w-full hover:brightness-50' src={currentImg} alt="" />
                                    :
                                    <AiOutlinePlus className='text-white font-bold text-4xl'></AiOutlinePlus>
                                }
                            </div>
                            <h1 className='text-xl text-primary'>Select Photo</h1>
                        </div>
                        <input onChange={handleViewPhoto} accept="image/jpeg, image/png"  className='hidden' id='pic' type="file" />
                    </label>

                    <input onChange={(e) => setHeadName(e.target.value)} name='name' required type="text" placeholder='type your name...' className='py-3 bg-accent px-2 rounded-t-xl border-b-2 border-primary outline-none text-lg text-primary mt-5'/>

                    <input name='email' required type="email" placeholder='type your email' className='py-3 bg-accent px-2 border-b-2 border-primary outline-none text-lg text-primary mt-5'/>

                    <input name='password' required type="password" placeholder='create a password' className='py-3 bg-accent px-2  border-b-2 border-primary outline-none text-lg text-primary mt-5'/>

                    <button type='submit' className='mt-6 rounded-full hover:bg-neutral duration-150 py-3 px-5 bg-primary text-white'>
                        Sign up
                    </button>
                    <h3 className='mt-2 text-primary'>Do you have a account. Please <Link className='text-neutral font-bold' to='/login'>Login</Link></h3>
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

export default Signup;