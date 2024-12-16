import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import { useGetStoresBalanceQuery } from "../api/store";
import { useParams } from "react-router-dom";

// Stock balance data, assuming the opening stock is calculated or comes from DB
const StockBalance = ({}) => {
  const params = useParams();
  const { data: StockBalances } = useGetStoresBalanceQuery(params?.store_id, {
    skip: !params?.store_id,
  });

  // Function to get the button class based on stock status
  const getStatusButtonClass = (stockBalance, quantity, minStockLevel) => {
    const totalStock = stockBalance + quantity;
    return totalStock > minStockLevel
      ? "bg-green-500 text-white rounded-full px-4 py-2 text-sm" // Sufficient stock
      : "bg-red-500 text-white rounded-full px-4 py-2 text-sm"; // Insufficient stock
  };

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
                  <button
                    className={getStatusButtonClass(
                      stockBalance?.current_stock_balance,
                      stockBalance?.quantity,
                      stockBalance?.min_stock_level
                    )}
                  >
                    {stockBalance?.current_stock_balance +
                      stockBalance?.quantity >
                    stockBalance?.min_stock_level
                      ? "Sufficient"
                      : "Insufficient"}
                  </button>
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
