import React, { useState, useEffect } from "react";
import Nav from "./nav";
import CheckBoxLog from "./checkbox";
import SearchListings from "./searchListings";
import listingsData from "./listingsData";
import testImg from "../assets/img/testImg.jpg";
import CheckMarkListing from "../assets/img/CheckMark.svg";
import "../styles/tenants.css";
import { EditButton, DeleteButton } from "./buttonListings";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/Delete.svg";
import DeleteIconHover from "../assets/img/DeleteIconHover.svg";
import Pagination from "./paginations";
import AddListings from "./addListing";
import fetchListings from "../fetch";
import EditModalListings from "./modals/modalListing";

const ListingsAdmin = () => {
  const [listings, setListings] = useState(listingsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyPublicListings, setShowOnlyPublicListings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [newListing, setNewListing] = useState({
    location: "",
    lot_size: "",
    house_size: "",
    price: "",
  });

  const handleSearch = (searchValue) => {
    setSearchId(searchValue);

    if (searchValue === "") {
      setSearchResults([]);
      return;
    }

    const filteredListings = listings.filter(
      (listing) =>
        listing.id.toString().includes(searchValue) ||
        listing.location.includes(searchValue)
    );
    setSearchResults(filteredListings);
  };
  const handleAddListing = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const PAGE_SIZE = 10;
  const totalListings = listings.length;
  const totalPages = Math.ceil(totalListings / PAGE_SIZE);

  const listingsPerPage = listings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };
  const handleEdit = (index) => {
    const listing = filteredListings[index];
    setSelectedListingId(listing.id);
    console.log("Editar listado con índice:", index);
  };

  const deleteListing = (listingId) => {
    fetch(`http://localhost:8000/api/delete-listing/${listingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete listing");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        const updatedListings = listings.filter(
          (listing) => listing.id !== listingId
        );
        setListings(updatedListings);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCheckBoxChange = () => {
    setShowOnlyPublicListings(!showOnlyPublicListings);
  };

  const filteredListings = showOnlyPublicListings
    ? listings.filter((listing) => listing.public)
    : listings;

  useEffect(() => {
    fetchListings()
      .then((data) => {
        setListings(data.listings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="d-flex w-100 mb-3">
          <div className="container tenantsContainer">
            <div className="d-flex align-items-center justify-content-start">
              <h2 className="tenantsText">Listings</h2>
              <div className="form-check ms-3 mb-1">
                <label className="d-flex align-items-center mb-0">
                  <CheckBoxLog
                    checked={showOnlyPublicListings}
                    onChange={handleCheckBoxChange}
                  />
                  <p className="m-2 mb-0 publicShow">
                    Show only public listings{" "}
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="container-fluid ListingContainer d-flex justify-content-end bttonContainer">
            <SearchListings onSearch={handleSearch} />
            <AddListings onClick={handleAddListing} />
          </div>
        </div>
        <div className="container-fluid">
          <div className="ListingContainer">
            <div className="listingsContainer">
              <table className="table table-responsive-lg">
                <thead>
                  <tr>
                    <td>
                      <p className="ID td p1">ID</p>
                    </td>
                    <td>
                      <p className="location td p1">LOCATION</p>
                    </td>
                    <td>
                      <p className="lotSize td p1">LOT SIZE</p>
                    </td>
                    <td>
                      <p className="houseSize td p1">HOUSE SIZE</p>
                    </td>
                    <td>
                      <p className="price td p1">PRICE</p>
                    </td>
                    <td></td>
                    <td>
                      <p className="public td p1">PUBLIC</p>
                    </td>
                    <td>
                      <p className="actions td p1">ACTIONS</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {(searchId !== "" ? searchResults : filteredListings).map(
                    (listing, index) => (
                      <tr key={listing.id} className="trBg">
                        <td className="imgId">
                          <p className="alignText d-flex align-items-center h p1">
                            <img
                              className="testImg"
                              src={testImg}
                              alt="testImg"
                            />
                            {listing.id}
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.location}
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.lot_size
                              ? listing.lot_size.toLocaleString("EN", {
                                  maximumFractionDigits: 0,
                                })
                              : ""}
                            &nbsp;Sq. Ft. Per County
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.house_size
                              ? listing.house_size.toLocaleString("EN", {
                                  maximumFractionDigits: 0,
                                })
                              : ""}{" "}
                            Sq. Ft. Per County
                          </p>
                        </td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            $
                            {listing.price
                              ? parseFloat(listing.price).toLocaleString("en", {
                                  useGrouping: true,
                                })
                              : ""}
                            /mo
                          </p>
                        </td>
                        <td className="h p1 td td2"></td>
                        <td className="h p1 td td2">
                          <p className="alignText d-flex align-items-center">
                            {listing.public && (
                              <img
                                className="checkMarkListing"
                                src={CheckMarkListing}
                                alt="CheckMark"
                              />
                            )}
                          </p>
                        </td>
                        <td>
                          <EditButton
                            defaultImage={<img src={Edit} alt="Edit" />}
                            hoverImage={<img src={EditHover} alt="EditHover" />}
                            onClick={() => handleEdit(index)}
                          />
                          <DeleteButton
                            className="delete"
                            defaultImage={<img src={Delete} alt="Delete" />}
                            hoverImage={
                              <img
                                src={DeleteIconHover}
                                alt="DeleteIconHover"
                              />
                            }
                            onClick={() => deleteListing(listing.id)}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditModalListings
          onClose={handleModalClose}
          selectedListingId={selectedListingId}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={totalListings}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ListingsAdmin;
