import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import SingleNote from './SingleNote';
import { AuthContext } from '../../../Context/AuthProvider';
import { DataContext } from '../../../Context/DataProvider';

const PinnedNote = () => {
const {user} = useContext(AuthContext)
    const {callRefetch} = useContext(DataContext)
    const userdata = JSON.parse(localStorage.getItem('userdata'))

    const {data: pinednotes = [], refetch, isLoading} = useQuery({
        queryKey: ["pinednotes"],
        queryFn: async () =>{
            const res = await fetch(`https://mypaste.vercel.app/pinnotes?email=${userdata?.email}`);
            const data = await res.json()
            return data
        }
    })
    refetch()

    if(callRefetch){
        refetch()
    }

    return (
        <div>
            {
                pinednotes.length > 0 && <h6 className='text-neutral text-sm'>Pinned notes</h6>
            }
            {
                pinednotes.length > 0 ?
                <>
                {
                    pinednotes.map(mynote => <SingleNote
                        key={mynote._id}
                        mynote={mynote}
                    ></SingleNote>)
                }
                </>
                :
                <>
                    <div>
                        {/* <img src="https://i.ibb.co/mRLgz9L/logoMP.png" alt="" /> */}
                    </div>
                </>
            }
        </div>
    );
};

export default PinnedNote;