import { useState } from "react";
import {
  FaMoneyBillAlt,
  FaLink,
  FaBox,
  FaUser,
  FaFileAlt,
  FaCalendar,
} from "react-icons/fa";
import { Card, Button, IconButton } from "@material-tailwind/react";
import { FaEllipsisH, FaEdit, FaTrash, FaGlobe } from "react-icons/fa";
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
    <div className="w-full  mx-auto bg-white border relative  rounded-lg overflow-hidden">
      <div className="px-6 py-1 bg-gray-100"></div>
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
      <div className="px-6 py-4">
        <dl className=" flex flex-col gap-7 py-4 ">
          <div className="flex gap-8 w-full justify-between">
            <div className="flex items-center gap-3">
              <FaBox className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-lg text-gray-900">{name}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaMoneyBillAlt className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">price</dt>
                <dd className="mt-1 text-sm text-gray-900">{price} Birr</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaMoneyBillAlt className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  security price
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {security_price} Birr
                </dd>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <FaFileAlt className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Lot No</dt>
                <dd className="mt-1 text-sm text-gray-900">{lot_number}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaUser className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Created by
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{created_by}</dd>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex items-center gap-3">
              <FaCalendar className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Opening Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(opening_date).toLocaleDateString()}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendar className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  submission Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(submission_date).toLocaleDateString()}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendar className="h-5 w-5 text-gray-500" />
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Validity Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(validity_date).toLocaleDateString()}
                </dd>
              </div>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
