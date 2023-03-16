import React from 'react';
import NoteCard from './NoteCard';

const MyNotes = () => {

    const myNotes = [
        {
            _id: 1,
            title: 'My resume',
            note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit tempore repellat aut. Dolor aut reiciendis commodi doloremque nisi quas nemo! Autem pariatur fugiat odio repellendus sint molestias, quisquam officiis labore.'
        },
        {
            _id: 2,
            title: 'The CV',
            note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit tempore repellat aut. Dolor aut reiciendis commodi doloremque nisi quas nemo! Autem pariatur fugiat odio repellendus sint molestias, quisquam officiis labore.'
        },
        {
            _id: 3,
            title: 'Top 3 interview question',
            note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. '
        }
    ]

    return (
        <div className='mt-10'>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-3'>
            {
                myNotes.map(mynote => <NoteCard
                    key={mynote._id}
                    mynote={mynote}
                ></NoteCard>)
            }
            </div>
        </div>
    );
};

export default MyNotes;