import React, { useEffect, useState } from 'react'

const url = 'https://fakestoreapi.com/products';
const cacheStore = {};
export const AdvanceSearch = () => {
  const [data, setData] = useState([]);
  const [seatchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setProducts(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (seatchInput.trim() !== '') {
      const key = seatchInput.toLowerCase()
      if (cacheStore[key]) {
        setProducts(cacheStore[key]);
        console.log('from cache');
      } else {
        let timer = setTimeout(() => {
          const sortedProducts = data.filter((product) => {
            return product.title.toLowerCase().includes(seatchInput.toLowerCase())
          })
          setProducts(sortedProducts);
          cacheStore[key] = sortedProducts;
        }, 1000);

        return () => clearTimeout(timer);
      }
    } else {
      setProducts(data)
    }
  }, [seatchInput])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '10px' }}>
      <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
        {products.map((product) => (
          <div style={{ border: '1px solid black', padding: '10px', backgroundColor: 'lightgray' }}>
            <img src={product.image} alt="" style={{ width: '100%' }} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
