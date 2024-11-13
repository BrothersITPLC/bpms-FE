import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const StockOutModal = ({ open, onClose, onConfirm, product }) => {
  const [stockOutTo, setStockOutTo] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleConfirm = () => {
    if (stockOutTo && quantity) {
      onConfirm({ stockOutTo, quantity });
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogHeader>Stock Out</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div>
            <Input
              label="Stock Out To"
              value={stockOutTo}
              onChange={(e) => setStockOutTo(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="purple" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default StockOutModal;
