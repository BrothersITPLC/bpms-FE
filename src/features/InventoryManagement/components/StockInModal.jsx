import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const StockInModal = ({ open, onClose, onConfirm, product }) => {
  const [quantity, setQuantity] = useState("");

  const handleConfirm = () => {
    if (quantity) {
      onConfirm({ quantity });
      onClose();
    } else {
      alert("Please fill in the quantity.");
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogHeader>Stock In</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
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

export default StockInModal;
