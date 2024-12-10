import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} from "../api/product";
import { Textarea } from "@material-tailwind/react";

const ProductStoreForm = ({
  ownerId,
  isAdding,
  open,
  onClose,
  onConfirm,
  product_id,
}) => {
  const { data: fetchedProduct, isLoading: isLoadingProduct } =
    useGetProductQuery(product_id, {
      skip: !product_id, // Skip fetching if no ownerId is provided
    });

  const [addProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    model_number: "",
    description: "",
    category: "",
    owner: ownerId,
    unit: "pcs",
  });

  const { data: categories } = useGetCategoriesQuery();

  // Load data into form when fetchedProduct is available
  useEffect(() => {
    if (fetchedProduct && !isAdding) {
      setFormData({
        name: fetchedProduct.name || "",
        model_number: fetchedProduct.model_number || "",
        description: fetchedProduct.description || "",
        category: fetchedProduct.category || "",
        owner: ownerId,
        unit: "pcs",
      });
    } else {
      setFormData({
        name: "",
        model_number: "",
        description: "",
        category: "",
        owner: ownerId,
        unit: "pcs",
      });
    }
  }, [fetchedProduct, isAdding, ownerId]);

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
      if (isAdding) {
        await addProduct(formData).unwrap();
      } else {
        await updateProduct({ id: ownerId, data: formData }).unwrap();
      }
      onConfirm(); // Notify parent component of successful submission
    } catch (error) {
      console.error("Error saving owner:", error);
    }
  };

  if (!isAdding && isLoadingProduct) {
    return (
      <Modal open={open} onClose={onClose} title="Loading...">
        <div>Loading owner details...</div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      size="xl"
      title={isAdding ? "Add Product" : "Edit Product Details"}
    >
      <div className="space-y-4 flex flex-row gap-5">
        <div className="flex flex-col gap-2">
          <label>Category</label>
          <select
            className="w-full h-[3rem] border rounded"
            value={formData.category}
            name="category"
            onChange={handleInputChange}
          >
            {" "}
            <option key="" value="" disabled>
              select Category
            </option>
            {categories?.map((category) => {
              return (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              );
            })}
          </select>
        </div>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="model_number"
          name="model_number"
          value={formData.model_number}
          onChange={handleInputChange}
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default ProductStoreForm;
