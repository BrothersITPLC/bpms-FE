import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useCreateOwnerMutation } from "../api/owner";

const OwnerForm = ({ initialData, isAdding, onConfirm, onClose }) => {
  const [formData, setFormData] = useState(
    initialData || { name: "", motto: "", logo: "" }
  );
  const [image, setImage] = useState(null);
  const [addOwner] = useCreateOwnerMutation();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          logo: reader.result, // Base64 string for image preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const formD = new FormData();
    formD.append("name", formData.name);
    formD.append("motto", formData.motto);
    if (image) formD.append("logo", image);

    onConfirm(formD); // Pass the form data to parent component's confirm handler
  };

  return (
    <div className="space-y-4">
      <Input
        label="Company Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <Input
        label="Motto"
        name="motto"
        value={formData.motto}
        onChange={handleInputChange}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Logo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="mt-2"
        />
        {formData.logo && (
          <img
            src={formData.logo}
            alt="Logo Preview"
            className="mt-4 w-24 h-24 rounded-full"
          />
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outlined" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-primary1">
          {isAdding ? "Add Company" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default OwnerForm;
