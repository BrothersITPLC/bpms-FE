import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Type", "Model", "Quantity", "Actions"];

const TABLE_ROWS = [
  { id: 1, type: "Router", model: "Router X", quantity: 10 },
  { id: 2, type: "Switch", model: "Switch Y", quantity: 5 },
  { id: 3, type: "Patch Cord", model: "Patch Cord Z", quantity: 50 },
  { id: 4, type: "Firewall", model: "Firewall A", quantity: 20 },
  { id: 5, type: "Server", model: "Server B", quantity: 2 },
];

const ProductsTable = () => {
  return (
    <Card className="flex-1 gap-2 pt-4 h-full ml-64 p-6 overflow-x-auto">
      <Button className="w-fit bg-primary1 ">Add product</Button>
      <table className="w-full min-w-max table-auto text-left">
        <caption className="sr-only">Product Inventory Table</caption>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                scope="col"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-90"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id, type, model, quantity }) => (
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
                  {type}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {model}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {quantity}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button className="bg-secondary1">Edit</Button>
                  <Button className="bg-primary1">delete</Button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ProductsTable;
