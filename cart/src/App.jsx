import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from './features/cart/cartSlice';

function App() {
  const [products, setProducts] = useState([]);
  const [isCartActive, setIsCartActive] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart)

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setProducts(result);
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  console.log(products);

  return (
    <>
      {!isCartActive ? (
        <>
          <button onClick={() => setIsCartActive(true)}>Cart</button>
          <div className='grid grid-cols-4 gap-4'>
            {products.map((product) => (
              <div key={product.id} className='border p-4'>
                <img src={product.image} alt={product.title} className='h-[300px]' />
                <h2 className='line-clamp-1'>{product.title}</h2>
                <button onClick={() => dispatch(addToCart({ product }))}>AddToCart</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setIsCartActive(false)}>Back to Products</button>
          <h2>Your Cart</h2>
          <div className='grid grid-cols-4 gap-4'>
            {cart.map((product) => (
              <div key={product.id} className='border p-4'>
                <img src={product.image} alt={product.title} className='h-[300px]' />
                <h2 className='line-clamp-1'>{product.title}</h2>
                <button onClick={() => dispatch(deleteFromCart({ id: product.id }))}>AddToCart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
