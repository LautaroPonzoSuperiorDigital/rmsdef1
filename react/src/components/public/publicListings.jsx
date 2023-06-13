import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/publIcListings/publicListings.css";
import Logo from "../../assets/img/Logo.svg";
import bath from "../../assets/img/bath.svg";
import bed from "../../assets/img/bed.svg";
import SearchIconHover from "../../assets/img/SearchIconHover.svg";
import SearchIcon from "../../assets/img/SearchIcon.svg";
import picture1 from "../../assets/img/picture.jpg";
import picture2 from "../../assets/img/picture2.jpg";
import picture3 from "../../assets/img/picture3.jpg";
import picture4 from "../../assets/img/picture4.jpg";
import picture5 from "../../assets/img/picture5.jpg";
import picture6 from "../../assets/img/picture6.jpg";
import ModalPublicListings from "./modalPublicListings";

const PublicListings = () => {
  const [isSearchIconHovered, setIsSearchIconHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/publicListings");
    setIsModalOpen(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleSearchIconHover = () => {
    setIsSearchIconHovered(true);
  };

  const handleSearchIconLeave = () => {
    setIsSearchIconHovered(false);
  };

  const handleInputHover = () => {
    setIsInputHovered(true);
  };

  const handleInputLeave = () => {
    setIsInputHovered(false);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
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
    <div className=" containerPublic w-100">
      <div
        className={`position-sticky w-100 ${isModalOpen ? "modal-open" : ""}`}
      >
        <div className="filtersBar d-flex align-items-center">
          <img
            className="LogoPublic justify-content-start ms-4"
            src={Logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
          <form method="GET">
            <input
              className={`inputPublic ms-5 ${
                isInputHovered ? "inputHovered" : ""
              }`}
              type="text"
              placeholder="     Keyword Or City"
              required
              onMouseEnter={handleInputHover}
              onMouseLeave={handleInputLeave}
            />
            <button type="submit">
              <img
                className={`SearchIconListings justify-content-start ${
                  isInputHovered || isSearchIconHovered ? "SearchIconHover" : ""
                }`}
                src={
                  isInputHovered || isSearchIconHovered
                    ? SearchIconHover
                    : SearchIcon
                }
                alt="SearchIcon"
                onMouseEnter={handleSearchIconHover}
                onMouseLeave={handleSearchIconLeave}
              />
            </button>
            <select className="dropdownMenu">
              <option className="opt" value="price">
                &nbsp;&nbsp;Price
              </option>
            </select>
            <select className="dropdownMenu">
              <option className="opt" value="sqft">
                &nbsp;&nbsp;Sq. Ft
              </option>
            </select>
            <select className="dropdownMenu largeArrow">
              <option className="opt" value="amenities">
                &nbsp;&nbsp;Amenities
              </option>
            </select>
          </form>
        </div>
      </div>
      <div className="containerImgs">
        {listings.map((listing) => (
          <div className="item1">
            <img
              className="imgPublic"
              src={picture1}
              onClick={() => handleImageClick(picture1)}
            />
            <div className="description d-flex col">
              <div className="spects d-flex flex-column justify-content-center align-items-start">
                <p className="publicPrice price">
                  $
                  {listing.price
                    ? parseFloat(listing.price).toLocaleString("en", {
                        useGrouping: true,
                      })
                    : ""}
                  <span className="strong"> per month</span>
                </p>
                <p className="spect house_size">
                  HOUSE{" "}
                  <span className="strong">
                    {listing.house_size
                      ? listing.house_size.toLocaleString("EN", {
                          maximumFractionDigits: 0,
                        })
                      : ""}
                  </span>
                </p>
                <p className="spect lot_size">
                  LOT{" "}
                  <span className="strong">
                    {listing.lot_size
                      ? listing.lot_size.toLocaleString("EN", {
                          maximumFractionDigits: 0,
                        })
                      : ""}
                  </span>
                </p>
              </div>
              <div className="spects2">
                <p className="spectText d-flex justify-content-end location mt-3">
                  {listing.location}
                </p>
                <div className="icons1 d-flex justify-content-end">
                  <span className="nbedbath">{listing.bedrooms}</span>
                  <img className="bed bedrooms" src={bed} />
                  <span className="nbedbath bathrooms">
                    {listing.bathrooms}
                  </span>
                  <img className="bath" src={bath} />
                </div>
                <p className="listingNumber d-flex justify-content-end mt-2 id">
                  # {listing.id}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ModalPublicListings
          selectedImage={selectedImage}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PublicListings;
