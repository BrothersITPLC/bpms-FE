import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Product ID",
  "Product Name",
  "Product Model",
  "Opening Stock",
  "Stock Balance",
  "Stock Status",
];

const TABLE_ROWS = [
  {
    productId: "P001",
    productName: "Laptop",
    productModel: "X123",
    openingStock: 100,
    stockBalance: 80,
    stockStatus: "Low",
  },
  {
    productId: "P002",
    productName: "Smartphone",
    productModel: "S10",
    openingStock: 200,
    stockBalance: 150,
    stockStatus: "In Stock",
  },
  {
    productId: "P003",
    productName: "Headphones",
    productModel: "H360",
    openingStock: 50,
    stockBalance: 25,
    stockStatus: "Critical",
  },
  {
    productId: "P004",
    productName: "Keyboard",
    productModel: "K5",
    openingStock: 120,
    stockBalance: 100,
    stockStatus: "In Stock",
  },
  {
    productId: "P005",
    productName: "Monitor",
    productModel: "M27",
    openingStock: 80,
    stockBalance: 60,
    stockStatus: "Low",
  },
];

const StockBalance = () => {
  const getStatusButtonClass = (status) => {
    switch (status) {
      case "Critical":
        return "bg-red-500 text-white";
      case "Low":
        return "bg-orange-500 text-white";
      case "In Stock":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="flex-1 h-full w-full overflow-scroll">
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
          {TABLE_ROWS.map(
            (
              {
                productId,
                productName,
                productModel,
                openingStock,
                stockBalance,
                stockStatus,
              },
              index
            ) => (
              <tr key={productId} className={`even:bg-blue-gray-50/50`}>
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
                    {productName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {productModel}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {openingStock}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {stockBalance}
                  </Typography>
                </td>
                <td className="p-4">
                  <button
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusButtonClass(
                      stockStatus
                    )}`}
                  >
                    {stockStatus}
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default StockBalance;
