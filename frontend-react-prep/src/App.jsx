import { lazy, Suspense } from 'react'
import './App.css'
import { Album } from './components/album/Album'
import { AvatarPicker } from './components/AvatarPicker/AvatarPicker'
import { DataGrid } from './components/DataGrid/DataGrid'
import DigitalClock from './components/DigitalClock/DigitalClock'
import { ExcelSheet } from './components/excel-spreadsheet/ExcelSheet'
import { FileExplorer } from './components/FileExplorer/FileExplorer'
import { MiniCalendar } from './components/MiniCalendar/MiniCalendar'
import NestedCheckbox from './components/NestedCheckbox/NestedCheckbox'
import { Pagination } from './components/Pagination/Pagination'
import { ProgressTimer } from './components/ProgressTimer/ProgressTimer'
import { TabForm } from './components/TabForm/TabForm'
import { TicTacToe } from './components/TicTacToe/TicTacToe'
import { Transfer } from './components/Transfer/Transfer'
import { TrafficLight } from './components/TrafficLight/TrafficLight'
import { TaskBoard } from './components/TaskBoard/TaskBoard'

const JobBoard = lazy(() => import('./components/JobBoard/JobBoard'))
function App() {

  return (
    <div style={{ padding: '10px' }}>
      {/* <Album /> */}
      {/* <NestedCheckbox /> */}
      {/* <ExcelSheet /> */}
      {/* <AvatarPicker /> */}
      {/* <MiniCalendar /> */}
      {/* <ProgressTimer /> */}
      {/* <TabForm /> */}
      {/* <Transfer /> */}
      {/* <TicTacToe /> */}
      {/* <Pagination /> */}
      {/* <FileExplorer /> */}
      {/* <DataGrid /> */}
      {/* <DigitalClock /> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <JobBoard />
      </Suspense> */}
      {/* <TrafficLight /> */}
      {/* <TaskBoard /> */}
    </div>
  )
}

export default App
