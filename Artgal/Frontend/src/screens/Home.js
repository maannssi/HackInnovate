import React, { useState, useEffect } from "react";
import bannerImg from "../images/banner.jpg";
import searchIcon from "../images/upload-icon.png";
import "./Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [containerHeight, setContainerHeight] = useState("90vh");
  const [showUploadOverlay, setShowUploadOverlay] = useState(false);

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
        const response = await fetch(`https://srm-hackathon-1hs2.vercel.app/artwork?limit=9`);
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

  useEffect(() => {
    const newContainerHeight = searchResults.length > 0 ? "auto" : "90vh";
    setContainerHeight(newContainerHeight);
  }, [searchResults]);

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

  return (
    <div>
      <Navbar />
      <div className="container">
        <img src={bannerImg} alt="Banner" className="banner-img" />
        <div className="search-box">
          <div>
            <img
              src={searchIcon}
              alt="Search"
              className="search-icon"
              onClick={toggleUploadOverlay}
            />
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i
            className="fa-solid fa-magnifying-glass search-icon"
            onClick={handleClick}
          ></i>
        </div>
      </div>
      <div className="search-results-container">
        <div className="search-results-row">
          {searchResults.map((artwork, index) => (
            <div key={index} className="search-result-card">
              <img src={artwork.image} alt={artwork.name} />
              <div className="search-result-card-body">
                <h5 className="card-title">{artwork.name}</h5>
                <p className="card-text">Style: {artwork.style}</p>
                <p className="card-text">Artist: {artwork.artist}</p>
                <p className="card-text">Category: {artwork.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showUploadOverlay && (
        <div className="upload-overlay" onClick={toggleUploadOverlay}>
          <div
            className="upload-form-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Upload Artwork</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label htmlFor="style" className="col-sm-3 col-form-label">
                  Style:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="style"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="artist" className="col-sm-3 col-form-label">
                  Artist:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="artist"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="category" className="col-sm-3 col-form-label">
                  Category:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">
                  Name:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="image" className="col-sm-3 col-form-label">
                  Image:
                </label>
                <div className="col-sm-9 custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    name="image"
                    required
                  />
                  <label className="custom-file-label" htmlFor="image">
                    Choose File{" "}
                  </label>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
