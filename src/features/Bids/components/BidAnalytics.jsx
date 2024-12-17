import {
  FaDollarSign,
  FaClipboardList,
  FaTrophy,
  FaRegClock,
  FaBoxes,
  FaPauseCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const BidAnalytics = () => {
  return (
    <div className="flex-1  p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaClipboardList className="text-blue-500 text-3xl" />
            <div className="text-2xl font-semibold">1,000</div>
          </div>
          <div className="text-gray-600">Total Bids</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaDollarSign className="text-primary1 text-3xl" />
            <div className="text-2xl font-semibold">$500,000</div>
          </div>
          <div className="text-gray-600">Total Bid Value</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaTrophy className="text-primary1 text-3xl" />
            <div className="text-2xl font-semibold">60%</div>
          </div>
          <div className="text-gray-600">Win Rate</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaRegClock className="text-red-500 text-3xl" />
            <div className="text-2xl font-semibold">5 days</div>
          </div>
          <div className="text-gray-600">Avg. Bid Duration</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaBoxes className="text-teal-500 text-3xl" />
            <div className="text-2xl font-semibold">200</div>
          </div>
          <div className="text-gray-600">Total Lots</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaPauseCircle className="text-yellow-500 text-3xl" />
            <div className="text-2xl font-semibold">50</div>
          </div>
          <div className="text-gray-600">Total Pending Lots</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <div className="text-2xl font-semibold">120</div>
          </div>
          <div className="text-gray-600">Total Completed Lots</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between">
            <FaTimesCircle className="text-red-500 text-3xl" />
            <div className="text-2xl font-semibold">30</div>
          </div>
          <div className="text-gray-600">Total Canceled Lots</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-semibold mb-4">Recent Bids</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="font-medium text-gray-600">Bid #101</div>
            <div className="text-green-500">+ $5,000</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-600">Bid #102</div>
            <div className="text-red-500">- $2,000</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-600">Bid #103</div>
            <div className="text-yellow-500">+ $3,500</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidAnalytics;
