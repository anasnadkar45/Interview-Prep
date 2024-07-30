import { useState } from 'react'
import './App.css'

const TabsData = [
  {
    id: 0,
    name: 'html',
    content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
  },
  {
    id: 1,
    name: 'css',
    content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
  },
  {
    id: 2,
    name: 'javascript',
    content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
  },
]

function App() {
  // const [data, setData]= useState(TabsData[0].content);
  // const [activeTab, setActiveTab]= useState(TabsData[0].id);
  // function getTabData(id="0"){
  //   const result = TabsData[id].content;
  //   setData(result)
  //   setActiveTab(id)
  // }


  return (
    <>
      {/* <div className="Tabs_container">
        {TabsData.map((tab) => (
          <button style={{backgroundColor: activeTab === tab.id ? "green" : ""}} key={tab.id} onClick={()=> getTabData(tab.id)}>{tab.name}</button>
        ))}
      </div>

      <div>
        {data}
      </div> */}

      <ul>
        
        <li><input type="checkbox" />list 1</li>
        <li>list 2</li>
      </ul>
    </>
  )
}

export default App
