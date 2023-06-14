import React, { useState, useRef, useEffect } from "react";
import "../../styles/modal.css";
import testImg from "../../assets/img/testImg.jpg";
import bg from "../../assets/img/BG.svg";
import closeListing from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import ModalListingsImgs from "./modalListingsImgs";
import Pagination from "../paginations";
import { useNavigate } from "react-router-dom";

const EditModalListings = ({ renderSectionContent }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMainModal, setShowMainModal] = useState(true);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [amentities, setAmentities] = useState([""]);

  const inputRefs = useRef([]);

  const handleSelectImage = (file) => {
    console.log(file);
  }

  const handleAmentityChange = (index, value) => {
    const newAmentities = [...amentities];
    newAmentities[index] = value;
    setAmentities(newAmentities);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewAmentity(index);
    } else if (e.key === "Backspace" && amentities[index] === "") {
      e.preventDefault();
      deleteAmentity(index);
    }
  };

  const addNewAmentity = (index) => {
    if (amentities.length >= 6) return;

    const newAmentities = [...amentities];
    if (index === newAmentities.length - 1) {
      newAmentities.splice(index + 1, 0, "");
    } else {
      newAmentities.splice(index + 1, 0, "");
      newAmentities.splice(6, 1);
    }
    setAmentities(newAmentities);
  };
  const deleteAmentity = (index) => {
    if (amentities.length === 1) return;

    const newAmentities = [...amentities];
    newAmentities.splice(index, 1);
    setAmentities(newAmentities);

    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };
  const navigate = useNavigate();

  const [listingData, setListingData] = useState({
    location: "",
    lot_size: "",
    house_size: "",
    price: "",
    public: false,
    bedrooms: "",
    bathrooms: "",
    amentities: "",
  });
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setListingData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };
  const handleCloseModal = () => {
    closeModal();
    navigate("/listingsAdmin");
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(JSON.parse(storedImage));
    }
  };

  const addNewLine = () => {
    setListingData({
      ...listingData,
      amenities: listingData.amenities + "\n• ",
    });
  };

  const handleMouseEnter = () => {
    setIsCloseHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCloseHovered(false);
  };

  const handleImageMouseEnter = () => {
    setIsImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
  };
  const handleCancel = () => {
    window.location.href = "/listingsAdmin";
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    setShowMainModal(false);
    setSelectedListingId(listingData.id);
  };

  const closeModal = () => {
    setShowImageModal(false);
    setShowMainModal(true);
  };
  const handleSave = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...listingData,
        amentities: amentities.join(", "), // Concatenar las amenidades en un solo string separado por coma
      }),
    };

    fetch("http://localhost:8000/api/add-listing", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleCloseModal();

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputFocused = document.activeElement.tagName === "INPUT";
      const isModalBackgroundFocused =
        e.target.classList.contains("modalWrapper2");

      if (!isInputFocused && isModalBackgroundFocused && e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const hasNoImages =
    !renderSectionContent || renderSectionContent.images.length === 0;
  return (
    <div className="bg">
      <div className="modalWrapper2 container-fluid">
        {showMainModal && (
          <div className="container-fluid modalContent2 d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="imgContainer" onClick={handleImageClick}>
                {hasNoImages ? (
                  <img
                    className="ModalImg"
                    src={bg}
                    alt="bg"
                    onMouseEnter={handleImageMouseEnter}
                    onMouseLeave={handleImageMouseLeave}
                  />
                ) : (
                  <img
                    className="ModalImg1"
                    src={testImg}
                    alt="testImg"
                    onMouseEnter={handleImageMouseEnter}
                    onMouseLeave={handleImageMouseLeave}
                  />
                )}
                <div
                  className={`imgOverlay ${isImageHovered ? "hovered" : ""}`}
                >
                  {hasNoImages ? (
                    <div className="editBar1">
                      <span
                        className="editText"
                        onClick={() => setShowSecondModal(true)}
                      >
                        + Add Photos
                      </span>
                    </div>
                  ) : (
                    <div className="editBar">
                      <span className="editText">Edit Album (10)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <form className="modalListing1 d-flex row justify-content-start">
              <div className="row">
                <div className="col">
                  <div className="inputContainerListing">
                    <input
                      type="text"
                      className="inputListing"
                      placeholder="ID                                                                                                364675"
                      name="id"
                      value={listingData.id}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="inputListing"
                      placeholder="LOCATION                    8148 Larga Ave, 67884, Atascadero, California"
                      name="location"
                      value={listingData.location}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="inputListing"
                      placeholder="LOT SIZE                                                           3,608 Sq. Ft. Per County"
                      name="lot_size"
                      value={listingData.lot_size}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="inputListing"
                      placeholder="HOUSE SIZE                                                      3,608 Sq. Ft. Per County"
                      name="house_size"
                      value={listingData.house_size}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="inputListing"
                      placeholder="PRICE                                                                               $ 4,000 / Mo"
                      name="price"
                      value={listingData.price}
                      onChange={handleInputChange}
                    />
                    <div className="listingCheckbox">
                      <div className="form-check">
                        <label
                          htmlFor="publicCheckbox"
                          className="checkboxLabel"
                        >
                          PUBLIC
                        </label>
                        <input
                          type="checkbox"
                          id="publicCheckbox"
                          className="checkboxListing"
                          name="public"
                          checked={listingData.public}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <img
                    className="closeListing"
                    src={isCloseHovered ? closeHover : closeListing}
                    alt="close"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleCancel}
                  />
                  <div className="inputListing2">
                    <div className="inputContainerListing2">
                      <div className="bedroomBathroom">
                        <input
                          type="text"
                          className="inputListing3"
                          placeholder="#BEDROOMS                                         2"
                          name="bedrooms"
                          value={listingData.bedrooms}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          className="inputListingBath"
                          placeholder="#BATHROOMS                                      3"
                          name="bathrooms"
                          value={listingData.bathrooms}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <p className="amentities">AMENTITIES</p>
                    <ul className="list">
                      {amentities.map((amentity, index) => (
                        <li key={index}>
                          <input
                            className="inputAmentities"
                            type="text"
                            value={amentity}
                            onChange={(e) =>
                              handleAmentityChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="line">
                <div className="buttonContainer1 d-flex justify-content-end">
                  <button
                    type="button"
                    className="modalButton cancelListing"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="modalButton1 saveListing"
                    onClick={() => {
                      handleSave();
                      handleCloseModal();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {showImageModal && (
          <>
            <ModalListingsImgs
              closeModal={closeModal}
              selectedListingId={selectedListingId}
              onImageUpdate={handleSelectImage}
            />
            <style>{`.footer { display: none !important; }`}</style>
          </>
        )}
      </div>
    </div>
  );
};

export default EditModalListings;
