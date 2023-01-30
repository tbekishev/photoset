import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { userQuery } from '../utils/data';
import { client } from '../client';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = localStorage. getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo?.aud);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28' />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt='logo' className='w-28' />
        </Link>
      </div>
      {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  )
}

export default Home
