import { useState } from "react";

const AddProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productType: "",
    productModel: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      formData.productType &&
      formData.productModel &&
      formData.quantity &&
      formData.price
    ) {
      onSubmit(formData);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm">Product Type</label>
        <select
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Product Type</option>
          <option value="Router">Router</option>
          <option value="Switch">Switch</option>
          <option value="Patch Cord">Patch Cord</option>
          <option value="Firewall">Firewall</option>
          <option value="Server">Server</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Product Model</label>
        <select
          name="productModel"
          value={formData.productModel}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Product Model</option>
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
          <option value="Model C">Model C</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default AddProductForm;
