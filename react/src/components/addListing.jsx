import React, { useState } from "react";

const AddListings = ({ onClick }) => {
  return (
    <button className="add-listing mt-4 ms-4 mr-5" onClick={onClick}>
      <span>+</span> Add Listing
    </button>
  );
};

export default AddListings;