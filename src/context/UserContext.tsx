import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

const server = import.meta.env.VITE_USER_SERVICE_URL;

interface User {
    _id:string;
    name:string;
    email:string;
    role:string;
    playlists:string[]
}

interface registerLoginResponseType {
    message: string;
    user: User;
    token: string;
}

interface UserContextType {
    user: User | null;
    registerUser: (
        name:string,
        email:string,
        password:string,
        navigate:(path:string)=>void
    )=>Promise<void>;
    loginUser: (
        email:string,
        password:string,
        navigate:(path:string)=>void
    )=>Promise<void>;
    logoutUser: () => void;
    btnLoading: boolean;
    isAuth: boolean;
    loading: boolean;
    addToPlaylists: (id:string)=>Promise<void>
}

const UserContext = createContext<UserContextType|null>(null);

interface UserProviderProps {
    children: React.ReactNode
}
export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User|null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const registerUser = async (name:string,email:string,password:string,navigate:(path:string)=>void) => {
        setBtnLoading(true);
        try {
            const {data} = await axios.post<registerLoginResponseType>(`${server}/api/v1/user/register`,{
                name,
                email,
                password
            });
            setUser(data.user);
            setIsAuth(true);
            localStorage.setItem('token',data.token);
            toast.success(data.message);
            navigate('/');
        } catch (error:any) {
            console.log('err');
            toast.error(error?.response?.data?.message || 'An Error Occured.');
        }
        finally{
            setBtnLoading(false);
        }
    };

    const loginUser = async (email:string, password:string, navigate: (path:string)=>void) =>{
        setBtnLoading(true)
        try{
            const { data } = await axios.post<registerLoginResponseType>(`${server}/api/v1/user/login`,{
                email,
                password
            });

            toast.success(data.message);
            localStorage.setItem('token',data.token);
            setUser(data.user);
            setBtnLoading(false);
            setIsAuth(true);
            navigate('/');
        }
        catch(error: any){
            console.log(error);
            toast.error(error?.response?.data?.message || 'An Error Occured.');
        }
        finally{
            setBtnLoading(false);
        }
    };

    const logoutUser = async () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuth(false);
        toast.success('user logged out.')
    };

    const fetchUser = async () => {
        try{
            const {data} = await axios.get(`${server}/api/v1/user/me`,{
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            setUser(data);
            setIsAuth(true);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    };

    const addToPlaylists = async (id: string) => {
        try{
            const { data } = await axios.post(`${server}/api/v1/song/${id}`,{},{
                headers:{
                    token: localStorage.getItem('token')
                }
            })

            toast.success(data.message);
            fetchUser();
        }
        catch(error: any){
            toast.error(error?.response?.data?.message || 'An Error Occured.')
        }
    };

    useEffect(()=>{
        fetchUser();
    },[])
    
    return (
        <UserContext.Provider value={{user,registerUser, loginUser, logoutUser, isAuth, btnLoading, loading, addToPlaylists}}>
            {children}
            <Toaster />
        </UserContext.Provider>
    )
}

export const useUserData = ()=>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUserData must be use inside UserProvider')
    }   
    return context;
}
