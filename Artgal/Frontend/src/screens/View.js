// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { TiShoppingCart } from "react-icons/ti";

// const View = ({ setCart }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { selectedArtwork } = location.state || {};
//   const [cart, setLocalCart] = useState([]);

//   if (!selectedArtwork) {
//     return (
//       <div>
//         <h1>No artwork selected</h1>
//         <button onClick={() => navigate('/')}>Back to Home</button>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     const updatedCart = [...cart, selectedArtwork];
//     setLocalCart(updatedCart);
//     setCart(updatedCart);
//     // You can also navigate to the Cart component after adding the artwork
//     // navigate('/cart');
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', }}>
//       <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', padding: '2rem', maxWidth: '600px', width: '90%', }}>
//         <img src={selectedArtwork.image} alt={selectedArtwork.name} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1rem', }} />
//         <h2>{selectedArtwork.name}</h2>
//         <p><strong>Artist:</strong> {selectedArtwork.artist}</p>
//         <p><strong>Style:</strong> {selectedArtwork.style}</p>
//         <p><strong>Category:</strong> {selectedArtwork.category}</p>
//         {/* <p><strong>Price:</strong> {selectedArtwork.price}</p> */}
//         <button onClick={handleAddToCart} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease', display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
//           <TiShoppingCart style={{ marginRight: '0.5rem' }} /> Add to Cart
//         </button>
//         <button onClick={() => navigate('/Upload')} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease', }}>
//           Back to Gallery
//         </button>
//       </div>
//     </div>
//   );
// };

// export default View;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

const View = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArtwork } = location.state || {};

  // Retrieve email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  if (!selectedArtwork) {
    return (
      <div>
        <h1>No artwork selected</h1>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      console.log(selectedArtwork.name)
      console.log(userEmail)
      const response = await fetch('https://srm-hackathon-1hs2.vercel.app/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          artworkName: selectedArtwork.name
        })
      });
      if (!response.ok) {
        throw new Error('Error adding artwork to cart');
      }
      const data = await response.json();
      setCart(data.cart);
      // You can also navigate to the Cart component after adding the artwork
      // navigate('/cart');
    } catch (error) {
      console.error('Error adding artwork to cart:', error);
      // Handle error as needed
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', padding: '2rem', maxWidth: '600px', width: '90%', }}>
        <img src={selectedArtwork.image} alt={selectedArtwork.name} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1rem', }} />
        <h2>{selectedArtwork.name}</h2>
        <p><strong>Artist:</strong> {selectedArtwork.artist}</p>
        <p><strong>Style:</strong> {selectedArtwork.style}</p>
        <p><strong>Category:</strong> {selectedArtwork.category}</p>
        {/* <p><strong>Price:</strong> {selectedArtwork.price}</p> */}
        <button onClick={handleAddToCart} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease', display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
          <TiShoppingCart style={{ marginRight: '0.5rem' }} /> Add to Cart
        </button>
        <button onClick={() => navigate('/Upload')} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease', }}>
          Back to Gallery
        </button>
      </div>
    </div>
  );
};

export default View;
