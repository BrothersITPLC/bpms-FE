import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import Logo from "../../../assets/images/logo.png";

const Login = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <img src={LoginSVG} /> */}
      <Card
        shadow={false}
        className="md:px-24 md:py-14 py-8 border border-gray-300"
      >
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="!text-3xl lg:text-4xl"
          >
            <img
              src={Logo}
              alt="Brothers Logo"
              className="mx-auto size-28 text-center"
            />
          </Typography>
          <Typography className="!text-gray-600 text-[18px] font-bold md:max-w-sm">
            Please enter your credentials to login!
          </Typography>
        </CardHeader>
        <CardBody>
          <form action="#" className="flex flex-col gap-4 md:mt-8">
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Your Email
                </Typography>
              </label>

              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name.father'sname@brothersitplc.com"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              />
              <label htmlFor="password">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium my-2"
                >
                  Your Password
                </Typography>
              </label>
              <Input
                id="password"
                color="gray"
                size="lg"
                type="password"
                name="password"
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              />
            </div>
            <Button size="lg" className="bg-primary1">
              sign in
            </Button>

            <Typography
              variant="small"
              className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
            >
              Upon signing in, you consent to abide by our{" "}
              <a href="#" className="text-gray-900">
                Terms of Service
              </a>{" "}
              &{" "}
              <a href="#" className="text-gray-900">
                Privacy Policy.
              </a>
            </Typography>
          </form>
        </CardBody>
      </Card>{" "}
    </div>
  );
};
export default Login;
