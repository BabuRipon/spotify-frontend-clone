import { useEffect, useState } from 'react'
import {useSongData, type Song } from '../context/SongContext';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { useUserData } from '../context/UserContext';
import { FaBookmark, FaPlay } from 'react-icons/fa';

const Playlist = () => {
    const { songs, loading, setSelectedSong, setIsPlaying } = useSongData();
    const { user, addToPlaylists } = useUserData();
    const [myPlaylists, setMyPlaylists] = useState<Song[]>([]);

    useEffect(()=>{
        console.log(user?.playlists);
        if(songs && user?.playlists){
            const filteredSongs = songs.filter((song)=>{
                return user?.playlists?.includes(song.id.toString());
            })
            setMyPlaylists(filteredSongs);
        }
    },[songs, user])

  return (
    <div>
        <Layout>
            {
                myPlaylists && 
                <>
                    {
                        loading ?
                        <Loading /> :
                        <>
                            <div className='mt-10 flex flex-col gap-8 md:flex-row md:items-center'>
                                <img src={'/song_thumbnail.jpeg'} alt="" className='w-48 rounded'/>
                                <div className='flex flex-col'>
                                    <p>Playlist</p>
                                    <h2 className='text-3xl font-bold mb-4 md:text-5xl'>{user?.name} playlist</h2>
                                    <h4>Your favourite songs</h4>
                                    <p className='mt-1'>
                                        <img src={'/logo.png'} alt="" className='w-6 inline-block'/>
                                    </p>
                                </div>
                            </div>

                            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                                <p className='font-bold'>#</p>
                                <p className='hidden sm:block'>Description</p>
                                <p className='text-center'>Actions</p>
                            </div>
                            <hr />
                            {
                                myPlaylists && 
                                myPlaylists.map((song, index)=>{
                                    return (
                                        <div
                                            className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer'
                                            key={index}
                                        >
                                            <p className='text-white'>
                                                <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                                                <img src={song.thumbnail ? song.thumbnail : '/song_thumbnail.jpeg'} alt="" className='w-10 inline mr-5' />
                                                {" "}
                                                {song.title}
                                            </p>
                                            <p className='text-[15px] hidden sm:block'>
                                                {song.description.slice(0,30)}...
                                            </p>
                                            <p className='flex items-center justify-center gap-5'>
                                                <button
                                                    className='text-[15px] text-center'
                                                    onClick={()=>addToPlaylists(song.id)}
                                                >
                                                    <FaBookmark />
                                                </button>
                                                <button
                                                    className='text-[15px] text-center'
                                                    onClick={()=>{
                                                        setSelectedSong(song.id);
                                                        setIsPlaying(true);
                                                    }}
                                                >
                                                    <FaPlay />
                                                </button>
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                </>
            }
        </Layout>
    </div>
  )
}

export default Playlist