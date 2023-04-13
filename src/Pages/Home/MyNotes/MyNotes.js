import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import NoteCard from './NoteCard';

const MyNotes = ({filedData}) => {
    const {filteredData, setFilteredData, searchField} = filedData;
    

    const {user} = useContext(AuthContext)

    const {data: myNotes = [], refetch, isLoading} = useQuery({
        queryKey: ['myNotes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/notes?email=${user?.email}`);
            const data = await res.json()
            return data
        }
    })
    // setFilteredData(myNotes)

    useEffect(() => {
        const filtering = myNotes.filter(note => 
            note.title.toLowerCase().includes(searchField.toLowerCase()) ||  note.note.toLowerCase().includes(searchField.toLowerCase()) 
        )
        setFilteredData(filtering)
    }, [myNotes, searchField, setFilteredData])

    refetch()

    if(isLoading){
        return <h2>Loading...</h2>
    }
    

    return (
        <div className='mt-10'>
            {
                 myNotes.length  > 0 ?
            <div className={`grid lg:grid-cols-3 grid-cols-1 gap-3`}>
                {
                    filteredData ?
                    <>
                        {
                            filteredData.length > 0 ?
                            filteredData.map(mynote => <NoteCard
                                key={mynote._id}
                                mynote={mynote}
                                refetch={refetch}
                            ></NoteCard>
                            )
                            :
                            <div className="md:w-[600px] overflow-hidden h-[300px] rounded-lg bg-none p-5">
                <h2 className='text-2xl font-semibold text-secondary'>No notes found with <span className='text-3xl text-neutral font-bold'>"{searchField}"</span></h2>
                <p className='mt-1 text-neutral'>Please search correctly!</p>
            </div>
                        }
                    </>
                    :
                    myNotes.map(mynote => <NoteCard
                        key={mynote._id}
                        mynote={mynote}
                        refetch={refetch}
                    ></NoteCard>
                    )
                }
            </div>
            :
            <div className="w-[600px] overflow-hidden h-[300px] rounded-lg bg-white p-5">
                <h2 className='text-2xl font-semibold text-secondary'>There are no notes here...</h2>
                <div className="flex justify-end mt-9 -ml-12">
                    <Link data-tip="Tap to add note" to='/addnote' className='cursor-pointer tooltip tooltip-top '>
                        <img  className='opacity-20 hover:opacity-100 w-[270px] duration-700' src="https://i.ibb.co/mRLgz9L/logoMP.png" alt="" />
                        {/* https://i.ibb.co/vwLccR3/Notepad.png */}
                    </Link>
                </div>
            </div>
            }
        </div>
    );
};

export default MyNotes;