import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CommentBox from './components/CommentBox'
import CommentDisplay from './components/CommentDisplay'

function App() {
  const [comments, setComments] = useState([]);
  return (
    <>
      <CommentBox comments={comments} setComments={setComments}/>
      <CommentDisplay comments={comments}/>
    </>
  )
}

export default App
