import { useState } from "react"
import Folder from "./Components/Folder"
import explorer from "./data/folderData"

function App() {
  const [explorerData, setExplorerData] = useState(explorer)
  console.log(explorerData);
  return (
    <>
      <Folder explorer={explorerData}/>
    </>
  )
}

export default App
