import React, { useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import StockOutModal from "./StockOutModal"; // Stock-Out Modal
import StockInModal from "./StockInModal"; // New Stock-In Modal

const TABLE_HEAD = [
  "Product ID",
  "Product Type",
  "Product Model",
  "Actions",
  "Quantity",
];

const TABLE_ROWS = [
  {
    id: 1,
    type: "Router",
    model: "Router X",
    quantity: 10,
  },
  {
    id: 2,
    type: "Switch",
    model: "Switch Y",
    quantity: 5,
  },
  {
    id: 3,
    type: "Patch Cord",
    model: "Patch Cord Z",
    quantity: 50,
  },
  {
    id: 4,
    type: "Firewall",
    model: "Firewall A",
    quantity: 20,
  },
  {
    id: 5,
    type: "Server",
    model: "Server B",
    quantity: 2,
  },
];

const Products = ({ store }) => {
  const [openStockOutModal, setOpenStockOutModal] = useState(false);
  const [openStockInModal, setOpenStockInModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Open the Stock-Out Modal
  const openStockOutModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenStockOutModal(true);
  };

  // Open the Stock-In Modal
  const openStockInModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenStockInModal(true);
  };

  // Close the Stock-Out Modal
  const closeStockOutModalHandler = () => {
    setOpenStockOutModal(false);
    setSelectedProduct(null);
  };

  // Close the Stock-In Modal
  const closeStockInModalHandler = () => {
    setOpenStockInModal(false);
    setSelectedProduct(null);
  };

  // Handle the Stock-Out action
  const handleStockOut = ({ stockOutTo, quantity }) => {
    console.log(
      `Stocking out ${quantity} of ${selectedProduct.model} to ${stockOutTo}`
    );
    // Implement API or state update logic for stock-out
    closeStockOutModalHandler();
  };

  // Handle the Stock-In action
  const handleStockIn = ({ quantity }) => {
    console.log(`Stocking in ${quantity} of ${selectedProduct.model}`);
    // Implement API or state update logic for stock-in
    closeStockInModalHandler();
  };

  return (
    <div>
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
                  <div className="flex gap-2">
                    <Button
                      variant="gradient"
                      color="green"
                      size="sm"
                      onClick={() =>
                        openStockInModalHandler({ id, type, model, quantity })
                      } // Open stock-in modal
                    >
                      Stock-In
                    </Button>
                    <Button
                      variant="gradient"
                      color="purple"
                      size="sm"
                      onClick={() =>
                        openStockOutModalHandler({ id, type, model, quantity })
                      } // Open stock-out modal
                    >
                      Stock-Out
                    </Button>
                  </div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* StockOutModal */}
      <StockOutModal
        open={openStockOutModal}
        onClose={closeStockOutModalHandler}
        onConfirm={handleStockOut}
        product={selectedProduct} // Pass selected product to the modal
      />

      {/* StockInModal */}
      <StockInModal
        open={openStockInModal}
        onClose={closeStockInModalHandler}
        onConfirm={handleStockIn}
        product={selectedProduct} // Pass selected product to the modal
      />
    </div>
  );
};

export default Products;
