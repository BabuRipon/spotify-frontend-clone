import React from 'react'
import { FaBookmark, FaPlay } from 'react-icons/fa';
import { useSongData } from '../context/SongContext';
import { useUserData } from '../context/UserContext';

interface SongCardProps {
    name: string;
    desc: string,
    image: string;
    id: string;
}
const SongCard:React.FC<SongCardProps> = ({name, image, desc, id}) => {
    const { setSelectedSong, setIsPlaying } = useSongData();
    const { addToPlaylists, isAuth } = useUserData()
    
    return (
    <div className='min-w-40 p-2 px-3 rounded cursor-pointer hover:[#ffffff26]'>
        <div className='relative group'>
            <img
                src={image?image:'/song_thumbnail.jpeg'}
                alt={name}
                className='w-40 rounded mr-1'
            />
            <div className='flex gap2'>
                <button className='absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    onClick={()=>{
                        setSelectedSong(id);
                        setIsPlaying(true);
                    }}
                >
                    <FaPlay />
                </button>
                {
                    isAuth && (
                        <button
                            className={`absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                            onClick={()=>addToPlaylists(id)}
                        >
                            <FaBookmark />
                        </button>
                    )
                }
            </div>
        </div>
        <p className='text-semibold mt-2 mb-1'>{name}</p>
        <p className='text-sm text-slate-200'>{desc.slice(0,20)}...</p>
    </div>
  )
}

export default SongCard