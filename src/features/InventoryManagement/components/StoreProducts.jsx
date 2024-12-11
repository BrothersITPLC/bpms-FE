import React, { useState } from "react";
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
import StockHistoryModal from "./StockHistoryModal"; // New Modal for Stock History
import ProductStoreForm from "./ProductToStoreForm";
import { useGetProduct_in_storeQuery } from "../api/product";
import { useParams } from "react-router-dom";
import StockBalance from "./StockBalance";

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
  const params = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openStockOutModal, setOpenStockOutModal] = useState(false);
  const [openStockInModal, setOpenStockInModal] = useState(false);
  const [openingStock, setOpeningStock] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

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

  const openStockOutModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenStockOutModal(true);
  };

  const openStockInModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenStockInModal(true);
  };

  const openHistoryModalHandler = (product) => {
    setSelectedProduct(product);
    setOpenHistoryModal(true);
  };

  const closeStockOutModalHandler = () => {
    setOpenStockOutModal(false);
    setSelectedProduct(null);
  };

  const closeStockInModalHandler = () => {
    setOpenStockInModal(false);
    setSelectedProduct(null);
  };

  const closeHistoryModalHandler = () => {
    setOpenHistoryModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex-1 ml-64 p-6">
      <Typography
        variant="h4"
        color="blue-gray"
        className="mb-4 flex w-full justify-between"
      >
        Store Products
        <Button color="blue" onClick={() => setOpeningStock(true)}>
          Open Stock
        </Button>
      </Typography>

      <Tabs value="products" className="w-full">
        <TabsHeader>
          <Tab value="products">Products</Tab>
          <Tab value="stock-balance">Stock Balance</Tab>
        </TabsHeader>
        <TabsBody>
          {/* Products Tab */}
          <TabPanel value="products">
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
                      Opening Stock
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      Min Quantity in Stock
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product?.id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">{`P00${product?.product?.id}`}</td>
                      <td className="p-4">{product?.product?.model_number}</td>
                      <td className="p-4">{product?.product?.category_name}</td>
                      <td className="p-4">{product?.quantity}</td>
                      <td className="p-4">{product?.min_stock_level}</td>
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
                          <Button
                            variant="gradient"
                            color="blue"
                            size="sm"
                            onClick={() => openHistoryModalHandler(product)}
                          >
                            View History
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabPanel>

          {/* Stock Balance Tab */}
          <TabPanel value="stock-balance">
            <StockBalance stockBalanceData={stockBalanceData} />
          </TabPanel>
        </TabsBody>
      </Tabs>

      {/* Modals */}
      {openStockOutModal && (
        <StockOutModal
          open={openStockOutModal}
          onClose={closeStockOutModalHandler}
          product={selectedProduct}
          onConfirm={closeStockOutModalHandler}
        />
      )}
      {openStockInModal && (
        <StockInModal
          open={openStockInModal}
          onClose={closeStockInModalHandler}
          product={selectedProduct}
          onConfirm={closeStockInModalHandler}
        />
      )}
      {openingStock && (
        <ProductStoreForm
          open={openingStock}
          store_id={params?.store_id}
          onClose={() => setOpeningStock(false)}
        ></ProductStoreForm>
      )}
      {openHistoryModal && (
        <StockHistoryModal
          open={openHistoryModal}
          onClose={closeHistoryModalHandler}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default StoreProducts;
