import { useEffect, useState } from 'react';
import './App.css';

async function getData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function App() {
  const [data, setData] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const initialData = await getData();
      setData(initialData);
    }

    fetchData();
  }, []);

  const accordionHandler = (id) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      {data.map((accordionData) => (
        <div key={accordionData.id} className="accordion-item">
          <h1 onClick={() => accordionHandler(accordionData.id)}>
            {accordionData.title}
          </h1>
          {openItemId === accordionData.id && <p>{accordionData.body}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;
