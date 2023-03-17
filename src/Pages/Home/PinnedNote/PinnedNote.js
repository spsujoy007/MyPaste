import React from 'react';
import SingleNote from './SingleNote';

const PinnedNote = () => {
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
        },
        {
            _id: 4,
            title: 'Top 5 Gifts for gf',
            note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. '
        }
    ]

    return (
        <div>
            <h6 className='text-neutral text-sm'>Pinned notes</h6>
            {
                myNotes.map(mynote => <SingleNote
                    key={mynote._id}
                    mynote={mynote}
                ></SingleNote>)
            }
        </div>
    );
};

export default PinnedNote;