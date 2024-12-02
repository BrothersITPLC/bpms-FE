import { useLocation } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import Products from "./Products";

const STOCK_OUT_HISTORY_HEAD = [
  "Date",
  "Product ID",
  "Product Model",
  "Stocked Out To",
  "Quantity",
];

const STOCK_OUT_HISTORY_ROWS = [
  {
    date: "2024-12-01",
    productId: 1,
    model: "Router X",
    stockedOutTo: "Dashen Bank",
    quantity: 2,
  },
  {
    date: "2024-12-01",
    productId: 3,
    model: "Patch Cord Z",
    stockedOutTo: "Et Switch",
    quantity: 10,
  },
  {
    date: "2024-12-02",
    productId: 2,
    model: "Switch Y",
    stockedOutTo: "Civil Aviation",
    quantity: 3,
  },
];

const STOCK_IN_HISTORY_HEAD = [
  "Date",
  "Product ID",
  "Product Model",
  "Stocked In From",
  "Quantity",
];

const STOCK_IN_HISTORY_ROWS = [
  {
    date: "2024-12-01",
    productId: 1,
    model: "Router X",
    stockedInFrom: "Supplier A",
    quantity: 5,
  },
  {
    date: "2024-12-02",
    productId: 3,
    model: "Patch Cord Z",
    stockedInFrom: "Supplier B",
    quantity: 15,
  },
  {
    date: "2024-12-02",
    productId: 2,
    model: "Switch Y",
    stockedInFrom: "Supplier C",
    quantity: 20,
  },
];

const StoreProducts = () => {
  const location = useLocation();
  const { store } = location.state || {}; // Ensure the store info is passed through navigation

  if (!store) {
    return (
      <div className="p-6">
        <Typography variant="h5" color="red">
          No store selected. Please go back and select a store.
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {/* Products Table */}
      <div className="space-y-4">
        <Typography variant="h4" color="blue-gray">
          {store.name} Products
        </Typography>
        <Products store={store} />
      </div>

      {/* Stock History Tables */}
      <div className="flex flex-row gap-6">
        {/* Stock-Out History Table */}
        <div className="w-full md:w-1/2">
          <Typography variant="h4" color="blue-gray" className="mb-4">
            {store.name} Stock-Out History
          </Typography>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {STOCK_OUT_HISTORY_HEAD.map((head) => (
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
                {STOCK_OUT_HISTORY_ROWS.map(
                  (
                    { date, productId, model, stockedOutTo, quantity },
                    index
                  ) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {productId}
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
                          {stockedOutTo}
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
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Stock-In History Table */}
        <div className="w-full md:w-1/2">
          <Typography variant="h4" color="blue-gray" className="mb-4">
            {store.name} Stock-In History
          </Typography>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {STOCK_IN_HISTORY_HEAD.map((head) => (
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
                {STOCK_IN_HISTORY_ROWS.map(
                  (
                    { date, productId, model, stockedInFrom, quantity },
                    index
                  ) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {productId}
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
                          {stockedInFrom}
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
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreProducts;
