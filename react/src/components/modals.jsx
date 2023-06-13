import React, { useState } from "react";
import "../styles/modal.css";
import Close from "../assets/img/Close.svg";
import CloseHover from "../assets/img/CloseHover.svg";
import Eye from "../assets/img/Eye.svg";

const EditModal = ({ onSave, onClose, tenant }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [name, setName] = useState(tenant.name);
  const [email, setEmail] = useState(tenant.email);
  const [phone, setPhone] = useState(tenant.phone);

  const handleMouseEnterClose = () => {
    setIsCloseHovered(true);
  };

  const handleMouseLeaveClose = () => {
    setIsCloseHovered(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedTenant = {
      ...tenant,
      name: name,
      email: email,
      phone: phone,
    };
    onSave(updatedTenant);
    onClose();
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleSave = () => {
    const updatedTenant = {
      ...tenant,
      name: name,
      email: email,
      phone: phone,
    };

    onSave(updatedTenant);
    onClose();
  };

  return (
    <div className="modalWrapper">
      <div className="modalContent">
        <form
          className="editForm d-flex flex-column align-items-center"
          onSubmit={handleFormSubmit}
        >
          <img
            src={isCloseHovered ? CloseHover : Close}
            alt="Close"
            className="close"
            onClick={handleCloseClick}
            onMouseEnter={handleMouseEnterClose}
            onMouseLeave={handleMouseLeaveClose}
          />
          <h2 className="tenant">Edit Tenant</h2>
          <input
            type="text"
            className="modalForm"
            id="name"
            placeholder={`LEGAL NAME                                                                ${tenant.name}`}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="modalForm"
            id="email"
            placeholder={`EMAIL                                                                ${tenant.email}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="modalForm"
            id="phone"
            placeholder={`PHONE                                                                         ${tenant.phone}`}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            className="modalForm inputWithIcon"
            id="SSNN"
            placeholder="SSNN                                                                                       ***"
          />
          <img src={Eye} alt="Eye" className="eyeIcon" />
          <div className="buttonContainer">
            <button
              type="button"
              onClick={handleCancelClick}
              className="modalButton cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              className="modalButton save"
              onClick={handleSave} // Llamada a handleSave en lugar de onSave
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
