import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Modal from "../../../components/Modal"; // Import the reusable modal
import Products from "./Products"; // Assuming this is your products table component

const Store = () => {
  // State to store cards data
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Enjera Bet",
      location: "Medhanealem",
      imgUrl: "https://docs.material-tailwind.com/img/team-3.jpg",
    },
  ]);

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [openAddStoreModal, setOpenAddStoreModal] = useState(false);

  // New store state
  const [newStore, setNewStore] = useState({
    name: "",
    location: "",
    imgUrl: "",
  });

  // Function to open the store details modal
  const openAddCardModal = (store) => {
    setSelectedStore(store);
    setOpenModal(true);
  };

  // Function to open the "Add Store" modal
  const openAddStoreModalHandler = () => {
    setOpenAddStoreModal(true);
  };

  // Function to close the "Add Store" modal
  const closeAddStoreModal = () => {
    setOpenAddStoreModal(false);
    setNewStore({ name: "", location: "", imgUrl: "" }); // Reset fields
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  // Handle adding the new store
  const handleAddStore = () => {
    const newCard = {
      ...newStore,
      id: cards.length + 1, // Increment the ID based on the existing cards
    };
    setCards([...cards, newCard]); // Add the new store to the cards state
    closeAddStoreModal(); // Close the modal after adding the store
  };

  // Function to handle "Add Product" button click
  const handleAddProduct = () => {
    console.log("Add Product clicked for store:", selectedStore?.name);
    // Implement your add product functionality here
  };

  return (
    <div className="flex flex-wrap space-y-6">
      <div className="flex flex-wrap gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => openAddCardModal(card)} // Make the card clickable
            className="cursor-pointer w-96 h-fit"
          >
            <Card className="w-full h-full">
              <CardHeader floated={false} className="h-80">
                <BuildingStorefrontIcon className="p-8" />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {card.name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {card.location}
                </Typography>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          color="purple"
          variant="gradient"
          onClick={openAddStoreModalHandler}
        >
          Add Store
        </Button>
      </div>

      {/* Modal for adding a new store */}
      <Modal
        open={openAddStoreModal}
        onClose={closeAddStoreModal}
        title="Add New Store"
        confirmText="Add Store"
        onConfirm={handleAddStore}
        size="md" // Adjust the modal size as needed
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm">Store Name</label>
            <input
              type="text"
              name="name"
              value={newStore.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter store name"
            />
          </div>
          <div>
            <label className="block text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={newStore.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter store location"
            />
          </div>
          {/* <div>
            <label className="block text-sm">Image URL (Optional)</label>
            <input
              type="text"
              name="imgUrl"
              value={newStore.imgUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter image URL"
            />
          </div> */}
        </div>
      </Modal>

      {/* Reusable Modal for Store Products */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${selectedStore?.name} Products`}
        confirmText="Close"
        onConfirm={() => setOpenModal(false)}
        size="xxl"
        onAddProduct={handleAddProduct} // Pass the handleAddProduct function
      >
        <div className="space-y-4">
          {/* Render Products Table inside the modal */}
          {selectedStore && <Products store={selectedStore} />}
        </div>
      </Modal>
    </div>
  );
};

export default Store;
