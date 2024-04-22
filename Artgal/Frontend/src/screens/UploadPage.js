
import React, { useState, useEffect } from "react";
import backgroundImage from "../images/banner2.avif";
import searchIcon from "../images/upload-icon.png";
import { useNavigate } from 'react-router-dom';


const UploadPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showUploadOverlay, setShowUploadOverlay] = useState(false);
  const navigate = useNavigate();

  const boxStyles = {
    width: "500px",
    height: "50px",
    backgroundColor: "white",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 2,
  };

  const iconStyles = {
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };
  const iconStyles2 = {
    height: "30px",
    width: "30px",
    cursor: "pointer",
    margin: "10px 0px 0px 0px"
  };

  const inputStyles = {
    height: "40px",
    border: "none",
    outline: "none",
    fontSize: "18px",
    paddingLeft: "10px",
    flex: 1,
  };
  const handleClick = async () => {
    try {
      const response = await fetch(
        `https://srm-hackathon-1hs2.vercel.app/search?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for artworks:", error);
    }
  };

  const toggleUploadOverlay = () => {
    setShowUploadOverlay(!showUploadOverlay);
  };

  useEffect(() => {
    const fetchRandomArtworks = async () => {
      try {
        const response = await fetch(`https://srm-hackathon-1hs2.vercel.app/artwork?limit=18`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching random artworks:", error);
      }
    };

    fetchRandomArtworks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://srm-hackathon-1hs2.vercel.app/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      console.log(data);

      setSearchQuery("");
      toggleUploadOverlay();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleImageClick = (artwork) => {
    navigate('/view', { state: { selectedArtwork: artwork } });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        padding: '2rem',
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>
          Showcase your artwork!
        </h1>
        <div style={boxStyles}>
          <div>
            <img
              src={searchIcon}
              alt="Search"
              style={iconStyles}
              onClick={toggleUploadOverlay}
            />{" "}
          </div>
          <input
            style={inputStyles}
            type="text"
            placeholder="Reimagine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i
            style={iconStyles2}
            className="fa-solid fa-magnifying-glass "
            onClick={handleClick}
          ></i>
        </div>
      </div>

      <div className="container" style={{ maxWidth: "960px", marginTop: '1.5rem' }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {searchResults.map((artwork, index) => (
            <div key={index} className="col">
              <div
                className="card"
                style={{
                  height: '300px',
                  borderRadius: '10px',
                  border: '1px solid white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => handleImageClick(artwork)}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUploadOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
          }}
          onClick={toggleUploadOverlay}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Upload Artwork</h2>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundImage: 'linear-gradient(to right, #f6d365, #fda085)',  // Gradient background
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{ flex: '1', textAlign: 'left' }}>Style:</span>
                <input type="text" name="style" required style={{ flex: '2' }} />
              </label>
              <br />
              <label style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{ flex: '1', textAlign: 'left' }}>Artist:</span>
                <input type="text" name="artist" required style={{ flex: '2' }} />
              </label>
              <br />
              <label style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{ flex: '1', textAlign: 'left' }}>Category:</span>
                <input type="text" name="category" required style={{ flex: '2' }} />
              </label>
              <br />
              <label style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{ flex: '1', textAlign: 'left' }}>Name:</span>
                <input type="text" name="name" required style={{ flex: '2' }} />
              </label>
              <br />
              <label style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{ flex: '1', textAlign: 'left' }}>Price:</span>
                <input type="text" name="price" required style={{ flex: '2' }} />
              </label>
              <br />

              <label style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{ flex: '1', textAlign: 'left' }}>Image:</span>
                <input type="file" name="image" required style={{ flex: '2' }} />
              </label>
              <br />
              <button type="submit" style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '14px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}>Upload</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;

