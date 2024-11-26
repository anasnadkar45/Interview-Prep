import React from 'react'
import { Cart } from './components/Cart/Cart'
import { CountDown } from './components/CountDownTimer/CountDown'
import { Throttle } from './components/Throttle/Throttle'
import { VirtulizedList } from './components/VirtulizedList/VirtulizedList'
import { ProgressBar } from './components/progresBar/ProgressBar'
import { Pagination } from './components/pagination/Pagination'

const List = Array.from({ length: 100000 }, (_, index) => index + 1)
// console.log(List);

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
      {/* <Cart /> */}
      {/* <CountDown /> */}
      {/* <Throttle /> */}
      {/* <VirtulizedList list={List}/> */}
      {/* <ProgressBar /> */}
      <Pagination />
    </div>
  )
}

export default App