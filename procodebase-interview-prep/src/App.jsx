import React from 'react'
import { Cart } from './components/Cart/Cart'
import { CountDown } from './components/CountDownTimer/CountDown'
import { Throttle } from './components/Throttle/Throttle'
import { VirtulizedList } from './components/VirtulizedList/VirtulizedList'
import { ProgressBar } from './components/progresBar/ProgressBar'
import { Pagination } from './components/pagination/Pagination'
import { ScoreCard } from './components/ScoreCard/ScoreCard'
import { Accordion } from './components/accordion/Accordion'
import { AutoComplete } from './components/AutoComplete/AutoComplete'
import { Mention } from './components/Mention/Mention'
import { BookMyShow } from './components/BookMyShow/BookMyShow'

const List = Array.from({ length: 100000 }, (_, index) => index + 1)
// console.log(List);

const App = () => {
  return (
    <div style={{ minWidth: '100vw', minHeight: '100vh', display:'flex',justifyContent:'center',alignItems:'center' }}>
      {/* <Cart /> */}
      {/* <CountDown /> */}
      {/* <Throttle /> */}
      {/* <VirtulizedList list={List}/> */}
      {/* <ProgressBar /> */}
      {/* <Pagination /> */}
      {/* <ScoreCard /> */}
      {/* <Accordion /> */}
      {/* <AutoComplete /> */}
      {/* <Mention /> */}
      <BookMyShow />
    </div>
  )
}

export default App