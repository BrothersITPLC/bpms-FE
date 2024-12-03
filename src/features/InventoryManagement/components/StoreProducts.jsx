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

const STOCK_OUT_HISTORY = [
  { id: 1, date: "2024-12-01", stockedOutTo: "Dashen Bank", quantity: 2 },
  { id: 1, date: "2024-12-03", stockedOutTo: "Ethio Telecom", quantity: 5 },
  { id: 1, date: "2024-12-05", stockedOutTo: "Commercial Bank", quantity: 3 },
  { id: 2, date: "2024-12-02", stockedOutTo: "Civil Aviation", quantity: 3 },
  { id: 3, date: "2024-12-01", stockedOutTo: "Et Switch", quantity: 10 },
  { id: 3, date: "2024-12-04", stockedOutTo: "Awash Bank", quantity: 6 },
];

const STOCK_IN_HISTORY = [
  { id: 1, date: "2024-12-01", stockedInFrom: "Supplier A", quantity: 5 },
  { id: 1, date: "2024-12-03", stockedInFrom: "Supplier B", quantity: 8 },
  { id: 1, date: "2024-12-06", stockedInFrom: "Supplier C", quantity: 12 },
  { id: 2, date: "2024-12-02", stockedInFrom: "Supplier C", quantity: 20 },
  { id: 3, date: "2024-12-02", stockedInFrom: "Supplier B", quantity: 15 },
  { id: 3, date: "2024-12-05", stockedInFrom: "Supplier A", quantity: 25 },
];

const PRODUCTS = [
  { id: 1, model: "Router X", type: "Router", stock: 10 },
  { id: 2, model: "Switch Y", type: "Switch", stock: 5 },
  { id: 3, model: "Patch Cord Z", type: "Accessories", stock: 20 },
];

const StoreProducts = () => {
  const location = useLocation();
  const { store } = location.state || {};
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openStockOutModal, setOpenStockOutModal] = useState(false);
  const [openStockInModal, setOpenStockInModal] = useState(false);

  if (!store) {
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

  return (
    <div className="p-6 space-y-10 w-full flex-1">
      <div className="flex w-full flex-row gap-8">
        {/* Products Table */}
        <div className="h-fit w-fit">
          <Typography variant="h4" color="blue-gray" className="mb-4">
            {store.name} Products
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
                {PRODUCTS.map((product) => (
                  <tr
                    key={product.id}
                    className="even:bg-blue-gray-50/50 cursor-pointer hover:bg-blue-gray-100"
                    onClick={() => handleProductClick(product)}
                  >
                    <td className="p-4">{product.id}</td>
                    <td className="p-4">{product.model}</td>
                    <td className="p-4">{product.type}</td>
                    <td className="p-4">{product.stock}</td>
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
              Stock History for: {selectedProduct.model}
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
      <Typography>Here</Typography>

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
    </div>
  );
};

export default StoreProducts;
