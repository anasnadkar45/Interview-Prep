import './App.css'
import { Album } from './components/album/Album'
import { ExcelSheet } from './components/excel-spreadsheet/ExcelSheet'
import NestedCheckbox from './components/NestedCheckbox/NestedCheckbox'

function App() {

  return (
    <div style={{padding:'100px'}}>
      {/* <Album /> */}
      {/* <NestedCheckbox /> */}
      <ExcelSheet />
    </div>
  )
}

export default App
