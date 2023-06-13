import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/publIcListings/publicListings.css";

const ModalPublicListings = ({ selectedImage, onCloseModal }) => {
  const navigate = useNavigate();

  const imgCardContainerClass = `imgCardContainer ${
    selectedImage ? "showImage" : ""
  }`;

  const containerStyle = {
    backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
  };

  const handleBackToSearch = () => {
    window.location.href = window.location.href;
    onCloseModal();
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/public-listings")
      .then((response) => response.json())
      .then((data) => {
        setListings(data.listings);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="publicModal1">
      <div className={imgCardContainerClass} style={containerStyle}>
        <button className="backToSearch" onClick={handleBackToSearch}>
          Back To Search Results
        </button>
        <button className="bottomLeftButton" onClick={handleBackToSearch}>
          Cam 1/29
        </button>
        {selectedImage && (
          <img
            className="imgPublic1"
            src={selectedImage}
            onClick={onCloseModal}
          />
        )}
      </div>
      <div className="description1">
        <div className="publicPrice1 d-flex justify-content-start align-items-center">
          <p>
            $ 6,500 <span className="xmonth">per month</span>
          </p>
        </div>
        <div className="spectsModal d-flex justify-content-between">
          <div className="order">
            <p className="desc">City</p>
            <span className="desc2">Paso Robles, California</span>
            <p className="desc">House Size</p>
            <span className="desc2">3,435 Sq. Ft. Per County</span>
            <p className="desc1">amentities</p>
          </div>
          <div className="order2">
            <p className="desc id2">ID</p>
            <span className="desc2 or2">46780</span>
            <p className="desc id2">LOT SIZE</p>
            <span className="desc2 or2">13,608 Sq. Ft. Per County</span>
          </div>
        </div>
        <div className="PublicList d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <ul>
              <li>2 Bedrooms</li>
              <li>3 Bathrooms</li>
              <li>Free Parking</li>
              <li>Pet-Friendly Environment</li>
              <li>Wifi</li>
              <li>Washing Machine</li>
            </ul>
          </div>
          <div className="col-md-6 second">
            <ul>
              <li>Jacuzzi</li>
              <li>Tv</li>
              <li>Heating System</li>
              <li>Pool</li>
            </ul>
          </div>
        </div>
        <p className="desc3">REQUIREMENTS</p>
        <div className="requirementsUl">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              quis quam ipsum impedit, doloremque porro architecto iusto culpa
              dolorum molestiae!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              quis quam ipsum impedit, doloremque porro architecto iusto culpa
              dolorum molestiae!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              quis quam ipsum impedit, doloremque porro architecto iusto culpa
              dolorum molestiae!
            </li>
          </ul>
        </div>
        <div class="containerD d-flex align-items-center justify-content-center">
          <button class="applyBtnPublic">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPublicListings;
