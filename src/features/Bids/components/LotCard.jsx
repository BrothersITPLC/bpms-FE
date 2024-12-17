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
  FaUserPlus,
} from "react-icons/fa";

import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";
import Modal from "../../../components/Modal";
import {
  useAddLottAssignmentMutation,
  useGetBidTaskQuery,
  useGetLotAssignmentQuery,
} from "../bidApi";
import { useGetEmployeeQuery } from "../../UserManagement/userAPI";
import { toast } from "react-toastify";

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
  assigned_users,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const [assign, setAssign] = useState(false);
  const tasks = useGetBidTaskQuery();
  const getUser = useGetEmployeeQuery();
  const [formData, setFormData] = useState({ task: "", user: "" });

  const { data: lotAssignment } = useGetLotAssignmentQuery(id, {
    skip: id == null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [addAsign] = useAddLottAssignmentMutation();
  const [openDetail, setOpenDetail] = useState(false);
  const handleSave = async () => {
    try {
      await addAsign({
        step: formData.task,
        assigned_to: formData.user,
        lot: id,
      }).unwrap();
      setAssign(false);
      toast.success("assigned");
    } catch (error) {
      setAssign(false);
      toast.error("error");
    }
    setFormData({ user: "", task: "" });
  };

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
          <div className="flex cursor-pointer  items-center ">
            <button
              className="flex items-center justify-center "
              onClick={() => {
                setOpenDetail(true);

                setFormData({ user: "", task: "" });
              }}
            >
              <FaUserPlus className="text-primary1 h-full"></FaUserPlus>
            </button>
            <div className="relative">
              {assigned_users?.map((user, index) => (
                <div className="relative group" key={user?.id}>
                  {" "}
                  <span
                    className={`h-[2rem] border-[1px] border-white flex items-center absolute justify-center z-10 text-white bg-primary1 w-[2rem] rounded-[100%]`}
                    style={{
                      left: `${index * 20}px`,
                      zIndex: 10 - index, // Higher z-index for earlier spans
                      overflow: "hidden",
                    }} // Dynamically position each span with 40px spacing
                  >
                    {user[0]}
                  </span>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[120%] hidden group-hover:block
                   bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                  >
                    {user}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </dl>
      </div>

      {assign && (
        <Modal
          open={assign}
          onConfirm={handleSave}
          onClose={() => setAssign(false)}
        >
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">
                Select Task
              </label>
              <select
                name="task"
                value={formData.task}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Task
                </option>
                {tasks?.data?.map((task) => {
                  return (
                    <option key={task?.id} value={task?.id}>
                      {task?.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">
                Select User
              </label>
              <select
                name="user"
                value={formData?.user}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select User
                </option>
                {getUser?.data?.map((user) => {
                  return (
                    <option key={user?.id} value={user?.id}>
                      {user?.email}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </Modal>
      )}

      {openDetail && (
        <Modal
          open={openDetail}
          size="xl"
          onConfirm={() => setOpenDetail(false)}
          onClose={() => setOpenDetail(false)}
        >
          <div className="flex flex-col gap-3  h-[30rem]">
            <div className="w-full justify-end flex">
              <button
                className="text-primary1 sticky top-1 px-4 py-2 rounded-md border-primary1"
                onClick={() => {
                  setAssign(true);

                  setFormData({ user: "", task: "" });
                }}
              >
                assign
              </button>
            </div>
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">name</th>
                  <th className="px-4 py-2">email</th>
                  <th className="px-4 py-2">task_type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Assigned At</th>
                  <th className="px-4 py-2">Completed At</th>
                  <th className="px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {lotAssignment?.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="px-4 py-2">
                      {assignment.assigned_to?.username}
                    </td>
                    <td className="px-4 py-2">
                      {assignment.assigned_to?.email}
                    </td>
                    <td className="px-4 py-2">{assignment.step?.name}</td>
                    <td className="px-4 py-2">{assignment?.status}</td>
                    <td className="px-4 py-2">
                      {new Date(assignment.assigned_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {assignment.completed_at
                        ? new Date(assignment.completed_at).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">{assignment.notes || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
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
