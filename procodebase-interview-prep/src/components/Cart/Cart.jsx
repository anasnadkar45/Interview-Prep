import React, { useEffect, useState } from 'react';

const api = 'https://fakestoreapi.com/products';

export const Cart = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [page, setPage] = useState(1);

    // Fetch products from the API
    const getProducts = async () => {
        const response = await fetch(api);
        const result = await response.json();
        setProducts(result);
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        const startIndex = (page - 1) * 8;
        const endIndex = startIndex + 8;
        setSelectedProducts(products.slice(startIndex, endIndex));
    }, [page, products])

    // Add product to cart
    const addTocart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.item.id === product.id);
            if (existingItem) {
                // Update the count for existing product
                return prevCart.map((item) =>
                    item.item.id === product.id
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            } else {
                // Add new product to the cart
                return [...prevCart, { item: product, count: 1 }];
            }
        });
    };

    console.log(cart);
    const totalPages = Math.ceil(products.length / 8);

    return (
        <div style={{ padding: '10px' }}>
            <h1>Products</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: '10px',
                }}
            >
                {selectedProducts.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid lightgray',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        <img
                            src={product.image}
                            alt=""
                            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                        />
                        <h3>{product.title}</h3>
                        <button
                            onClick={() => addTocart(product)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Add To cart
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    style={{
                        padding: '5px 10px',
                        margin: '0 5px',
                        backgroundColor: page === 1 ? 'slategray' : '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPages}
                    style={{
                        padding: '5px 10px',
                        margin: '0 5px',
                        backgroundColor: page === totalPages ? 'slategray' : '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Next
                </button>
            </div>


            <div style={{ marginTop: '20px' }}>
                <h1>Cart</h1>
                {cart.length === 0 ? (
                    <p>No items in the cart.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {cart.map((cartItem) => (
                            <li
                                key={cartItem.item.id}
                                style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '1px solid lightgray',
                                    padding: '10px',
                                    borderRadius: '5px',
                                }}
                            >
                                <div>
                                    <h3>{cartItem.item.title}</h3>
                                    <p>
                                        ${cartItem.item.price.toFixed(2)} x {cartItem.count}
                                    </p>
                                </div>
                                <p>
                                    <strong>
                                        ${(
                                            cartItem.item.price * cartItem.count
                                        ).toFixed(2)}
                                    </strong>
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
