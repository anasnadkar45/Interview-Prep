import './App.css'
import { Album } from './components/album/Album'
import { AvatarPicker } from './components/AvatarPicker/AvatarPicker'
import { ExcelSheet } from './components/excel-spreadsheet/ExcelSheet'
import { MiniCalendar } from './components/MiniCalendar/MiniCalendar'
import NestedCheckbox from './components/NestedCheckbox/NestedCheckbox'
import { ProgressTimer } from './components/ProgressTimer/ProgressTimer'

function App() {

  return (
    <div style={{padding:'100px'}}>
      {/* <Album /> */}
      {/* <NestedCheckbox /> */}
      {/* <ExcelSheet /> */}
      {/* <AvatarPicker /> */}
      {/* <MiniCalendar /> */}
      {/* <ProgressTimer /> */}
      <TabForm />
    </div>
  )
}

export default App
