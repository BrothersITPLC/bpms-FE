// BidsCard.js
import React, { useState } from "react";
import { Card, Button, IconButton } from "@material-tailwind/react";
import { FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BidsCard = ({
  id,
  companyName,
  bidTitle,
  rfqNo,
  created_by,
  client,
  buttonLabel = "View Details",
  onEdit,
  onDelete,
  is_active,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();

  return (
    <Card
      shadow={false}
      onClick={() => {
        navigate(`/bids/${id}`);
      }}
      className={`relative p-6 w-80 bg-white border rounded-lg hover:border-blue-900 transition-shadow duration-300 ease-in-out${
        is_active ? " border-primary1" : ""
      }`}
    >
      {/* Three-dot menu for Edit and Delete */}
      <div className="absolute top-3 right-3">
        <IconButton
          onClick={toggleMenu}
          className="text-gray-600 hover:text-blue-600"
          variant="text"
          size="sm"
        >
          <FaEllipsisH />
        </IconButton>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
            <button
              onClick={() => {
                onEdit(id);
                toggleMenu();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={() => {
                onDelete(id);
                toggleMenu();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Bid Information */}
      <h5 className="font-semibold text-xl text-gray-800 mb-2">{bidTitle}</h5>
      <p className="text-gray-600 mb-1">
        <span className="font-medium text-gray-700">Company:</span>{" "}
        {companyName}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium text-gray-700">RFQ No:</span> {rfqNo}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium text-gray-700">Created by:</span>{" "}
        {created_by}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium text-gray-700">Client:</span> {client}
      </p>

      {/* View Details Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 mt-4 transition-colors duration-200 ease-in-out">
        {buttonLabel}
      </Button>
    </Card>
  );
};

export default BidsCard;
