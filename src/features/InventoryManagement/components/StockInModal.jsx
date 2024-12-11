import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { useCreateStockinMutation } from "../api/stockin";
import { toast } from "react-toastify";

const StockInModal = ({ open, onClose, onConfirm, product }) => {
  const [formData, setFormData] = useState({
    quantity: "",
    price: "",
    remark: "",
  });
  const [addStockin] = useCreateStockinMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    try {
      const data = await addStockin({
        product: product?.id,
        quantity: formData.quantity,
        remark: formData.remark,
      }).unwrap();

      toast.success("add successfully");
      onConfirm();
    } catch (error) {
      toast.error("the error ");
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogHeader>Stock In</DialogHeader>
      <DialogBody>
        <div className="space-y-4 ">
          <div>
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <Textarea
              label="Remark"
              name="remark"
              type="text"
              value={formData.remark}
              onChange={handleChange}
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
