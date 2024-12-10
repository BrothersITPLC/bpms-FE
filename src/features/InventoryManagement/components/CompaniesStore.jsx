import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import logoImage from "../../../assets/images/logo.png";
import nhyLogo from "../../../assets/images/nhy.png"; // Import the static logo
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

const CompaniesStore = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Brothers IT PLC",
      motto: "Expanding success!",
      logo: logoImage, // Use the imported static logo
    },
    {
      id: 2,
      name: "NHY Trading",
      motto: "Sustainability First",
      logo: nhyLogo, // Reuse the same logo or provide a different one if needed
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    motto: "",
    logo: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  // Open modal for editing
  const openEditModalHandler = (company) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      motto: company.motto,
      logo: company.logo,
    });
    setIsAdding(false);
    setOpenModal(true);
  };

  // Open modal for adding
  const openAddModalHandler = () => {
    setFormData({ name: "", motto: "", logo: "" });
    setSelectedCompany(null);
    setIsAdding(true);
    setOpenModal(true);
  };

  // Close modal
  const closeModalHandler = () => {
    setSelectedCompany(null);
    setFormData({ name: "", motto: "", logo: "" });
    setOpenModal(false);
  };

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

  // Save changes to the company
  const saveChangesHandler = () => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === selectedCompany.id
          ? { ...company, ...formData }
          : company
      )
    );
    closeModalHandler();
  };

  // Add new company
  const addCompanyHandler = () => {
    setCompanies((prevCompanies) => [
      ...prevCompanies,
      { ...formData, id: Date.now() },
    ]);
    closeModalHandler();
  };

  return (
    <div className="flex-1 ml-64 p-6">
      <div className="flex justify-between items-center p-4">
        <Typography className="text-2xl font-bold">Companies</Typography>
        <Button
          className="flex bg-primary1 items-center gap-3"
          size="sm"
          onClick={openAddModalHandler} // Opens modal for adding a new company
        >
          <BuildingOfficeIcon strokeWidth={2} className="h-4 w-4" />
          Add Company
        </Button>
      </div>
      <div className="flex flex-wrap gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            className="w-80 cursor-pointer hover:shadow-lg"
            onClick={() => openEditModalHandler(company)}
          >
            <CardHeader
              floated={false}
              className="h-40 flex justify-center items-center bg-gray-100"
            >
              <img
                src={company.logo}
                alt={`${company.name} Logo`}
                className="w-24 h-24 rounded-full"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {company.name}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                {company.motto}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal for editing or adding company details */}
      <Modal
        open={openModal}
        onClose={closeModalHandler}
        title={isAdding ? "Add Company" : "Edit Company Details"}
        confirmText={isAdding ? "Add" : "Save"}
        onConfirm={isAdding ? addCompanyHandler : saveChangesHandler}
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
    </div>
  );
};

export default CompaniesStore;
