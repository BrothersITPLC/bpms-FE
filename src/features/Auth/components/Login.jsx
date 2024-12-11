import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useLoginUserMutation } from "../apiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../authSlice";
import Logo from "../../../assets/images/logo.png";

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log("User data:", user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      await loginUser(credentials).unwrap();
      navigate("/analytics");
    } catch (err) {
      console.error("Error in login:", err);
      setApiError(err?.data?.detail || "Login failed. Please try again.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
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
          <form onSubmit={handleLogin} className="flex flex-col gap-4 md:mt-8">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-primary1"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            {apiError && (
              <Typography
                variant="small"
                className="text-center text-red-500 mt-2"
              >
                {apiError}
              </Typography>
            )}
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
      </Card>
    </div>
  );
};

export default Login;
