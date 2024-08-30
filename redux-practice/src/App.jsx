import './App.css'
import { useFetch } from './CustomHooks/useFetch';

function App() {
  const { data, loading } = useFetch('https://fakestoreapi.com/products');

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
      {!loading ? (data.map((item) => (
        <div key={item.id} style={{border:'1px solid', }}>
          <img src={item.image} alt={item.title} style={{width:'300px', height:'350px'}}/>
          <h3>{item.title}</h3>
        </div>
      ))) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default App
