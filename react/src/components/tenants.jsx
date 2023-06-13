import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import "../styles/tenants.css";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/Delete.svg";
import DeleteIconHover from "../assets/img/DeleteIconHover.svg";
import CheckMark from "../assets/img/CheckMark.svg";
import tenantsData from "./tenantsData";
import { EditButton, DeleteButton } from "./Buttons";
import EditModal from "./Modals";
import CheckBoxLog from "./checkBox";
import Search from "./Search";
import Pagination from "./Paginations";
import "../styles/modal.css";

const Tenant = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTenant, setEditTenant] = useState(null);
  const [tenants, setTenants] = useState(tenantsData);
  const [showMissedPayment, setShowMissedPayment] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;
  const totalTenants = tenants.length;
  const totalPages = Math.ceil(totalTenants / PAGE_SIZE);

  const filteredTenants = showMissedPayment
    ? tenants.filter((tenant) => tenant.status.includes("Missed Payment"))
    : tenants;

  const countMissedPaymentTenants = () =>
    tenants.filter((tenant) => tenant.status.includes("Missed Payment")).length;

  const tenantsPerPage = filteredTenants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (listings) => {
    const updatedTenants = tenants.filter(
      (tenant) => tenant.listings !== listings
    );
    setTenants(updatedTenants);
  };

  const handleCheckBoxChange = (value) => {
    setShowMissedPayment(value);
  };

  const handleSearch = (searchResults) => {
    setTenants(searchResults);
  };

  const handleEditClick = (tenant) => {
    console.log("Editing Tenant:", tenant);
    setEditTenant(tenant);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setEditTenant(null);
  };

  const handleSave = (updatedTenant) => {
    setTenants((prevTenants) => {
      const updatedTenants = prevTenants.map((tenant) => {
        if (tenant.listings === updatedTenant.listings) {
          return updatedTenant;
        }
        return tenant;
      });
      return updatedTenants;
    });
    setIsEditOpen(false);
    setEditTenant(null);
  };
  const handleSaveModal = (updatedTenant) => {
    const updatedTenants = tenants.map((tenant) => {
      if (tenant.listings === updatedTenant.listings) {
        return updatedTenant;
      }
      return tenant;
    });
    setTenants(updatedTenants);
    handleSaveTenant(updatedTenant);
  };

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="d-flex w-100">
          <div className="container tenantsContainer">
            <div className="d-flex align-items-center justify-content-start">
              <h2 className="tenantsText">tenants</h2>
              <div className="form-check ms-3 mb-1">
                <label className="d-flex align-items-center mb-0">
                  <CheckBoxLog
                    checked={showMissedPayment}
                    onChange={handleCheckBoxChange}
                  />
                  <p className="m-2 mb-0 tenantShow">
                    Show only tenants with missed payment{" "}
                    <span className="filterMissedPayment">
                      {" "}
                      {showMissedPayment ? countMissedPaymentTenants() : 0}
                    </span>
                  </p>
                </label>
              </div>
            </div>
          </div>
          <Search onSearch={handleSearch} tenantsData={tenantsData} />
        </div>
        <div className="container-fluid d-flex justify-content-start">
          <div className="row container-fluid">
            <div className="col table-container">
              <table className="table mt-4 w-100">
                <thead>
                  <tr>
                    <td>
                      <p className="lead name td p1">NAME</p>
                    </td>
                    <td>
                      <p className="lead listings1 td p1">LISTINGS</p>
                    </td>
                    <td>
                      <p className="lead status td p1">PAYMENT STATUS</p>
                    </td>
                    <td>
                      <p className="lead email td p1">EMAIL</p>
                    </td>
                    <td>
                      <p className="lead phone td p1">PHONE</p>
                    </td>
                    <td>
                      <p className="lead contract td p1">CONTRACT DATES</p>
                    </td>
                    <td>
                      <p className="lead bgcheck td p1">BACKGROUND CHECK</p>
                    </td>
                    <td>
                      <p className="lead actions td p1">ACTIONS</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {tenantsPerPage.map((tenant) => {
                    if (
                      showMissedPayment &&
                      !tenant.status.includes("Missed Payment")
                    ) {
                      return null;
                    }
                    return (
                      <tr key={tenant.listings} className="trBg">
                        <td>
                          <p className="p1 h">{tenant.name}</p>
                        </td>
                        <td>
                          <p className="p1 h">{tenant.listings}</p>
                        </td>
                        <td>
                          <p
                            className={`p1 h ${
                              tenant.status.includes("Missed Payment")
                                ? "missed"
                                : ""
                            }`}
                          >
                            {tenant.status}
                          </p>
                        </td>
                        <td>
                          <p className="p1 h">{tenant.email}</p>
                        </td>
                        <td>
                          <p className="p1 h">{tenant.phone}</p>
                        </td>
                        <td>
                          <p className="p1 h">{tenant.contract}</p>
                        </td>
                        <td>
                          {tenant.backgroundCheck === "check" ? (
                            <img
                              className="checkMark"
                              src={CheckMark}
                              alt="CheckMark"
                            />
                          ) : null}
                        </td>
                        <td>
                          <EditButton
                            defaultImage={<img src={Edit} alt="Edit" />}
                            hoverImage={<img src={EditHover} alt="EditHover" />}
                            onClick={() => handleEditClick(tenant)}
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
                            onClick={() => handleDelete(tenant.listings)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <EditModal
          tenant={editTenant}
          onSave={handleSave}
          onClose={handleCloseEditModal}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={totalTenants}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Tenant;
