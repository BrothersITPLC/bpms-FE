import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Modal = ({
  open,
  onClose,
  title,
  children,
  confirmText,
  onConfirm,
  size = "md", // Default to 'md' size
  showDelete,
  onConfirmDelete,
  onAddProduct, // New prop for Add Product button click handler
}) => {
  return (
    <Dialog open={open} handler={onClose} size={size}>
      <DialogHeader>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-semibold">{title}</h2>
          {onAddProduct && (
            <Button
              variant="gradient"
              color="green"
              onClick={onAddProduct}
              className="ml-4"
            >
              Add Product
            </Button>
          )}
        </div>
      </DialogHeader>
      <DialogBody className="overflow-y-auto max-h-[60vh]">
        {children}
      </DialogBody>
      <DialogFooter className={`flex ${showDelete ? "justify-between" : ""}`}>
        {showDelete && (
          <Button
            variant="gradient"
            color="red"
            onClick={onConfirmDelete}
            className="mr-1"
          >
            <span>Delete</span>
          </Button>
        )}
        <div className="justify-self-end">
          <Button
            variant="text"
            color="black"
            onClick={onClose}
            className="mx-4"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="purple" onClick={onConfirm}>
            <span>{confirmText}</span>
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default Modal;
