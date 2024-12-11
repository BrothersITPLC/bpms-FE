import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import StockOutModal from "./StockOutModal"; // Stock-Out Modal
import StockInModal from "./StockInModal"; // New Stock-In Modal
import { useParams } from "react-router-dom";
import ProductStoreForm from "./ProductToStoreForm";
import { useGetProduct_in_storeQuery } from "../api/product";

const STOCK_OUT_HISTORY = [
  { id: 1, date: "2024-12-01", stockedOutTo: "Dashen Bank", quantity: 2 },
  { id: 1, date: "2024-12-03", stockedOutTo: "Ethio Telecom", quantity: 5 },
  { id: 1, date: "2024-12-05", stockedOutTo: "Commercial Bank", quantity: 3 },
  { id: 2, date: "2024-12-02", stockedOutTo: "Civil Aviation", quantity: 3 },
  { id: 2, date: "2024-12-07", stockedOutTo: "Abyssinia Bank", quantity: 7 },
  { id: 3, date: "2024-12-01", stockedOutTo: "Et Switch", quantity: 10 },
  { id: 3, date: "2024-12-04", stockedOutTo: "Awash Bank", quantity: 6 },
  { id: 3, date: "2024-12-06", stockedOutTo: "Zemen Bank", quantity: 4 },
];

const STOCK_IN_HISTORY = [
  { id: 1, date: "2024-12-01", stockedInFrom: "Supplier A", quantity: 5 },
  { id: 1, date: "2024-12-03", stockedInFrom: "Supplier B", quantity: 8 },
  { id: 1, date: "2024-12-06", stockedInFrom: "Supplier C", quantity: 12 },
  { id: 2, date: "2024-12-02", stockedInFrom: "Supplier C", quantity: 20 },
  { id: 2, date: "2024-12-04", stockedInFrom: "Supplier A", quantity: 10 },
  { id: 2, date: "2024-12-06", stockedInFrom: "Supplier B", quantity: 15 },
  { id: 3, date: "2024-12-02", stockedInFrom: "Supplier B", quantity: 15 },
  { id: 3, date: "2024-12-05", stockedInFrom: "Supplier A", quantity: 25 },
  { id: 3, date: "2024-12-07", stockedInFrom: "Supplier C", quantity: 30 },
];

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

const StoreProducts = () => {
  const location = useLocation();
  const { store } = location.state || {};
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openStockOutModal, setOpenStockOutModal] = useState(false);
  const [openStockInModal, setOpenStockInModal] = useState(false);
  const [openingStock, setOpeningStock] = useState(false);
  const params = useParams();
  const { data: products } = useGetProduct_in_storeQuery(params?.store_id);

  if (!params?.store_id) {
    return (
      <div className="p-6">
        <Typography variant="h5" color="red">
          No store selected. Please go back and select a store.
        </Typography>
      </div>
    );
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const stockOutHistory = STOCK_OUT_HISTORY.filter(
    (entry) => entry.id === selectedProduct?.id
  );
  const stockInHistory = STOCK_IN_HISTORY.filter(
    (entry) => entry.id === selectedProduct?.id
  );

  const openStockOutModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenStockOutModal(true);
  };

  const openStockInModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenStockInModal(true);
  };

  const closeStockOutModalHandler = () => {
    setOpenStockOutModal(false);
    setSelectedProduct(null);
  };

  const closeStockInModalHandler = () => {
    setOpenStockInModal(false);
    setSelectedProduct(null);
  };

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

  return (
    <div className="flex-1 ml-64 p-6">
      <div className="flex w-full flex-row gap-8">
        {/* Products Table */}

        <div className="h-fit w-fit pt-10">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 flex w-full justify-between"
          >
            {store?.name} Products
            <Button color="blue" onClick={() => setOpeningStock(true)}>
              Open Stock
            </Button>
          </Typography>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    Product ID
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    Model
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    Product Type
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    Quantity
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr
                    key={product?.id}
                    className="even:bg-blue-gray-50/50 cursor-pointer hover:bg-blue-gray-100"
                    onClick={() => handleProductClick(product?.product)}
                  >
                    <td className="p-4">{`P00${product?.product?.id}`}</td>
                    <td className="p-4">{product?.product?.model_number}</td>
                    <td className="p-4">{product?.product?.category_name}</td>
                    <td className="p-4">{product?.quantity}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="gradient"
                          color="green"
                          size="sm"
                          onClick={() => openStockInModalHandler(product)}
                        >
                          Stock-In
                        </Button>
                        <Button
                          variant="gradient"
                          color="purple"
                          size="sm"
                          onClick={() => openStockOutModalHandler(product)}
                        >
                          Stock-Out
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Stock History Section */}
        {selectedProduct && (
          <div className="w-1/2">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Stock History for: {selectedProduct?.model}
            </Typography>

            {/* Tabs */}
            <Tabs value="stock-in" className="mb-4">
              <TabsHeader>
                <Tab value="stock-in">Stock-In History</Tab>
                <Tab value="stock-out">Stock-Out History</Tab>
              </TabsHeader>
              <TabsBody>
                {/* Stock-In Tab */}
                <TabPanel value="stock-in">
                  <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            Date
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            Stocked In From
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockInHistory.map(
                          ({ date, stockedInFrom, quantity }, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                              <td className="p-4">{date}</td>
                              <td className="p-4">{stockedInFrom}</td>
                              <td className="p-4">{quantity}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </Card>
                </TabPanel>

                {/* Stock-Out Tab */}
                <TabPanel value="stock-out">
                  <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            Date
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            Stocked Out To
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockOutHistory.map(
                          ({ date, stockedOutTo, quantity }, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                              <td className="p-4">{date}</td>
                              <td className="p-4">{stockedOutTo}</td>
                              <td className="p-4">{quantity}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </Card>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        )}
      </div>

      {/* Stock Balance Table */}
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
                  Stock Balance
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Stock Status
                </th>
              </tr>
            </thead>
            <tbody>
              {stockBalanceData.map(
                ({
                  productId,
                  productName,
                  productModel,
                  openingStock,
                  stockBalance,
                  stockStatus,
                }) => (
                  <tr key={productId} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{productId}</td>
                    <td className="p-4">{productName}</td>
                    <td className="p-4">{productModel}</td>
                    <td className="p-4">{openingStock}</td>
                    <td className="p-4">{stockBalance}</td>
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
      </div>

      {/* Modals */}
      <StockOutModal
        open={openStockOutModal}
        onClose={closeStockOutModalHandler}
        product={selectedProduct}
      />
      <StockInModal
        open={openStockInModal}
        onClose={closeStockInModalHandler}
        product={selectedProduct}
      />

      {openingStock && (
        <ProductStoreForm
          open={openingStock}
          store_id={params?.store_id}
          onClose={() => setOpeningStock(false)}
        ></ProductStoreForm>
      )}
    </div>
  );
};

export default StoreProducts;
