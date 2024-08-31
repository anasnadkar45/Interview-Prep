import './App.css'
import { useFetch } from './CustomHooks/useFetch';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from './features/cart/cartSlice';
import { useState } from 'react';

function App() {
  const { data, loading } = useFetch('https://fakestoreapi.com/products');
  const [showCart, setShowCart] = useState(false)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div>
      <h2>Cart Items: {cart.length}</h2>
      <button onClick={()=>setShowCart(!showCart)}>
        {!showCart ? 'Show cart' : 'Home'}
      </button>
      {!showCart ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {!loading ? (data.map((item) => (
            <div key={item.id} style={{ border: '1px solid', padding: '5px' }}>
              <img src={item.image} alt={item.title} style={{ width: '300px', height: '350px' }} />
              <h3>{item.title}</h3>
              <button onClick={() => dispatch(addToCart(item))}>Add To Cart</button>
            </div>
          ))) : (
            <h1>Loading...</h1>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {!loading ? (cart.map((item) => (
            <div key={item.item.id} style={{ border: '1px solid', padding: '5px' }}>
              <img src={item.item.image} alt={item.item.title} style={{ width: '300px', height: '350px' }} />
              <h3>{item.item.title}</h3>
              <p>count : {item.count}</p>
              <button onClick={() => dispatch(removeFromCart(item))}>Remove from Cart</button>
            </div>
          ))) : (
            <h1>Loading...</h1>
          )}
        </div>
      )}
    </div>
  )
}

export default App
