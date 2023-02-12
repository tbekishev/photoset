import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams(null);
  const [pins, setPins] = useState();
  const [changed, setChanged] =useState(true);

  useEffect(() => {

    setLoading(true);
    if(categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          // console.log(data);
          setPins(data);
          setLoading(false);
          setChanged(false);
        })
    } else {
      setLoading(true);
      client.fetch(feedQuery)
        .then((data) => {
          // console.log(data);
          setPins(data);
          setLoading(false);
          setChanged(false);
        })
    }
  }, [categoryId, changed])

  if (loading) return <Spinner message='We are adding new ideas to your feed!' />
  if(!pins?.length) return <h2>No pins available</h2>
  return (
    <div>
      {pins && <MasonryLayout pins={pins} setChanged={setChanged}/> }
    </div>
  )
}

export default Feed
