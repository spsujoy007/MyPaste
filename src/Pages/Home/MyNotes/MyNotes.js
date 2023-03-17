import { useQuery } from '@tanstack/react-query';
import NoteCard from './NoteCard';

const MyNotes = () => {

    const {data: myNotes = [], refetch, isLoading} = useQuery({
        queryKey: ['myNotes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/notes`);
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
            <div className={`grid lg:grid-cols-3 grid-cols-1 gap-3`}>
            {
                myNotes.map(mynote => <NoteCard
                    key={mynote._id}
                    mynote={mynote}
                    refetch={refetch}
                ></NoteCard>)
            }
            </div>
        </div>
    );
};

export default MyNotes;