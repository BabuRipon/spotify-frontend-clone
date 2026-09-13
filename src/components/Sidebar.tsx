import { useNavigate } from "react-router-dom"
import PlayListcard from "./PlayListcard"
import { useUserData } from "../context/UserContext";

const Sidebar = () => {
    const navigate = useNavigate();
    const {user} = useUserData();
  return (
    <div className="h-full w-[25%] p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around py-2">
            <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={()=>navigate('/')}
            >
                <img src="/home.png" alt="home.png" className="w-6" />
                <p className="font-bold">Home</p>
            </div>
            <div className="flex items-center gap-3 pl-8 cursor-pointer">
                <img src="/search.png" alt="search.png" className="w-6" />
                <p className="font-bold">Search</p>
            </div>
        </div>
        <div className="bg-[#121212] h-[85%] rounded">
            <div className="flex justify-between p-4">
                <div className="flex gap-3 items-center">
                    <img src="/stack.png" alt="stach.png" className="w-6" />
                    <p className="font-bold">Liabrary</p>
                </div>
                <div className="flex items-center gap-2">
                    <img src="/arrow.png" alt="arrow.png" className="w-6"/>
                    <img src="/plus.png" alt="plus.png" className="w-6"/>
                </div>
            </div>
            <div>
                <PlayListcard />
            </div>
            <div className="p-4 m-2 flex flex-col rounded font-semibold items-start gap-1 mt-4">
                <h1>Let's find some podcasts to follow</h1>
                <p className="font-light">we'll keep you update on new episodes</p>
                <button className="px-4 py-1.5 bg-white text-black rounded-full text-[15px] mt-4">
                    Browse Padcasts
                </button>
                {
                    user && user?.role==='admin' && (
                        <button
                            className="px-4 py-1.5 bg-white text-black rounded-full text-[15px] mt-4"
                            onClick={()=>navigate('/admin/dashboard')}    
                        >
                            Admin Dashboard
                        </button>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar