import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import { useGetStoresBalanceQuery } from "../api/store";
import { useParams } from "react-router-dom";
const PRODUCTS = [
  { id: 1, model: "Router X", type: "Router", stock: 10 },
  { id: 2, model: "Switch Y", type: "Switch", stock: 5 },
  { id: 3, model: "Patch Cord Z", type: "Accessories", stock: 20 },
  { id: 4, model: "Router A", type: "Router", stock: 15 },
  { id: 5, model: "Switch B", type: "Switch", stock: 8 },
  { id: 6, model: "Patch Cord D", type: "Accessories", stock: 25 },
];

// Stock balance data, assuming the opening stock is calculated or comes from DB
const stockBalanceData = PRODUCTS.map((product) => ({
  productId: `P00${product.id}`,
  productName: product.type,
  productModel: product.model,
  openingStock: 100, // Assuming the opening stock is fixed or comes from DB
  stockBalance: product.stock,
  stockStatus:
    product.stock <= 5 ? "Low" : product.stock <= 10 ? "In Stock" : "Critical",
}));
const StockBalance = ({ stockBalanceData }) => {
  // Define the getStatusButtonClass function
  const getStatusButtonClass = (status) => {
    switch (status) {
      case "Low":
        return "bg-red-500 text-white"; // Red for low stock
      case "In Stock":
        return "bg-green-500 text-white"; // Green for in stock
      case "Critical":
        return "bg-yellow-500 text-black"; // Yellow for critical
      default:
        return "bg-gray-500 text-white"; // Default case
    }
  };
  const params = useParams();
  const { data: StockBalances } = useGetStoresBalanceQuery(params?.store_id, {
    skip: !params?.store_id,
  });

  return (
    <div className="w-full mt-8">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Stock Balance
      </Typography>
      <Card className="flex-1 h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Product ID
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Product Name
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Product Model
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Opening Stock
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                StockIn
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                StockOut
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Stock Balance
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Stock Status
              </th>
            </tr>
          </thead>
          <tbody>
            {StockBalances?.map((stockBalance) => (
              <tr key={stockBalance?.id} className="even:bg-blue-gray-50/50">
                <td className="p-4">{stockBalance?.id}</td>
                <td className="p-4">{stockBalance?.product_details?.name}</td>
                <td className="p-4">
                  {stockBalance?.product_details?.model_number}
                </td>
                <td className="p-4">{stockBalance?.quantity}</td>
                <td className="p-4">{stockBalance?.stock_in_total}</td>
                <td className="p-4">{stockBalance?.stock_out_total}</td>
                <td className="p-4">
                  {stockBalance?.current_stock_balance + stockBalance?.quantity}
                </td>
                <td className="p-4">
                  <span>
                    {stockBalance?.current_stock_balance +
                      stockBalance?.quantity >
                    stockBalance?.min_stock_level
                      ? "sufficient"
                      : "insufficient"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default StockBalance;
