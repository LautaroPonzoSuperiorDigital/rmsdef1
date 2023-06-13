import React from "react";
import "../styles/tenants.css";

const CheckBoxLog = ({ checked, onChange }) => {
  const handleCheckBoxChange = () => {
    onChange(!checked);
  };

  return (
    <input
      type="checkbox"
      className="form-check-input mb-1 checkbox"
      checked={checked}
      onChange={handleCheckBoxChange}
    />
  );
};

export default CheckBoxLog;
