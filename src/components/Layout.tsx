import React, { type ReactNode } from 'react'

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from './Player';

interface LayoutPros {
    children: ReactNode
}

const Layout: React.FC<LayoutPros> = ({children}) => {
  return (
    <div className='h-screen'>
        <div className='h-[90%] flex'>
            <Sidebar />
            <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
                <Navbar />
                {children}
            </div>
        </div>
        <Player />
    </div>
  )
}

export default Layout