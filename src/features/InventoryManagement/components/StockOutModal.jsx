import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useGetClientQuery } from "../../Clients/clientApi";
import { Textarea } from "@material-tailwind/react";
import { useCreateStockOutMutation } from "../api/stockout";
import { toast } from "react-toastify";

const StockOutModal = ({ open, onClose, onConfirm, product }) => {
  const [formData, setFormData] = useState({
    quantity: "",
    client: "",
    remark: "",
  });
  const [quantity, setQuantity] = useState("");
  const [createStockOut] = useCreateStockOutMutation();
  const { data: clients } = useGetClientQuery({ search: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    try {
      await createStockOut({
        client: formData?.client,
        quantity: formData?.quantity,
        remark: formData?.remark,
        product: product?.id,
      }).unwrap();
      toast.success("stockedout successfully");
      onConfirm();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogHeader>Stock Out</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div className="w-full flex gap-2 flex-col">
            <label>StockOut in to</label>
            <select
              className="w-full h-[3rem] rounded border"
              value={formData?.client}
              onChange={handleChange}
              name="client"
            >
              <option value="" disabled>
                Select Client
              </option>
              {clients?.map((client) => (
                <option key={client?.id} value={client?.id}>
                  {client?.name}
                </option>
              ))}
            </select>
          </div>
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
              type="text"
              name="remark"
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

export default StockOutModal;
