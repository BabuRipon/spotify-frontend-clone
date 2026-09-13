import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import axios from 'axios';

const server = import.meta.env.VITE_SONG_SERVICE_URL;

export interface Song {
    id: string;
    title: string,
    description: string,
    thumbnail: string,
    audio: string,
    album_id: string
}

export interface Album {
    id: string;
    title: string,
    description: string,
    thumbnail: string
}

interface SongContextTypes {
    songs: Song[];
    loading: boolean;
    albums: Album[];
    song: Song | null;
    fetchSingleSong: ()=>Promise<void>;
    selectedSong: string|null;
    nextSong: ()=>void;
    prevSong: ()=>void;
    setSelectedSong: (id:string)=>void;
    setIsPlaying:(value:boolean)=>void;
    isPlaying: boolean;
    setIndex:(val:number)=>void;
    albumData: Album|null;
    albumSong: Song[];
    fetchAlbumSong: (id:string) => Promise<void>;
    fetchSongs:()=>Promise<void>;
    fetchAlbums: ()=>Promise<void>;

}

interface SongProviderProps {
    children: ReactNode;
}

const SongContext = createContext<SongContextTypes | undefined>(undefined);

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [song, setSong] = useState<Song|null>(null);
    const [selectedSong, setSelectedSong] = useState<string|null>(null);
    const [index, setIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [albumData, setAlbumData] = useState<Album | null>(null);
    const [albumSong, setAlbumSong] = useState<Song[]>([]);


    const fetchSongs = useCallback(async () => {
        setLoading(true);
        try{
            const { data } = await axios.get(`${server}/api/v1/songs/all`);
            console.log('fetchSong:',data.data);
            setSongs(data.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    },[]);

    const fetchAlbums = useCallback(async ()=>{
        setLoading(true);
        try{
            const {data} = await axios.get(`${server}/api/v1/albums/all`)
            setAlbums(data.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    },[])

    const fetchSingleSong = useCallback(async () => {
        if(!selectedSong){
            return;
        }
        try{
            const { data } = await axios.get(`${server}/api/v1/song/${selectedSong}`);
            setSong(data.data);
        }
        catch(error){
            console.log(error);
        }
    },[selectedSong]);

    const nextSong = useCallback(() => {
        if (index === songs.length - 1) {
        setIndex(0);
        setSelectedSong(songs[0]?.id.toString());
        } else {
        setIndex((prevIndex) => prevIndex + 1);
        setSelectedSong(songs[index + 1]?.id.toString());
        }
    }, [index, songs]);

    const prevSong = useCallback(() => {
        if (index > 0) {
        setIndex((prev) => prev - 1);
        setSelectedSong(songs[index - 1]?.id.toString());
        }
    }, [index, songs]);

    const fetchAlbumSong = useCallback(async (id: string) => {
        setLoading(true);
        try{
            const {data} = await axios.get<{message:string,data:{songs:Song[],album: Album}}>(`${server}/api/v1/album/${id}`);
            setAlbumData(data.data.album);
            setAlbumSong(data.data.songs);
        }
        catch(error:any){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    },[]);

    useEffect(()=>{
        fetchSongs();
        fetchAlbums();
    },[])

    return (
        <SongContext.Provider value={{
            songs,
            loading,
            albums,
            song,
            fetchSingleSong,
            selectedSong,
            nextSong,
            prevSong,
            setSelectedSong,
            setIsPlaying,
            isPlaying,
            setIndex,
            fetchAlbumSong,
            albumData,
            albumSong,
            fetchSongs,
            fetchAlbums
        }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongData = () => {
    const context = useContext(SongContext);
    if(!context){
        throw new Error("useSongData must be used within SongProvider.")
    }
    return context;
}