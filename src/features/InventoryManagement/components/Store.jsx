import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
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

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // Function to open the modal and set the selected store
  const openAddCardModal = (store) => {
    setSelectedStore(store);
    setOpenModal(true);
  };

  // Function to close the modal
  const closeAddCardModal = () => {
    setOpenModal(false);
    setSelectedStore(null);
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
                {/* <img src={card.imgUrl} alt="location-picture" /> */}
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

      {/* Reusable Modal with 'xl' size */}
      <Modal
        open={openModal}
        onClose={closeAddCardModal}
        title={`${selectedStore?.name} Products`}
        confirmText="Close"
        onConfirm={closeAddCardModal} // Close modal on confirm button click
        size="xxl" // Set the modal size to 'xl'
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
