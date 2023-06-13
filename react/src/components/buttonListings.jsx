import React, { useState } from "react";
import "../styles/tenants.css";

export const EditButton = ({ defaultImage, hoverImage, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeletingHovered, setIsDeletingHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDeletingHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDeletingHovered(false);
  };

  return (
    <button
      className="hoverableButton editButton"
      onClick={() => onClick(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="imageContainer">
        {isHovered ? hoverImage : defaultImage}
      </span>
      {isDeletingHovered && (
        <div className="confirmationBox">Edit This Listing</div>
      )}
    </button>
  );
};

export const DeleteButton = ({ defaultImage, hoverImage, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeletingHovered, setIsDeletingHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDeletingHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDeletingHovered(false);
  };

  return (
    <button
      className="hoverableButton deleteButton"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="imageContainer">
        {isHovered ? hoverImage : defaultImage}
      </span>
      {isDeletingHovered && (
        <div className="confirmationBox">Delete This Listing</div>
      )}
    </button>
  );
};
