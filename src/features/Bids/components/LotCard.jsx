import {
  FaMoneyBillAlt,
  FaLink,
  FaBox,
  FaUser,
  FaFileAlt,
  FaCalendar,
} from "react-icons/fa";

export default function LotCard({
  name,
  lot_number,
  price,
  security_price,
  validity_date,
  opening_date,
  submission_date,
  created_by,
}) {
  return (
    <div className="w-full  mx-auto bg-white border  rounded-lg overflow-hidden">
      <div className="px-6 py-1 bg-gray-100"></div>
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
