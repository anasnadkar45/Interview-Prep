import React, { useEffect, useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCart, setIsCart] = useState(false);

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setProducts(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    const existingProduct = cart.find((cartItem) => cartItem.item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((cartItem) =>
        cartItem.item.id === product.id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item: product, count: 1 }]);
    }
  };

  const deleteFromCartHandler = (productId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div>
      {isCart ? (
        <div>
          <button onClick={() => setIsCart(false)}>Go to Products</button>
          {cart.map((cartItem) => (
            <div key={cartItem.item.id} style={{ border: '1px solid', padding: '5px' }}>
              <img src={cartItem.item.image} alt={cartItem.item.title} width={200} />
              <h3>{cartItem.item.title}</h3>
              <p>Quantity: {cartItem.count}</p>
              <button onClick={() => deleteFromCartHandler(cartItem.item.id)}>Delete From Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setIsCart(true)}>Go to Cart</button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '10px', gap: '10px' }}>
            {products.map((product) => (
              <div key={product.id} style={{ border: '1px solid', padding: '5px' }}>
                <img src={product.image} alt={product.title} width={200} />
                <h3>{product.title}</h3>
                <button onClick={() => addToCartHandler(product)}>Add To Cart</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
