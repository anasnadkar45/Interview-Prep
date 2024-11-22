import React from 'react'
import { Cart } from './components/Cart/Cart'
import { CountDown } from './components/CountDownTimer/CountDown'
import { Throttle } from './components/Throttle/Throttle'
import { VirtulizedList } from './components/VirtulizedList/VirtulizedList'

const List = Array.from({ length: 100000 }, (_, index) => index + 1)
// console.log(List);

const App = () => {
  return (
    <div>
      {/* <Cart /> */}
      {/* <CountDown /> */}
      {/* <Throttle /> */}
      <VirtulizedList list={List}/>
    </div>
  )
}

export default App