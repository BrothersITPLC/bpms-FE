import React from "react";
import {
  Card,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import { useGetStockinQuery } from "../api/stockin";
import { useGetStockOutQuery } from "../api/stockout";

const StockHistoryModal = ({ open, onClose, product }) => {
  if (!product) return null;

  const stockInHistory = []; // Fetch stock-in history here
  const stockOutHistory = []; // Fetch stock-out history here
  const { data: stockins } = useGetStockinQuery(product?.id, {
    skip: !product?.id,
  });
  const { data: stockOuts } = useGetStockOutQuery(product?.id, {
    skip: !product?.id,
  });
  return (
    <Modal open={open} onClose={onClose} size="lg">
      <Card className="p-6" shadow={false}>
        <Typography variant="h5" color="blue-gray">
          Stock History for: {product?.model_number}
        </Typography>
        <Tabs value="stock-in" className="mt-4">
          <TabsHeader>
            <Tab value="stock-in">Stock-In History</Tab>
            <Tab value="stock-out">Stock-Out History</Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="stock-in">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b p-4">Date</th>
                    <th className="border-b p-4">Remark</th>
                    <th className="border-b p-4">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {stockins?.map((stockin, index) => (
                    <tr key={stockin?.id}>
                      <td className="p-4">{stockin.created_at}</td>
                      <td className="p-4">{stockin.remark}</td>
                      <td className="p-4">{stockin.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel value="stock-out">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b p-4">Date</th>
                    <th className="border-b p-4">Stocked Out To</th>
                    <th className="border-b p-4">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {stockOuts?.map((stockout, index) => (
                    <tr key={index}>
                      <td className="p-4">{stockout?.created_at}</td>
                      <td className="p-4">{stockout?.client_name}</td>
                      <td className="p-4">{stockout?.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </Card>
    </Modal>
  );
};

export default StockHistoryModal;
