import "../../styles/modalImgsSwitch.css";
import closeListing2 from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import React, { useState, useEffect } from "react";
const EditModalSections = ({ closeModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      closeModal();
    }
  }, [isModalOpen, closeModal]);

  return (
    <div className="bgSections">
      <div className="content d-flex flex-column align-items-center">
        {!isHovered ? (
          <img
            className="closeListing1"
            src={closeListing2}
            onMouseEnter={() => setIsHovered(true)}
            onClick={handleCloseModal}
          />
        ) : (
          <img
            className="closeListing1"
            src={closeHover}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCloseModal}
          />
        )}
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="NAME                                                                      Exterior"
            className="inputSection"
          />
        </div>
        <div className="b d-flex justify-content-center">
          <button
            type="button"
            className="modalButton1 cancelListing1"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="button" className="modalButton1 saveListing1">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModalSections;
