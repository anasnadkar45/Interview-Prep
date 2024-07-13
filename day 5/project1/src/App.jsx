import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostCard from './components/PostCard';


async function fetchUserData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const data = await fetch(url);
    const response = await data.json();
    return response;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      const initialData = await fetchUserData();
      setUsers(initialData);
      console.log(initialData);
    }
    getData();
  }, [])

  return (
    <>
      <div className='container'>
        {users.map(user => (
          <PostCard key={user.id} title={user.title} body={user.body}/>
        ))}
      </div>
    </>
  )
}

export default App
