import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Modal from "../../../components/Modal"; // Reusable modal
import Products from "./Products";
import AddProductForm from "./AddProductForm";
import { useCreateStoreMutation, useGetStoresQuery } from "../api/store";
import { useParams } from "react-router-dom";

const Store = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Enjera Bet",
      location: "Medhanealem",
      imgUrl: "https://docs.material-tailwind.com/img/team-3.jpg",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const params = useParams();

  const { data: Stores } = useGetStoresQuery();

  const [addStore] = useCreateStoreMutation();
  // Open "Products" modal
  const openProductsModal = (store) => {
    setSelectedStore(store);
    setOpenModal(true);
  };

  // Open "Add Product" modal
  const openAddProductModalHandler = () => {
    setOpenAddProductModal(true);
  };

  // Close "Add Product" modal
  const closeAddProductModalHandler = () => {
    setOpenAddProductModal(false);
  };

  // Handle adding a new product
  const handleAddProduct = (newProduct) => {
    console.log("Adding product to:", selectedStore?.name);
    console.log("New Product Details:", newProduct);
    closeAddProductModalHandler();
  };

  return (
    <div className="flex flex-wrap space-y-6">
      <div className="flex flex-wrap gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => openProductsModal(card)}
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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${selectedStore?.name} Products`}
        size="xxl"
      >
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="gradient"
              color="green"
              onClick={openAddProductModalHandler}
            >
              Add Product
            </Button>
          </div>
          {selectedStore && <Products store={selectedStore} />}
        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        open={openAddProductModal}
        onClose={closeAddProductModalHandler}
        title="Add Product"
        confirmText="Add Product"
        onConfirm={handleAddProduct}
      >
        <AddProductForm onSubmit={handleAddProduct} />
      </Modal>
    </div>
  );
};

export default Store;
