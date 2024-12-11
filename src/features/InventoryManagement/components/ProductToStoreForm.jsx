import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useGetProduct_in_storeQuery,
  useAddProductStoreMutation,
  useGetProduct_in_owner_storeQuery,
} from "../api/product";
import { Textarea } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ProductStoreForm = ({
  store_id,
  open,
  onClose,
  onConfirm,
  product_id,
}) => {
  const { data: fetchedProduct, isLoading: isLoadingProduct } =
    useGetProductQuery(product_id, {
      skip: !product_id, // Skip fetching if no ownerId is provided
    });

  const [addProductStore] = useAddProductStoreMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    quantity: "",
    price: "",
    max_level: "",
    min_level: "",
  });

  const [openStock, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const navigate = useNavigate();
  const { data: products, refetch: refetchData } =
    useGetProduct_in_owner_storeQuery(store_id);

  // Load data into form when fetchedProduct is available

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for both adding and editing
  const handleSubmit = async () => {
    try {
      // if (isAdding) {
      await addProductStore({
        quantity: formData.quantity,
        min_stock_level: formData.min_level,
        store: store_id,
        product: selectedID,
        cost_price: formData.price,
      }).unwrap();
      refetchData();
      setOpen(false);
      toast.success("success");
      // onConfirm();
      // Notify parent component of successful submission
    } catch (error) {
      console.error("Error saving owner:", error);
      toast.error("error please try again");
    }
  };

  if (isLoadingProduct) {
    return (
      <Modal open={open} onClose={onClose} title="Loading...">
        <div>Loading Product details...</div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} onConfirm={handleSubmit} size="lg">
      <div className="w-full min-h-[15rem] bg-white shadow rounded-lg p-4">
        <ol className="flex items-center justify-center flex-wrap gap-4">
          {products?.map((product) => (
            <li
              key={product?.id}
              className="flex flex-col items-start gap-2 p-4 border rounded-lg bg-gray-50 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setOpen(true);
                setSelectedID(product?.id);
              }}
            >
              <span className="text-lg font-semibold text-gray-800">
                {product?.name}
              </span>
              <span className="text-sm text-gray-500">
                {product?.model_number}
              </span>
            </li>
          ))}
          {products?.length == 0 && (
            <div
              onClick={() => navigate("/products-table")}
              className="border-[3px] border-primary1/40 hover:border-primary1 cursor-pointer rounded max-auto border-dashed h-[10rem] w-[11rem]"
            >
              <div className="w-full flex items-center justify-center flex-col gap-3 px-3 py-2 h-full">
                <FaPlus className="text-3xl text-primary1"></FaPlus>

                <p className="text-sm ">
                  No Product Found in this Store Owner which is outside of this
                  store
                </p>
              </div>
            </div>
          )}
        </ol>
      </div>

      <Modal
        open={openStock}
        onClose={() => setOpen(false)}
        onConfirm={handleSubmit}
        size="lg"
      >
        <div className="space-y-4 flex flex-col gap-5">
          <Input
            label="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <Input
            label="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Input
            label="Min Quantity"
            name="min_level"
            value={formData.min_level}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
    </Modal>
  );
};

export default ProductStoreForm;
