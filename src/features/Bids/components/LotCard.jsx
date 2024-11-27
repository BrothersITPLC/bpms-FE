import { useState } from "react";
import {
  FaMoneyBillAlt,
  FaBox,
  FaUser,
  FaFileAlt,
  FaCalendar,
  FaEllipsisH,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { IconButton } from "@material-tailwind/react";
import { formatDateForDatetimeLocal } from "../../../../helpers/formateDateLocal";

export default function LotCard({
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
    <div className="max-w-4xl mx-auto bg-white border rounded-xl  overflow-hidden relative">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-primary1/10 via-white to-primary1/10 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
        <div>
          <IconButton
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-600"
            variant="text"
            size="sm"
          >
            <FaEllipsisH />
          </IconButton>
          {menuOpen && (
            <div className="absolute right-6 top-12 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit(id);
                  toggleMenu();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(id);
                  toggleMenu();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <dl className="space-y-6">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-between gap-8">
            <InfoBlock icon={<FaBox />} label="Lot No" value={lot_number} />
            <InfoBlock
              icon={<FaMoneyBillAlt />}
              label="Price"
              value={`${price} Birr`}
            />
            <InfoBlock
              icon={<FaMoneyBillAlt />}
              label="Security Price"
              value={`${security_price} Birr`}
            />
          </div>
          {/* Row 2 */}
          <div className="flex flex-wrap justify-between gap-8">
            <InfoBlock
              icon={<FaUser />}
              label="Created By"
              value={created_by}
            />
            <InfoBlock
              icon={<FaCalendar />}
              label="Opening Date"
              value={formatDateForDatetimeLocal(opening_date)}
            />
            <InfoBlock
              icon={<FaCalendar />}
              label="Submission Date"
              value={new Date(submission_date).toLocaleDateString()}
            />
          </div>
          {/* Row 3 */}
          <div className="flex flex-wrap justify-between gap-8">
            <InfoBlock
              icon={<FaCalendar />}
              label="Validity Date"
              value={new Date(validity_date).toLocaleDateString()}
            />
          </div>
        </dl>
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-500">{icon}</div>
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-lg font-medium text-gray-900">{value}</dd>
      </div>
    </div>
  );
}
