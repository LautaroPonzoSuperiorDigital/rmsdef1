import React, { useState } from "react";
import "../styles/footer.css";

const Pagination = ({
  currentPage,
  totalPages,
  totalEntries,
  onPageChange,
}) => {
  const entriesPerPage = 10;
  const visiblePages = Math.min(totalPages, 3);
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = startPage + visiblePages - 1;
  const showEntriesFrom = (currentPage - 1) * entriesPerPage + 1;
  const showEntriesTo = Math.min(currentPage * entriesPerPage, totalEntries);

  const handleClick = (pageNumber) => {
    if (pageNumber === "previous" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (pageNumber === "next" && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (typeof pageNumber === "number") {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    }
  };

  if (totalEntries === 0) {
    return (
      <div className="container-fluid row footer d-flex">
        <div className="col">
          <div className="d-flex justify-content-start">
            <p className="leftFooter">No entries found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid row footer d-flex">
      <div className="col">
        <div className="d-flex justify-content-start">
          <p className="leftFooter">
            Showing {showEntriesFrom} to{" "}
            {showEntriesTo === 0 ? 0 : totalEntries} of {totalEntries} entries
          </p>
        </div>
      </div>
      <div className="col d-flex justify-content-end">
        <div className="d-flex align-items-center button-container">
          <button
            className="previous"
            onClick={() => handleClick("previous")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <ul className="pagination row align-items-center justify-content-center">
            {Array.from({ length: visiblePages }, (_, index) => {
              const pageNumber = startPage + index;
              return (
                <li
                  key={pageNumber}
                  className={`page-item col-1 ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => handleClick(pageNumber)}
                    className="ms-1"
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="nextPage"
            onClick={() => handleClick("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
