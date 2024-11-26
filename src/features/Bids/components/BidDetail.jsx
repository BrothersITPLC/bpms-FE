import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaBuilding, FaLink, FaBox, FaUser, FaFileAlt } from "react-icons/fa";
import { useGetDetailDepartmentQuery } from "../../Department/api/department";
import { useGetDetailRFPQuery } from "../bidApi";

const BidDetail = () => {
  const location = useLocation();
  const url = useParams();
  const { data: rfp } = useGetDetailRFPQuery(url?.id, {
    skip: url?.id == null,
  });

  return (
    <div className="w-full">
      <div className="w-full flex justify-end">
        {" "}
        <button className="px-3 py-2 rounded bg-primary1 text-white shadow ">
          Create Lot
        </button>{" "}
      </div>
      <div className="w-full px-4 py-4 h-[10rem] ">
        <div className="w-full  mx-auto bg-white  rounded-lg border-primary1/10 border overflow-hidden">
          <div className="px-6 py-4 bg-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaFileAlt className="h-6 w-6 text-blue-600" />
              Request for Quotation (RFQ) {url?.id}
            </h2>
          </div>
          <div className="px-6 py-4 ">
            <dl className="space-y-4 grid-cols-3 grid gap-5">
              <div className="flex items-center gap-3">
                <FaBox className="h-5 w-5 text-gray-500" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Vendor</dt>
                  <dd className="mt-1 text-lg text-gray-900">{rfp?.name}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBuilding className="h-5 w-5 text-gray-500" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    {rfp?.client_name}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaFileAlt className="h-5 w-5 text-gray-500" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">RFQ No</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    {rfp?.rfp_number}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="h-5 w-5 text-gray-500" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Created by
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    {rfp?.created_by}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaLink className="h-5 w-5 text-gray-500" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">URL</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    <a
                      href={rfp?.url}
                      className="text-blue-600 hover:underline"
                    >
                      {rfp?.url}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidDetail;
