import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
  Input,
  Select,
  Option,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { formSchema } from "./validationSchema";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import Card from "../../../components/Card";
import Modal from "../../../components/Modal";
import BidsCard from "./BidsCard";
import DatePicker from "../../../components/DatePicker";
import { Outlet } from "react-router-dom";
import {
  useAddRFPMutation,
  useDeleteRFPMutation,
  useUpdateRFPMutation,
  useGetRFPQuery,
  useGetDetailRFPQuery,
} from "../bidApi";

import { useGetCompanyQuery } from "../../Companies/companyApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CusstomSpinner from "../../../components/Spinner";
import { useParams } from "react-router-dom";

const Bids = () => {
  const [activeTab, setActiveTab] = useState("floated_bids");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRFP, setSelectedRFP] = useState(null);
  const { data: rfps, refetch: refetchRFP } = useGetRFPQuery();
  const [selectedID, setSelectedID] = useState(null);
  const [addRFP] = useAddRFPMutation();
  const [updateRFP] = useUpdateRFPMutation();
  const [deleteRFP] = useDeleteRFPMutation();

  const { data: clients } = useGetCompanyQuery({ search: "" });
  const { data: RFPDetail, isLoading: detailLoading } = useGetDetailRFPQuery(
    selectedID,
    {
      skip: selectedID === null,
    }
  );
  const [formData, setFormData] = useState({
    client: "",
    name: "",
    rfp_number: "",
    url: "",
  });

  const openModal = (title, fields, rfp = null) => {
    setModalTitle(title);
    setFormData({ client: "", name: "", rfp_number: "", url: "" });
    setIsEditing(false);
    setSelectedID(null);
    setModalOpen(true);
  };

  useEffect(() => {
    if (selectedID && RFPDetail?.id) {
      setFormData({
        client: RFPDetail?.client,
        name: RFPDetail?.name,
        rfp_number: RFPDetail?.rfp_number,
        url: RFPDetail?.url,
      });
    }
  }, [selectedID, RFPDetail]);

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setSelectedRFP(null);
  };
  const params = useParams();

  const handleConfirm = async () => {
    try {
      if (isEditing && selectedID) {
        await updateRFP({ id: selectedID, data: formData }).unwrap();
        toast.success("Updated Successfully");
      } else {
        await addRFP(formData).unwrap();
        toast.success("Added Successfully");
      }
      closeModal();
      refetchRFP();
    } catch (error) {
      toast.error("Error, please try again");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this RFP?")) {
      try {
        await deleteRFP(id).unwrap();
        toast.success("Deleted Successfully");
        refetchRFP();
      } catch (error) {
        toast.error("Failed to delete. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (id) => {
    setSelectedID(id);
    setModalOpen(true);
    setIsEditing(true);
  };

  return (
    <div className="w-1/2 flex-1 m-4 px-9 py-[2rem]">
      <div className="flex flex-row gap-5">
        <div className="flex gap-5  h-[80vh]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between border-b border-primary1/10 pb-3 w-full items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Bids
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  You can view the statuses of different bids and propose
                  purchases.
                </Typography>
              </div>
              <Button
                onClick={() => openModal("Create RFP")}
                className="bg-primary1 w-[10rem] h-[3rem]"
              >
                Create RFP
              </Button>
            </div>
            <div className="md:w-full flex flex-col   gap-5 max-h-[calc(100vh-10rem)] overflow-y-auto px-3  py-[2rem]">
              {rfps?.map((rfp) => (
                <div key={rfp.id} className=" gap-4 flex flex-wrap">
                  <BidsCard
                    id={rfp?.id}
                    is_active={params?.id == rfp?.id}
                    companyName={rfp.client_name}
                    bidTitle={rfp.name}
                    rfqNo={rfp.rfp_number}
                    url={rfp.url}
                    created_by={rfp.created_by}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-[0.15rem] rounded-full  h-full bg-primary1"></div>
        </div>
        <Outlet />
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Edit RFP" : "Add RFP"}
        confirmText={isEditing ? "Update" : "Submit"}
        onConfirm={handleConfirm}
        size="md"
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            className="flex flex-col space-y-6 w-full mx-auto p-6 bg-white rounded-lg"
          >
            <Select
              label="Client"
              name="client"
              onChange={(value) => setFormData({ ...formData, client: value })}
              value={formData.client}
              className="mt-4"
              required
            >
              {clients?.map((client) => (
                <Option key={client.id} value={client.id}>
                  {client.name}
                </Option>
              ))}
            </Select>

            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="RFP Number"
              name="rfp_number"
              value={formData.rfp_number}
              onChange={handleChange}
              required
            />

            <Input
              label="URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </form>
        </div>
      </Modal>
      {detailLoading && <CusstomSpinner></CusstomSpinner>}
    </div>
  );
};

export default Bids;
