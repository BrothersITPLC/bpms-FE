import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal";
import OwnerForm from "./OwnerForm";
import {
  BuildingOfficeIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import {
  useCreateOwnerMutation,
  useGetOwnersQuery,
  useDeleteOwnerMutation,
} from "../api/owner";

const CompaniesStore = () => {
  const { data: companies, refetch: refetchData } = useGetOwnersQuery();
  const [deleteOwner] = useDeleteOwnerMutation();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Open modal for editing
  const openEditModalHandler = (company) => {
    setSelectedCompany(company);
    setIsAdding(false);
    setOpenModal(true);
  };

  // Open modal for adding
  const openAddModalHandler = () => {
    setSelectedCompany(null);
    setIsAdding(true);
    setOpenModal(true);
  };

  // Close modal
  const closeModalHandler = () => {
    setSelectedCompany(null);
    setOpenModal(false);
  };

  // Add new company
  const addCompanyHandler = async (formD) => {
    await addOwner(formD).unwrap();
    refetchData();
    closeModalHandler();
  };

  // Save changes to the company
  const saveChangesHandler = async (formD) => {
    // Logic to update company goes here
    refetchData(); // Refetch data after updating
    closeModalHandler();
  };

  // Delete company
  const deleteCompanyHandler = async (companyId) => {
    await deleteOwner(companyId).unwrap();
    refetchData();
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center p-4">
        <Typography className="text-2xl font-bold">Companies</Typography>
        <Button
          className="flex bg-primary1 items-center gap-3"
          size="sm"
          onClick={openAddModalHandler}
        >
          <BuildingOfficeIcon strokeWidth={2} className="h-4 w-4" />
          Add Company
        </Button>
      </div>
      <div className="flex flex-wrap gap-6">
        {companies?.map((company) => (
          <Card key={company.id} className="w-80 relative">
            <CardHeader
              floated={false}
              shadow={false}
              className="h-40 flex justify-center items-center bg-gray-100"
            >
              <img
                src={company?.logo}
                alt={`${company?.name} Logo`}
                className="w-24 h-24 rounded-full"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {company?.name}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                {company?.motto}
              </Typography>
            </CardBody>
            <div className="absolute top-4 right-4">
              <Menu>
                <MenuHandler>
                  <Button className="flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => openEditModalHandler(company)}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => deleteCompanyHandler(company.id)}
                    className="text-red-600"
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for adding/editing company */}
      <Modal
        open={openModal}
        onClose={closeModalHandler}
        title={isAdding ? "Add Company" : "Edit Company Details"}
      >
        <OwnerForm
          initialData={selectedCompany}
          isAdding={isAdding}
          onConfirm={isAdding ? addCompanyHandler : saveChangesHandler}
          onClose={closeModalHandler}
        />
      </Modal>
    </div>
  );
};

export default CompaniesStore;
