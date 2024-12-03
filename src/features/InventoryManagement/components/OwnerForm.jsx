import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import {
  useCreateOwnerMutation,
  useGetOwnerQuery,
  useUpdateOwnerMutation,
} from "../api/owner";

const OwnerForm = ({ ownerId, isAdding, open, onClose, onConfirm }) => {
  const { data: fetchedOwner, isLoading: isLoadingOwner } = useGetOwnerQuery(
    ownerId,
    {
      skip: !ownerId, // Skip fetching if no ownerId is provided
    }
  );

  const [addOwner] = useCreateOwnerMutation();
  const [updateOwner] = useUpdateOwnerMutation();
  const [formData, setFormData] = useState({ name: "", motto: "", logo: "" });
  const [image, setImage] = useState(null);

  // Load data into form when fetchedOwner is available
  useEffect(() => {
    if (fetchedOwner && !isAdding) {
      setFormData({
        name: fetchedOwner.name || "",
        motto: fetchedOwner.motto || "",
        logo: fetchedOwner.logo || "",
      });
    }
  }, [fetchedOwner, isAdding]);

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

  // Handle form submission for both adding and editing
  const handleSubmit = async () => {
    const formD = new FormData();
    formD.append("name", formData.name);
    formD.append("motto", formData.motto);
    if (image) formD.append("logo", image);

    try {
      if (isAdding) {
        await addOwner(formD).unwrap();
      } else {
        await updateOwner({ id: ownerId, data: formD }).unwrap();
      }
      onConfirm(); // Notify parent component of successful submission
    } catch (error) {
      console.error("Error saving owner:", error);
    }
  };

  if (!isAdding && isLoadingOwner) {
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
      title={isAdding ? "Add Company" : "Edit Company Details"}
    >
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
      </div>
    </Modal>
  );
};

export default OwnerForm;
