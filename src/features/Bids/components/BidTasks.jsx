import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Name"];

const TABLE_ROWS = [
  {
    id: "BID001",
    name: "Technical Document",
  },
  {
    id: "BID002",
    name: "Financial Document",
  },
  {
    id: "BID003",
    name: "Bid bond preparation",
  },
  {
    id: "BID004",
    name: "Submission",
  },
];

const BidTasks = () => {
  return (
    <div className="flex-1 ml-64 p-6">
      <CardHeader
        floated={false}
        shadow={false}
        className="mb-2 rounded-none p-2"
      >
        <div className="flex justify-end">
          <Button
            className="bg-primary1 flex items-center gap-3"
            size="sm"
            onClick={() => {
              setSelectedID(null);
              handleAddDepartmentOpen();
            }}
          >
            <PlusCircleIcon className="h-5 w-5" /> Add Bid Task
          </Button>
        </div>
      </CardHeader>
      <Card className="h-full w-full overflow-scroll">
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
            {TABLE_ROWS.map(({ id, name }, index) => (
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
    </div>
  );
};

export default BidTasks;
