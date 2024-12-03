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
  CalendarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import {
  useCreateOwnerMutation,
  useGetOwnersQuery,
  useDeleteOwnerMutation,
} from "../api/owner";
import { useNavigate } from "react-router-dom";
import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";

const CompaniesStore = () => {
  const { data: companies, refetch: refetchData } = useGetOwnersQuery();
  const [deleteOwner] = useDeleteOwnerMutation();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const openEditModalHandler = (company) => {
    setSelectedCompany(company);
    setIsAdding(false);
    setOpenModal(true);
  };

  const openAddModalHandler = () => {
    setSelectedCompany(null);
    setIsAdding(true);
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setSelectedCompany(null);
    setOpenModal(false);
  };

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
      <div className="flex flex-wrap gap-6 px-5">
        {companies?.map((company) => (
          <Card
            key={company.id}
            shadow={false}
            className="w-full max-w-[30rem] relative hover:cursor-pointer flex flex-col py-6 border  transition-shadow"
            onClick={() => navigate(`/owner/${company?.id}/store`)}
          >
            <CardHeader
              floated={false}
              shadow={false}
              className="h-40 flex justify-center items-center "
            >
              <img
                src={company?.logo}
                alt={`${company?.name} Logo`}
                className="w-[10rem] h-full object-cover object-center rounded"
              />
            </CardHeader>
            <CardBody className="flex flex-col gap-4 px-6">
              <div className="flex flex-col gap-1">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {company?.name}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {company?.motto}
                </Typography>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <div className="flex items-center gap-2">
                  <BuildingStorefrontIcon className="h-5 w-5 text-primary1" />
                  <Typography variant="small">
                    {company?.store_count} Stores
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary1" />
                  <Typography variant="small">
                    {formatFriendlyDate(company?.created_at)}
                  </Typography>
                </div>
              </div>
            </CardBody>
            <div className="absolute top-4 right-4">
              <Menu>
                <MenuHandler>
                  <Button className="flex items-center p-2 shadow-none bg-white ">
                    <EllipsisVerticalIcon className="h-5 w-5 text-primary1" />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModalHandler(company);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCompanyHandler(company.id);
                    }}
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

      <OwnerForm
        ownerId={selectedCompany?.id}
        isAdding={isAdding}
        open={openModal}
        onConfirm={() => {
          refetchData();
          closeModalHandler();
        }}
        onClose={closeModalHandler}
      />
    </div>
  );
};

export default CompaniesStore;
