import React, { useEffect, useState } from 'react'

export const AdvanceSearch = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setfilterProducts] = useState(products);
  const [searchInput, setSearchInput] = useState('');

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setProducts(result);
    setfilterProducts(result);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchInput.length !== 0) {
      const filterData = filterProducts.filter((product) => product.title.toLowerCase().includes(searchInput.toLowerCase()))
      setfilterProducts(filterData);
    }else{
      setfilterProducts(products);
    }
  }, [searchInput])
  return (
    <div>
      <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      <div>
        {filterProducts.map((product) => (
          <p key={product.id}>{product.title}</p>
        ))}
      </div>
    </div>
  )
}
