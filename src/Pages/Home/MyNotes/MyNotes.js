import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import NoteCard from './NoteCard';
import SortedNotes from './SortedNotes';

const MyNotes = ({filedData}) => {
    const {user, fieldValue} = useContext(AuthContext)
    const {filteredData, setFilteredData, searchField} = filedData;
    const getuid = JSON.parse(localStorage.getItem("userdata"));

    
    const {data: myNotes = [], refetch, isLoading} = useQuery({
        queryKey: ['myNotes'],
        queryFn: async () => {
            const res = await fetch(`https://mypaste.vercel.app/notes?email=${getuid.email}&uid=${getuid.uid}`);
            const data = await res.json()
            return data
        }
    })
    const {data: myNotesSorted = []} = useQuery({
        queryKey: ['myNotesSorted'],
        queryFn: async () => {
            const res = await fetch(`https://mypaste.vercel.app/sortednotes?email=${getuid.email}&uid=${getuid.uid}`);
            const data = await res.json()
            return data
        }
    })
    // setFilteredData(myNotes)
    refetch()

    useEffect(() => {
        const filtering = myNotes.filter(note => 
            note.title.toLowerCase().includes(searchField.toLowerCase()) ||  note.note.toLowerCase().includes(searchField.toLowerCase()) 
        )
        setFilteredData(filtering)
    }, [myNotes, searchField, setFilteredData])

    function callRefetch () {
        refetch()
    }

    if(isLoading){
        return <div className='flex items-center justify-center h-[80vh]'>
        <div>
          <h2 className='text-6xl font-semibold text-primary uppercase animate-pulse'>Loading...</h2>
          <p className='text-2xl text-secondary'>Wait for sometime</p>
        </div>
      </div>
    }

    
    
    return (
        <div className='mt-10'>
            <div className='md:block hidden'>
            {
                myNotesSorted.length > 0 && 
                <>
                    <p className='text-primary pb-1 text-sm  uppercase'>Highest copied notes...</p>
                    <div className='md:grid lg:grid-cols-4 grid-cols-3  gap-5 '>
                        {
                            myNotesSorted.slice(0,4).map(note => <SortedNotes key={note._id} notes={note} callRefetch={callRefetch}></SortedNotes>)
                        }
                    </div>
                </>
            }
            </div>
            {
                 myNotes.length  > 0 ?
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 mt-10`}>
                {
                    filteredData ?
                    <>
                    
                        {
                            filteredData.length > 0 ?
                            filteredData.map((mynote, i) => <NoteCard
                                key={mynote._id}
                                mynote={mynote}
                                index={i}
                                callRefetch={callRefetch}
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
                        refetch={refetch()}
                    ></NoteCard>
                    )
                }
            </div>
            :
            <div className="md:w-[600px] overflow-hidden h-[300px] rounded-lg bg-white p-5">
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