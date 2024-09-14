import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Profile = () => {
    const {user} = useContext(UserContext);
  return (
    <div>
        <h1>Profile</h1>
        {user ? (
            <p>{user.username}</p>
        ):(
            <p>Please Login</p>
        )}
    </div>
  )
}

export default Profile