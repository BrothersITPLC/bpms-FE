import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { FaEllipsisV, FaStore, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../../components/Modal";
import {
  useCreateStoreMutation,
  useGetStoresQuery,
  useDeleteStoreMutation,
  useUpdateStoreMutation,
} from "../api/store";
import { useParams } from "react-router-dom";

const Store = () => {
  const [formData, setFormData] = useState({ name: "", address: "" });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const params = useParams();

  const { data: stores, refetch } = useGetStoresQuery(params?.owner_id, {
    skip: params?.owner_id == null,
  });
  const [addStore] = useCreateStoreMutation();
  const [deleteStore] = useDeleteStoreMutation();
  const [updateStore] = useUpdateStoreMutation();
  const navigate = useNavigate();
  const openAddModalHandler = () => {
    setOpenAddModal(true);
    setFormData({ name: "", address: "" });
  };

  const openEditModalHandler = (store) => {
    setSelectedStore(store);
    setFormData({ name: store.name, address: store.location });
    setOpenEditModal(true);
  };

  const closeAddModalHandler = () => setOpenAddModal(false);
  const closeEditModalHandler = () => setOpenEditModal(false);

  const handleAddStore = async () => {
    try {
      await addStore({
        name: formData.name,
        location: formData.address,
        owner: params?.owner_id,
      }).unwrap();
      closeAddModalHandler();
      refetch();
    } catch (error) {
      console.error("Failed to add store:", error);
    }
  };

  const handleUpdateStore = async () => {
    try {
      await updateStore({
        id: selectedStore.id,
        name: formData.name,
        location: formData.address,
        owner: params?.owner_id,
      }).unwrap();
      closeEditModalHandler();
      refetch();
    } catch (error) {
      console.error("Failed to update store:", error);
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      await deleteStore({ id: storeId, owner: params?.owner_id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  return (
    <div className="flex flex-col w-full px-8 py-9 space-y-6">
      <div className="flex w-full justify-end">
        <Button
          variant="gradient"
          color="blue"
          onClick={openAddModalHandler}
          className="rounded-full px-6 py-3 text-lg  transition-transform transform "
        >
          Add Store
        </Button>
      </div>

      <div className="flex flex-wrap gap-6 px-10">
        {stores?.map((store) => (
          <div
            key={store?.id}
            className="relative w-96 transition-transform transform"
            onClick={() => navigate(`/store/${store?.id}/products`)}
          >
            <Card
              className="w-full border hover:border hover:border-primary1  duration-300  transition-all "
              shadow={false}
            >
              <div className="absolute z-10 top-4 right-4">
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === store.id ? null : store.id)
                  }
                >
                  <FaEllipsisV className="text-lg" />
                </IconButton>
                {dropdownOpen === store.id && (
                  <div className="absolute right-0 z-10 w-40 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={() => openEditModalHandler(store)}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-blue-100"
                    >
                      <FaEdit className="mr-2 text-blue-500" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStore(store.id)}
                      className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>

              <CardHeader floated={false} shadow={false} className=" py-7 ">
                <FaStore className="p-8  w-[20rem] h-[10rem] text-6xl mx-auto" />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" className="mb-2">
                  {store.name}
                </Typography>
                <Typography className="font-medium text-gray-600">
                  {store.location}
                </Typography>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <Modal
        open={openAddModal}
        onClose={closeAddModalHandler}
        title="Add Store"
        confirmText="Add Store"
        onConfirm={handleAddStore}
        className="transition-transform transform hover:scale-105"
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Store Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            label="Store Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </form>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={closeEditModalHandler}
        title="Edit Store"
        confirmText="Update Store"
        onConfirm={handleUpdateStore}
        className="transition-transform transform hover:scale-105"
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Store Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            label="Store Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </form>
      </Modal>
    </div>
  );
};

export default Store;
