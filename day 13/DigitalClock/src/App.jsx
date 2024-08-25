import Accordian from './Accordian'
import Album from './Album'
import './App.css'
import Carousel from './Carousel'
import CountDown from './CountDown'
import DigitalClock from './DigitalClock'
import DropDown from './DropDown'
import FilterData from './FilterData'
import Folders from './Folders'
import GridLight from './GridLight'
import NestedComment from './NestedComment'
import Stopwatch from './Stopwatch'
import Todo from './Todo'
import TrelloBoard from './TrelloBoard'

// const data = [
//   {
//     title: 'Title 01',
//     options: [
//       'Option 01',
//       'Option 02'
//     ]
//   },
//   {
//     title: 'Title 02',
//     options: [
//       'Option 01',
//       'Option 02'
//     ]
//   }
// ]

function App() {

  return (
    <>
      {/* <DigitalClock /> */}
      {/* <CountDown /> */}
      {/* <FilterData /> */}
      {/* <Stopwatch /> */}
      {/* <Accordian /> */}
      {/* <Carousel /> */}
      {/* <div className='flex flex-col gap-2'>
        {data.map((item) => (
          <DropDown componentData={item} />
        ))}
      </div> */}
      {/* <GridLight /> */}
      {/* <NestedComment /> */}
      {/* <Album /> */}
      {/* <TrelloBoard /> */}
      {/* <Folders /> */}
      <Todo />
    </>
  )
}

export default App
