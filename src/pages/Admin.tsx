import React, { useEffect, useState } from 'react'
import { useUserData } from '../context/UserContext';
import { useSongData, type Album, type Song } from '../context/SongContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const server = import.meta.env.VITE_ADMIN_SERVICE_URL;

const Admin = () => {
    const { songs, albums, fetchSongs, fetchAlbums} = useSongData();
    const { user } = useUserData();
    const navigate = useNavigate();

    const [albumTitle, setAlbumTitle] = useState<string>("");
    const [albumDescription, setAlbumDescription] = useState<string>("");
    const [albumFile, setAlbumFile] = useState<File|null> (null);
    const [albumBtnLoading, setAlbumBtnLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [album, setAlbum] = useState<string>("");
    const [file,setFile] = useState<File | null>(null);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);
    const [thumbnailBtnLoading, setThumbnailBtnLoading] = useState<boolean>(false);
    
    const albumFileChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setAlbumFile(selectedFile);
    }

    const addAlbumHandler = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!albumFile)return;

        const formData = new FormData();
        formData.append('title',albumTitle);
        formData.append('description',albumDescription);
        formData.append('file',albumFile);

        setAlbumBtnLoading(true);
        try{
            const {data} = await axios.post(
                `${server}/api/v1/album/new`,
                formData,
                {
                    headers:{
                        token: localStorage.getItem('token')
                    }
                }
            )

            toast.success(data.message);
            fetchAlbums();
            setAlbumBtnLoading(false);
            setAlbumTitle("");
            setAlbumDescription("");
            setAlbumFile(null);
        }
        catch(error: any){
            setAlbumBtnLoading(false);
            toast.error(error.response?.data?.message||'An Error Occured.')
        }
    }

    const fileChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    }

    const addSongHandler = async (e:React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!file)return;
       
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", file);
        formData.append("album_id", album);

        setBtnLoading(true);
        try{
            const { data } = await axios.post(`${server}/api/v1/song/new`, formData, {
                headers: {
                token: localStorage.getItem("token"),
                },
            });

            toast.success(data.message);
            fetchSongs();
            setBtnLoading(false);
            setTitle("");
            setDescription("");
            setFile(null);
            setAlbum("");
        }
        catch(error:any){
            toast.error(error.response?.data?.message || 'An Error Occured.');
            setBtnLoading(false);
        }
    }

    const deleteAlbum = async (id: string) => {
        if(confirm('Are you sure you want to delete this album')){
            setDeleteBtnLoading(true);
             try {
                const { data } = await axios.delete(`${server}/api/v1/album/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
                });

                toast.success(data.message);
                fetchSongs();
                fetchAlbums();
                setDeleteBtnLoading(false);
            } catch (error: any) {
                toast.error(error.response?.data?.message || "An error occured");
                setDeleteBtnLoading(false);
            }
        }
    }

    const deleteSong = async (id: string) => {
        if (confirm("Are you sure you want to delete this song?")) {
            setDeleteBtnLoading(true);
            try {
                const { data } = await axios.delete(`${server}/api/v1/song/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
                });

                toast.success(data.message);
                fetchSongs();
                setDeleteBtnLoading(false);
            } catch (error: any) {
                toast.error(error.response?.data?.message || "An error occured");
                setDeleteBtnLoading(false);
            }
        }
    };

    const addThumbnailHandler = async (id: string) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setThumbnailBtnLoading(true);

        try {
        const { data } = await axios.post(
            `${server}/api/v1/song/${id}`,
            formData,
            {
            headers: {
                token: localStorage.getItem("token"),
            },
            }
        );

        toast.success(data.message);
        fetchSongs();
        setThumbnailBtnLoading(false);
        setFile(null);
        } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occured");
        setThumbnailBtnLoading(false);
        }
    };


    useEffect(()=>{
        if(user && user?.role !== 'admin'){
            console.log('user:',user);
            navigate('/login');
        }
    },[user, navigate])

  return (
    <div className='min-h-screen bg-[#212121] text-white p-8'>
        <Link
         className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
         to="/"
        >Go to homepage</Link>
        <h2 className='text-2xl font-bold my-6'>Add Album</h2>
        <form
            className=' bg-[#181818] rounded-lg shadow-lg p-6 flex flex-col gap-4 items-center justify-center'
            onSubmit={addAlbumHandler}
        >
            <input
                type='text'
                placeholder='title'
                className='auth-input'
                value={albumTitle}
                onChange={(e)=>setAlbumTitle(e.target.value)}
                required
            />
            <input
                type='text'
                placeholder='description'
                className='auth-input'
                value={albumDescription}
                onChange={(e)=>setAlbumDescription(e.target.value)}
                required
            />
            <input
                type='file'
                placeholder='Choose Thumbnail'
                className='auth-input'
                accept='image/*'
                required
                onChange={albumFileChangeHandler}
            />
            <button
                className='auth-btn'
                style={{width: '100px'}}
                disabled={albumBtnLoading}
            >
                {albumBtnLoading ? 'please wait...':'Add'}
            </button>
        </form>

        <h2 className='text-2xl font-bold my-6'>Add Songs</h2>
        <form
            className=' bg-[#181818] rounded-lg shadow-lg p-6 flex flex-col gap-4 items-center justify-center'
            onSubmit={addSongHandler}
        >
            <input
                type='text'
                placeholder='title'
                className='auth-input'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
            />
            <input
                type='text'
                placeholder='description'
                className='auth-input'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required
            />
            <select
                className='auth-input'
                value={album}
                required
                onChange={(e)=>setAlbum(e.target.value)}
            >
                <option value={""}>Choose Album</option>
                {
                    albums.map((el:Album, index:number)=>{
                        return (
                            <option value={el.id} key={index}>{el.title}</option>
                        )
                    })
                }
            </select>
            <input
                type='file'
                placeholder='Choose Audio'
                className='auth-input'
                accept='audio/*'
                required
                onChange={fileChangeHandler}
            />
            <button
                className='auth-btn'
                style={{width: '100px'}}
                disabled={btnLoading}
            >
                {btnLoading ? 'please wait...':'Add'}
            </button>
        </form>
        
        <div className='mt-8'>
            <h3 className='text-xl font-semibold mb-4'>Added Albums</h3>
            <div className='flex justify-center items-center gap-2 md:justify-start flex-wrap'>
                {
                    albums?.map((el:Album, i:number)=>{
                        return(
                            <div className='bg-[#181818] p-4 rounded-lg shadow-lg' key={i}>
                                <img
                                    src={el.thumbnail}
                                    alt=""
                                    className='w-52 h-52 mr-1'
                                />
                                <h4 className='text-lg font-bold'>{el.title.slice(0,30)}...</h4>
                                <h4 className='text-lg font-semibold'>{el.description.slice(0,20)}...</h4>
                                <button
                                    disabled={deleteBtnLoading}
                                    className='px-3 py-1 bg-red-500 text-white rounded'
                                    onClick={() => deleteAlbum(el.id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {songs?.map((e: Song, i:number) => {
            return (
              <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
                {e.thumbnail ? (
                  <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="" />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2 w-[250px]">
                    <input className="auth-input" type="file" onChange={fileChangeHandler} />
                    <button
                      className="auth-btn"
                      style={{ width: "200px" }}
                      disabled={thumbnailBtnLoading}
                      onClick={() => addThumbnailHandler(e.id)}
                    >
                      {thumbnailBtnLoading ? "Please Wait..." : "Add Thumbnail"}
                    </button>
                  </div>
                )}

                <h4 className="text-lg font-bold">{e.title.slice(0, 30)}</h4>
                <h4 className="text-lg font-bold">
                  {e.description.slice(0, 20)}..
                </h4>
                <button
                  disabled={deleteBtnLoading}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteSong(e.id)}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Admin;
