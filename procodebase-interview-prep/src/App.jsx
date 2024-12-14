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
import { Calendar } from './components/Calander/Calendar'
import { NestedComments } from './components/NestedComments/NestedComments'
import { TrafficLight } from './components/TrafficLight/TrafficLight'
import { GridLight } from './components/GridLight/GridLight'
import { PhotoAlbum } from './components/PhotoAlbum/PhotoAlbum'
import { AdvanceSearch } from './components/AdvanceSearch/AdvanceSearch'
import { Toast } from './components/Toast/Toast'
import { Comments } from './components/Comments/Comments'

const List = Array.from({ length: 100000 }, (_, index) => index + 1)
// console.log(List);

const App = () => {
  return (
    <div>
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
      {/* <BookMyShow /> */}
      {/* <Calendar /> */}
      {/* <NestedComments /> */}
      {/* <TrafficLight /> */}
      {/* <GridLight /> */}
      {/* <PhotoAlbum /> */}
      {/* <AdvanceSearch /> */}
      {/* <Toast /> */}
      <Comments />
    </div>
  )
}

export default App