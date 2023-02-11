import { googleLogout } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../client';
import { userQuery } from '../utils/data';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology';
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = userQuery(userId);

    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
      });

  }, [userId]);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    googleLogout();
  };

  if(!user) return <Spinner message='Loading profile...' />
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-colpb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner-img'
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user.image}
              alt='user-img'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              
                    <button
                      type='button'
                      className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                      onClick={logout}
                    >
                      <AiOutlineLogout
                        color='red'
                        fontSize={21}
                      />
                    </button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default UserProfile
