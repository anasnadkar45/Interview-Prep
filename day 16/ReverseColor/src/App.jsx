import { useEffect, useState } from 'react'
import './App.css'
import Box from './Box';

function App() {
  const [queue, setQueue] = useState([]);
  const [grid, setGrid] = useState([
    {
      id:1,
      isClicked: false,
      isVisible: true,
    },
    {
      id:2,
      isClicked: false,
      isVisible: true,
    },
    {
      id:3,
      isClicked: false,
      isVisible: true,
    },
    {
      id:4,
      isClicked: false,
      isVisible: true,
    },
    {
      id:5,
      isClicked: false,
      isVisible: false,
    },
    {
      id:6,
      isClicked: false,
      isVisible: false,
    },
    {
      id:7,
      isClicked: false,
      isVisible: true,
    },
    {
      id:8,
      isClicked: false,
      isVisible: true,
    },
    {
      id:9,
      isClicked: false,
      isVisible: true,
    }
  ]);

  useEffect(()=>{
    let copyQueue = [...queue];
    let c = 0;
    if(queue.length === 7){
      for(let i=0; i<7; i++){
        let x = copyQueue.shift();
        c++;

        setTimeout(() => {
          setGrid((grid) => {
            return grid.map((gridItem, id) =>{
              return x.id === gridItem.id
              ? { ...gridItem, isClicked: false}
              : gridItem;
            })
          })
        }, i*1000);
      }
      if(c === 7){
        setQueue([]);
      }
    }
  },[queue]);

  const handleClicked = (item) => {
    grid.map((gridItem)=>{
      if(!queue.includes(gridItem)){
        if(gridItem.id === item.id){
          return setQueue((queueItem) => [...queueItem, gridItem]);
        }
      }
    });

    setGrid(
      grid.map((gridItem)=>{
        if(gridItem.id === item.id){
          gridItem.isClicked = true;
        }
        return gridItem;
      })
    )
  }

  return (
    <div className="App">
      <div className="container">
        {grid.map((item, id)=>(
          <Box item={item} key={id} handleClicked={handleClicked}/>
        ))}
      </div>
    </div>
  )
}

export default App
