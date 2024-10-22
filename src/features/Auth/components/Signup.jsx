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
import Validation from "../../../components/Validation";

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

  const [touchedFields, setTouchedFields] = useState({}); // Track touched fields for validation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
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
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation
                value={formData.first_name}
                touched={touchedFields.first_name}
                validationType="letterOnly"
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
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation
                value={formData.last_name}
                touched={touchedFields.last_name}
                validationType="letterOnly"
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
                <Validation></Validation>
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
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
                <Validation
                  value={formData.username}
                  touched={touchedFields.username}
                  validationType="letterAndNumber"
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
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
                <Validation
                  value={formData.phone_number}
                  touched={touchedFields.phone_number}
                  validationType="symbolAndNumber"
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation
                value={formData.email}
                touched={touchedFields.email}
                validationType="email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation
                value={formData.password}
                touched={touchedFields.password}
                validationType="passwordComplex"
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
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation
                value={formData.confirm_password}
                touched={touchedFields.confirm_password}
                validationType="nonEmpty"
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
                name="vicinity"
                value={formData.vicinity}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation
                value={formData.vicinity}
                touched={touchedFields.vicinity}
                validationType="nonEmpty"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                OTP{" "}
              </Typography>
              <Input
                size="lg"
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Validation />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <Typography variant="small" className="font-medium">
              I agree to the terms and conditions
            </Typography>
          </div>
          <DialogFooter className="mt-8">
            <Button
              variant="gradient"
              color="green"
              fullWidth
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Signup"}
            </Button>
            {error && (
              <Typography color="red" className="mt-4 text-center">
                Error: {error.message}
              </Typography>
            )}
          </DialogFooter>
        </div>
      </section>
    </div>
  );
};

export default Signup;
