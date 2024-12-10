import { Button, Card, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { useState } from "react";
import { useGetProductsQuery } from "../api/product";

const TABLE_HEAD = ["ID", "Type", "Model", "description", "Actions"];

const TABLE_ROWS = [
  { id: 1, type: "Router", model: "Router X", quantity: 10 },
  { id: 2, type: "Switch", model: "Switch Y", quantity: 5 },
  { id: 3, type: "Patch Cord", model: "Patch Cord Z", quantity: 50 },
  { id: 4, type: "Firewall", model: "Firewall A", quantity: 20 },
  { id: 5, type: "Server", model: "Server B", quantity: 2 },
];

const ProductsTable = () => {
  const params = useParams();
  const owner_id = params?.owner_id;
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const { data: products, refetch: refechProduct } = useGetProductsQuery();
  const [selectedID, setSelectedID] = useState(null);
  return (
    <Card className="flex-1 gap-2 pt-4 h-full w-fit overflow-x-auto">
      <Button
        className="w-fit bg-primary1 "
        onClick={() => {
          setOpen(true);
          setAdding(true);
          setSelectedID(null);
        }}
      >
        Add product
      </Button>
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
          {products?.map((product) => (
            <tr key={product?.id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product?.id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product?.category_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product?.model_number}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {product?.description}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button
                    className="bg-secondary1"
                    onClick={() => {
                      setAdding(false);
                      setOpen(true);
                      setSelectedID(product?.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button className="bg-primary1">delete</Button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductForm
        open={open}
        isAdding={adding}
        ownerId={owner_id}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          refechProduct();

          setOpen(false);
        }}
        product_id={selectedID}
      ></ProductForm>
    </Card>
  );
};

export default ProductsTable;
