import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleNote from './SingleNote';

const PinnedNote = () => {

    const {data: pinednotes = [], refetch, isLoading} = useQuery({
        queryKey: ["pinednotes"],
        queryFn: async () =>{
            const res = await fetch('http://localhost:5000/pinnotes');
            const data = await res.json()
            return data
        }
    })

    return (
        <div>
            <h6 className='text-neutral text-sm'>Pinned notes</h6>
            {
                pinednotes.map(mynote => <SingleNote
                    key={mynote._id}
                    mynote={mynote}
                ></SingleNote>)
            }
        </div>
    );
};

export default PinnedNote;