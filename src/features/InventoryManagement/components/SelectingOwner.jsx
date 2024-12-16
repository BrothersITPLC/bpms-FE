import Modal from "../../../components/Modal";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  BuildingStorefrontIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { formatFriendlyDate } from "../../../../helpers/formatingDateUserFreindly";
import { useGetOwnersQuery } from "../api/owner";
import { useNavigate } from "react-router-dom";

const SelectingOwner = ({ open, onSelected }) => {
  const { data: companies, refetch: refetchData } = useGetOwnersQuery();
  const navigate = useNavigate();
  return (
    <Modal open={open}>
      <div className="w-full h-[80vm] overflow-y-auto">
        <div className="flex flex-wrap gap-6 px-5">
          {companies?.map((company) => (
            <Card
              key={company.id}
              shadow={false}
              className="w-full max-w-[30rem] relative hover:cursor-pointer flex flex-col py-6 border  transition-shadow"
              onClick={() => {
                onSelected(company?.id);
              }}
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
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SelectingOwner;
