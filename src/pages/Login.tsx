import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loginUser, btnLoading } = useUserData();

  const submitHandler = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(email, password, navigate);
  }

  return (
    <div className="flex items-center justify-center h-screen max-h-screen overflow-y-auto">
      <div className='bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-3xl text-center font-semibold mb-8'>Login To Spotify</h2>
        <form className='mt-8' onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block font-medium text-sm mb-1'>Email or Username</label>
            <input
              type='email'
              placeholder='email or username'
              required
              className='auth-input'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium text-sm mb-1'>Password</label>
            <input
              type='password'
              placeholder='password'
              required
              className='auth-input'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button className='auth-btn' disabled={btnLoading}>{btnLoading ? "Please wait...":"Login"}</button>
        </form>
        <div className="text-center mt-6">
          <Link
            to={"/register"}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Don't have an Account?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login