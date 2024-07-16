import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProgressBar from './components/ProgressBar';

function App() {
  const [progressValue, setProgressValue] = useState(50);

  useEffect(()=>{
    setInterval(()=>{
      setProgressValue((val) => val+ 1);
    },100);
  },[])

  return (
    <>
      <ProgressBar value={progressValue}/>
    </>
  )
}

export default App
