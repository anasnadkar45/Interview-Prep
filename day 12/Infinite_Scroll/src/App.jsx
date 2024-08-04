import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InfiniteScroll from './components/InfiniteScroll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <InfiniteScroll />
  )
}

export default App
