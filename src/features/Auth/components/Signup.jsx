import React, { useState } from "react";

import {
  Input,
  Typography,
  Select,
  Option,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useCompleteProfileMutation } from "../apiSlice";
import { useNavigate, useLocation } from "react-router-dom";
const Signup = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [completeProfile, { isLoading, error }] = useCompleteProfileMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    gender: "",
    phone_number: "",
    email: "",
    vicinity: "",
    otp: "",
    token: token,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (!agreeTerms) {
      console.error("You must agree to the terms and conditions.");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      console.error("Passwords do not match.");
      return;
    }

    try {
      await completeProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirm_password,
        gender: formData.gender,
        phone_number: formData.phone_number,
        email: formData.email,
        vicinity: formData.vicinity,
        otp: formData.otp,
        token: formData.token,
      }).unwrap();

      console.log("Profile completed successfully.");
      navigate("/");
    } catch (err) {
      console.error("Error completing profile", err);
    }
  };
  return (
    <div className="flex justify-center w-full border-black-2">
      <section className="py-20 max-w-lg w-full">
        <Typography variant="h5" color="blue-gray">
          Basic Information
        </Typography>
        <Typography variant="small" className="text-gray-600 font-normal mt-1">
          Enter your profile information below.
        </Typography>
        <div className="flex flex-col w-fit mt-8">
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                First Name
              </Typography>
              <Input
                size="lg"
                placeholder="Abebe"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Last Name
              </Typography>
              <Input
                size="lg"
                placeholder="Kebede"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Gender{" "}
                </Typography>
                <Select
                  size="lg"
                  value={formData.gender}
                  onChange={(value) =>
                    handleChange({ target: { name: "gender", value } })
                  }
                  className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Username{" "}
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  labelProps={
                    {
                      // className: "hidden",
                    }
                  }
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Phone Number
                </Typography>
                <Input
                  size="lg"
                  placeholder="+251 910 111 213"
                  labelProps={
                    {
                      // className: "hidden",
                    }
                  }
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="name.father'sname@brothersitplc.com"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Password{" "}
              </Typography>
              <Input
                type="password"
                size="lg"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Confirm password{" "}
              </Typography>
              <Input
                type="password"
                size="lg"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Vicinity
              </Typography>
              <Input
                size="lg"
                placeholder="6-kilo, Gerji, Bole, etc... "
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                name="vicinity"
                value={formData.vicinity}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                OTP
              </Typography>
              <Input
                size="lg"
                placeholder="6-kilo, Gerji, Bole, etc... "
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-row gap-4 md:flex-row">
            <input
              type="checkbox"
              name="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label>
              I agree to the{" "}
              <a className="underline" href="#">
                Terms and Conditions
              </a>
            </label>
          </div>
          {error && (
            <Typography color="red" className="text-center mt-2">
              {error.data?.detail || "Error completing profile"}
            </Typography>
          )}
        </div>{" "}
        <div className="flex justify-start">
          <DialogFooter>
            <Button
              size="lg"
              variant="gradient"
              color="purple"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </Button>
          </DialogFooter>
        </div>
      </section>
    </div>
  );
};

export default Signup;
