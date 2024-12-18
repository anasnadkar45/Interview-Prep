import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./redux/features/cartSlice";

function App() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} width="200px" />
            <p>{product.title}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <h1>Cart</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
        {cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} width="200px" />
            <p>{item.title}</p>
            <p>Count: {item.count}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
