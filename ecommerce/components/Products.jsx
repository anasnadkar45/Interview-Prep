import React from 'react'
import { useFetchProducts } from '../src/custom hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../src/features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux'

const Products = () => {
    const { products, loading } = useFetchProducts('https://fakestoreapi.com/products');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart);
    return (
        <div>
            {loading && <p>Loading...</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>All Products</h1>
                <button onClick={() => navigate('/cart')}>Cart</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                {products.length > 0 && products.map((product) => (
                    <div key={product.id} style={{ border: '1px solid', padding: '10px' }}>
                        <img src={product.image} alt="" style={{ width: '200px', height: '300px' }} />
                        <p>{product.title}</p>
                        <button onClick={() => dispatch(addToCart(product))}>Add To cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products