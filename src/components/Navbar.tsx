import { useNavigate } from "react-router-dom"
import { useUserData } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, logoutUser } = useUserData();
  return (
    <>
      <div className="flex items-center justify-between font-semibold">
        <div className="flex items-center gap-2">
          <img
            src="/left_arrow.png"
            alt="left_arrow.png"
            className="w-8 p-2 bg-black rounded-2xl cursor-pointer"
            onClick={()=>navigate(-1)}
          />
          <img
            src="/right_arrow.png"
            alt="right_arrow.png"
            className="w-8 p-2 bg-black rounded-2xl cursor-pointer"
            onClick={()=>navigate(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="px-4 py-1 bg-white text-black text-[15px] cursor-pointer rounded-full hidden md:block">Explore Premium</p>
          <p className="px-4 py-1 bg-white text-black text-[15px] cursor-pointer rounded-full hidden md:block">Install App</p>
          {
            isAuth?
            <p
              className="px-4 py-1 bg-white text-black text-[15px] cursor-pointer rounded-full"
              onClick={()=>logoutUser()}
            >Logout</p>
            :
            <p
              className="px-4 py-1 bg-white text-black text-[15px] cursor-pointer rounded-full"
              onClick={()=>navigate('/login')}
            >Login</p>
          }
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
          <p className="px-4 py-1 bg-white text-black cursor-pointer rounded-full">All</p>
          <p className="px-4 py-1 bg-white text-black cursor-pointer rounded-full hidden md:block">Music</p>
          <p className="px-4 py-1 bg-white text-black cursor-pointer rounded-full hidden md:block">Podcast</p>
          <p className="px-4 py-1 bg-white text-black cursor-pointer rounded-full md:hidden"
            onClick={()=>navigate('/playlist')}
          >
            Playlist
          </p>
      </div>
    </>
  )
}

export default Navbar