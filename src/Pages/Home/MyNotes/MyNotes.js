import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import NoteCard from './NoteCard';

const MyNotes = () => {
    const {user} = useContext(AuthContext)

    const {data: myNotes = [], refetch, isLoading} = useQuery({
        queryKey: ['myNotes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/notes?email=${user?.email}`);
            const data = await res.json()
            return data
        }
    })

    refetch()

    if(isLoading){
        return <h2>Loading...</h2>
    }
    

    return (
        <div className='mt-10'>
            {
                myNotes.length > 0 ?
            <div className={`grid lg:grid-cols-3 grid-cols-1 gap-3`}>
                {
                myNotes.map(mynote => <NoteCard
                    key={mynote._id}
                    mynote={mynote}
                    refetch={refetch}
                ></NoteCard>)
                }
            </div>
            :
            <div className="w-[600px] overflow-hidden h-[300px] rounded-lg bg-white p-5">
                <h2 className='text-2xl font-semibold text-secondary'>There are no notes here...</h2>
                <div className="flex justify-end mt-10 -ml-12">
                    <Link data-tip="Tap to add note" to='/addnote' className='cursor-pointer tooltip tooltip-top '>
                        <img  className='opacity-20 hover:opacity-100 duration-700' src="https://i.ibb.co/vwLccR3/Notepad.png" alt="" />
                    </Link>
                </div>
            </div>
            }
        </div>
    );
};

export default MyNotes;