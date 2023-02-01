import React, { useState } from 'react'
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(true);

  if (loading) return <Spinner message='We are adding new ideas to your feed!' />
  return (
    <div>
      
    </div>
  )
}

export default Feed
