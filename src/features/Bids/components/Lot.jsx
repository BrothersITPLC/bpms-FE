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
import {
  useAddRFPMutation,
  useDeleteRFPMutation,
  useUpdateRFPMutation,
  useGetRFPQuery,
  useGetDetailRFPQuery,
  useGetLottQuery,
  useAddLottMutation,
  useDeleteLottMutation,
  useGetDetailLotQuery,
  useUpdateLottMutation,
} from "../bidApi";

import { useGetClientQuery } from "../../Clients/clientApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CusstomSpinner from "../../../components/Spinner";
import { useParams } from "react-router-dom";
import LotCard from "./LotCard";
import { formatDateForDatetimeLocal } from "../../../../helpers/formateDateLocal";

const Lott = () => {
  const [activeTab, setActiveTab] = useState("floated_bids");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRFP, setSelectedRFP] = useState(null);

  const [selectedID, setSelectedID] = useState(null);
  const [addRFP] = useAddLottMutation();
  const [updateLot] = useUpdateLottMutation();
  const [deleteRFP] = useDeleteRFPMutation();

  const params = useParams();
  const { data: detailLot, isLoading: detailLoading } = useGetDetailLotQuery(
    selectedID,
    {
      skip: selectedID === null,
    }
  );

  const { data: lots, refetch: refetchRFP } = useGetLottQuery(params?.id, {
    skip: params?.id == null,
  });
  const [formData, setFormData] = useState({
    lot_number: "",
    name: "",
    rfp: "",
    security_price: "",
    validity_duration: "",
    opening_date: "",
    submission_date: "",
    price: "",
  });

  const openModal = (title, fields, rfp = null) => {
    setModalTitle(title);
    setFormData({
      lot_number: "",
      name: "",
      rfp: "",
      security_price: "",
      validity_duration: "",
      opening_date: "",
      submission_date: "",
      price: "",
    });
    setIsEditing(false);
    setSelectedID(null);
    setModalOpen(true);
  };

  useEffect(() => {
    if (selectedID && detailLot?.id) {
      setFormData({
        price: detailLot?.price,
        name: detailLot?.name,
        lot_number: detailLot?.lot_number,
        rfp: detailLot?.rfp,
        security_price: detailLot?.security_price,
        validity_duration: Date.now(detailLot?.validity_duration),
        opening_date: detailLot?.opening_date,
        submission_date: detailLot?.submission_date,
      });
    }
  }, [selectedID, detailLot]);
  const [deleteLott] = useDeleteLottMutation();
  // deleteLott();

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setSelectedRFP(null);
  };

  const handleConfirm = async () => {
    try {
      if (isEditing && selectedID) {
        await updateLot({ id: selectedID, data: formData }).unwrap();
        toast.success("Updated Successfully");
      } else {
        await addRFP({ ...formData, rfp: params?.id }).unwrap();
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
        await deleteLott(id).unwrap();
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
    <div className="w-full flex-1   py-[2rem] ">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="fixed w-full flex justify-end  top-[1rem] right-[4.3rem]">
          {" "}
          <Button
            onClick={() => openModal("Create RFP")}
            className="bg-primary1 w-[10rem] h-[3rem]"
          >
            Create Lot
          </Button>{" "}
        </div>
      </div>

      <div className=" grid  grid-cols-2 w-full gap-5 max-h-[calc(100vh-20rem)] pb-40 overflow-y-auto  flex-wrap py-[2rem]">
        {lots?.map((rfp) => (
          <div key={rfp.id} className=" gap-4 flex flex-wrap">
            <LotCard
              id={rfp?.id}
              name={rfp.name}
              price={rfp.price}
              lot_number={rfp.lot_number}
              opening_date={rfp.opening_date}
              created_by={rfp.created_by}
              validity_date={rfp?.validity_duration}
              security_price={rfp?.security_price}
              submission_date={rfp?.submission_date}
              onDelete={handleDelete}
              onEdit={handleEdit}
              assigned_users={rfp?.assigned_users}
            />
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Edit Lot" : "Add Lot"}
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
            <Input
              label="Lot Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Lot Number"
              name="lot_number"
              value={formData.lot_number}
              onChange={handleChange}
              required
            />
            <Input
              label="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              label="security price"
              name="security_price"
              type="number"
              value={formData.security_price}
              onChange={handleChange}
              required
            />

            <Input
              label="validity_duration"
              name="validity_duration"
              type="datetime-local"
              value={formatDateForDatetimeLocal(formData.validity_duration)}
              onChange={handleChange}
              required
            />
            <Input
              label="submission_date"
              name="submission_date"
              type="datetime-local"
              value={formatDateForDatetimeLocal(formData.submission_date)}
              onChange={handleChange}
              required
            />
            <Input
              label="opening_date"
              name="opening_date"
              type="datetime-local"
              value={formatDateForDatetimeLocal(formData.opening_date)}
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

export default Lott;
