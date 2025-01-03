import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Recruitment from './pages/Recruitment'

function App() {

  return (
    <Routes>
      <Route path="/recruitment" element={<Recruitment />} />
    </Routes>
  )
}

export default App
