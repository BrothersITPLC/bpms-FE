import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

const Store = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Enjera Bet",
      location: "Medhanealem",
      imgUrl: "https://docs.material-tailwind.com/img/team-3.jpg",
    },
  ]);

  // Navigate to ProductsPage
  const openProductsPage = (store) => {
    navigate(`/store-products`, { state: { store } });
  };

  return (
    <div className="flex-1 ml-64 p-6">
      <div className="flex flex-wrap gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => openProductsPage(card)}
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
    </div>
  );
};

export default Store;
