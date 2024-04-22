import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`https://srm-hackathon-1hs2.vercel.app/usercart?email=${userEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers as needed
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                setCartItems(data.cart); // Assuming the response has a 'cart' property
            } catch (error) {
                console.error('Error fetching cart items:', error);
                // Handle error, such as displaying an error message
            }
        };

        fetchCartItems();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="container" style={{ maxWidth: "960px", marginTop: '1.5rem' }}>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {cartItems.map((artwork, index) => (
                    <div key={index} className="col">
                        <div
                            className="card"
                            style={{
                                height: '300px',
                                borderRadius: '10px',
                                border: '1px solid white',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src={artwork.image}
                                className="card-img-top"
                                alt={artwork.name}
                                style={{
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{artwork.name}</h5>
                                <p className="card-text">Artist: {artwork.artist}</p>
                                <p className="card-text">Style: {artwork.style}</p>
                                <p className="card-text">Category: {artwork.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
