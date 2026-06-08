import React from "react";

const DashboardHeading = ({ title, description }) => {
  return (
    <div className="border-b border-white/5 pb-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default DashboardHeading;
