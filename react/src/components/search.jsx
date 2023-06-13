import React, { useState } from "react";
import SearchIcon from "../assets/img/SearchIcon.svg";
import SearchIconHover from "../assets/img/SearchIconHover.svg";
import tenantsData from "./tenantsData";
import "../styles/tenants.css";


function Search({ onSearch, tenantsData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    const searchTerms = searchTerm.toLowerCase().trim().split(" ");
    const filteredTenants = tenantsData.filter((tenant) => {
      for (let i = 0; i < searchTerms.length; i++) {
        const term = searchTerms[i];
        let foundMatch = false;

        if (
          term.startsWith("name:") &&
          tenant.name.toLowerCase().includes(term.slice(5))
        ) {
          foundMatch = true;
        }
        if (
          term.startsWith("email:") &&
          tenant.email.toLowerCase().includes(term.slice(6))
        ) {
          foundMatch = true;
        }
        if (
          term.startsWith("listings:") &&
          tenant.listings.toLowerCase().includes(term.slice(9))
        ) {
          foundMatch = true;
        }
        if (
          tenant.name.toLowerCase().includes(term) ||
          tenant.email.toLowerCase().includes(term) ||
          tenant.listings.toLowerCase().includes(term)
        ) {
          foundMatch = true;
        }

        if (!foundMatch) {
          return false;
        }
      }
      return true;
    });

    onSearch(filteredTenants);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="search-container d-flex align-items-center justify-content-end mt-4">
      <input
        type="text"
        className="form-control form-control-sm search-input"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
        value={searchTerm}
        onChange={handleChange}
      />

      <button
        className="squareButton"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="SearchIcon"
          src={isHovered ? SearchIconHover : SearchIcon}
          alt="SearchIcon"
        />
      </button>
    </div>
  );
}

export default Search;