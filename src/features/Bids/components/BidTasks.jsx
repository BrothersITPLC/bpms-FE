import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import Modal from "../../../components/Modal";

const TABLE_HEAD = ["ID", "Name"];
const INITIAL_TABLE_ROWS = [
  { id: "BID001", name: "Technical Document" },
  { id: "BID002", name: "Financial Document" },
  { id: "BID003", name: "Bid bond preparation" },
  { id: "BID004", name: "Submission" },
];

const BidTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [tableRows, setTableRows] = useState(INITIAL_TABLE_ROWS); // State for bid tasks
  const [taskName, setTaskName] = useState(""); // Input state for task name
  const [taskID, setTaskID] = useState(""); // Input state for task ID

  // Handle opening/closing modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskName("");
    setTaskID("");
  };

  // Handle adding a new task
  const handleSaveTask = () => {
    if (taskID && taskName) {
      setTableRows([...tableRows, { id: taskID, name: taskName }]);
      handleCloseModal();
    } else {
      alert("Please fill in both Task ID and Task Name.");
    }
  };

  return (
    <div className="flex-1 ml-64 p-6">
      {/* Header */}
      <CardHeader
        floated={false}
        shadow={false}
        className="mb-2 rounded-none p-2"
      >
        <div className="flex justify-end">
          <Button
            className="bg-primary1 flex items-center gap-3"
            size="sm"
            onClick={handleOpenModal}
          >
            <PlusCircleIcon className="h-5 w-5" /> Add Bid Task
          </Button>
        </div>
      </CardHeader>

      {/* Table */}
      <Card className="h-fit w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ id, name }) => (
              <tr key={id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Bid Task"
        confirmText="Save"
        onConfirm={handleSaveTask}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task ID"
            value={taskID}
            onChange={(e) => setTaskID(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
          />
        </div>
      </Modal>
    </div>
  );
};

export default BidTasks;
