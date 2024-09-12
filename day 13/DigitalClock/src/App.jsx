import { useState } from 'react'
import Accordian from './Accordian'
import Album from './Album'
import './App.css'
import Carousel from './Carousel'
import CountDown from './CountDown'
import CursorFollow from './CursorFollow'
import DigitalClock from './DigitalClock'
import DropDown from './DropDown'
import FilterData from './FilterData'
import Folders from './Folders'
import GridLight from './GridLight'
import NestedComment from './NestedComment'
import Stopwatch from './Stopwatch'
import TicTacToe from './TicTacToe'
import Todo from './Todo'
import TrelloBoard from './TrelloBoard'
import Search from './Search'
import Artical from './Artical'
import KanbanBoard from './KanbanBoard'
import AutoComplete from './AutoComplete'
import TaskScheduler from './TaskScheduler'

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

  const [count, setCount] = useState(0);
  const startTimer = () =>{
    setInterval(()=>{
      const newCount = count + 1;
      setCount(newCount);
    },500)
  }
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
      {/* <Todo /> */}
      {/* <CursorFollow /> */}
      {/* <TicTacToe /> */}
      {/* <Search /> */}
      {/* <Artical /> */}
      {/* <KanbanBoard /> */}
      {/* <AutoComplete /> */}
      <TaskScheduler />
    </>
  )
}

export default App
