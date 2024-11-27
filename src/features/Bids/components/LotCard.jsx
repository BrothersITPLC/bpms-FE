import { useState } from "react";
import {
  FaMoneyBillAlt,
  FaBox,
  FaUser,
  FaDollarSign,
  FaEllipsisH,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaDoorOpen,
  FaFileUpload,
} from "react-icons/fa";

import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";

export default function EnhancedLotCard({
  id,
  name,
  lot_number,
  price,
  security_price,
  validity_date,
  opening_date,
  submission_date,
  created_by,
  onEdit,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="max-w-4xl mx-auto bg-white border hover:border-primary1 border-gray-200 rounded-xl  overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-primary1/10 via-white to-primary1/10 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{name}</h3>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-primary1 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary1"
            aria-label="More options"
          >
            <FaEllipsisH />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit(id);
                  toggleMenu();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary1/10 transition-colors duration-200"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(id);
                  toggleMenu();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <InfoBlock
            icon={<FaBox className="text-primary1" />}
            label="Lot Number"
            value={lot_number}
          />
          <InfoBlock
            icon={<FaDollarSign className="text-primary1" />}
            label="Price"
            value={`${price} Birr`}
          />
          <InfoBlock
            icon={<FaMoneyBillAlt className="text-primary1" />}
            label="Security Price"
            value={`${security_price} Birr`}
          />
          <InfoBlock
            icon={<FaUser className="text-primary1" />}
            label="Created By"
            value={created_by}
          />
          <InfoBlock
            icon={<FaDoorOpen className="text-primary1" />}
            label="Opening Date"
            value={formatFriendlyDate(opening_date)}
          />
          <InfoBlock
            icon={<FaFileUpload className="text-primary1" />}
            label="Submission Date"
            value={formatFriendlyDate(submission_date)}
          />
          <InfoBlock
            icon={<FaCalendarAlt className="text-primary1" />}
            label="Validity Date"
            value={formatFriendlyDate(validity_date)}
          />
        </dl>
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-3  p-3 rounded-lg transition-all duration-300 ">
      <div className="text-primary1/80 mt-1">{icon}</div>
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
      </div>
    </div>
  );
}
