// BidsCard.js
import React, { useState } from "react";
import { Card, Button, IconButton } from "@material-tailwind/react";
import {
  FaEllipsisH,
  FaEdit,
  FaTrash,
  FaGlobe,
  FaChild,
  FaUser,
  FaIndent,
  FaLinode,
  FaBuilding,
  FaCalendar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";

const BidsCard = ({
  id,
  companyName,
  bidTitle,
  rfqNo,
  created_by,
  url,
  lot_count,
  onEdit,
  onDelete,
  is_active,
  created_at,
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
      className={`relative p-6 w-80 pb-7 gap-3 flex flex-col bg-white border rounded-lg hover:border-blue-900 transition-shadow duration-300 ease-in-out${
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
      <h5 className="font-semibold text-xl truncate text-gray-800 mb-2">
        {bidTitle}
      </h5>

      {/* Bid Information */}
      <div className=" gap-8 grid grid-cols-2">
        {" "}
        <p className="text-gray-600 mb-1 flex gap-2 items-center">
          <FaBuilding className="font-medium text-primary1"></FaBuilding>
          {companyName}
        </p>
        <p className="text-gray-600 mb-1 flex gap-2 items-center">
          <FaIndent className="font-medium text-primary1"></FaIndent> {rfqNo}
        </p>
        <p className="text-gray-600 mb-1 flex gap-2">
          <span className="font-medium text-gray-700 flex gap-2">
            {" "}
            <FaUser className="font-medium text-primary1"></FaUser>{" "}
          </span>{" "}
          {created_by}
        </p>
        <p className="flex gap-2 items-center">
          <FaLinode className="font-medium text-primary1"></FaLinode>{" "}
          {lot_count} lots
        </p>
        <p className="flex gap-5 mb-4">
          <FaGlobe className="font-medium text-primary1"></FaGlobe>{" "}
          <a href={url} className="text-sm text-primary1" target="_blank">
            Visit
          </a>
        </p>
        <p className="flex gap-2 items-center">
          <FaCalendar className="font-medium text-primary1"></FaCalendar>{" "}
          <span className="text-sm">{formatFriendlyDate(created_at)}</span>
        </p>
      </div>
      {/* View Details Button */}
    </Card>
  );
};

export default BidsCard;
