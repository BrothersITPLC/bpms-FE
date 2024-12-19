import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Select,
  Option,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import ProfileImageUploader from "./ProfileImageUploader";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../features/Auth/apiSlice";
import { useSelector } from "react-redux";

const UserInfo = ({ isSignup }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    phone_number: "",
    email: "",
    vicinity: "",
  });

  const user = useSelector((state) => state.auth.user);
  const { data, error, isLoading } = useProfileQuery(user.id);
  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        username: data.username || "",
        gender: data.gender || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        vicinity: data.vicinity || "",
      });
      setProfileImage(data.image_url || null);
    }
  }, [data]);

  const handleImageChange = (file) => {
    setProfileImage(file); // Capture the File object
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        updatedData.append(key, value);
      });

      // Append profile image file if it exists
      if (profileImage instanceof File) {
        updatedData.append("profile_image", profileImage);
      }

      const response = await updateProfile({
        id: user.id,
        data: updatedData,
      }).unwrap();

      console.log("Profile updated successfully:", response);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div className="flex justify-center w-fit border-black-2 m-auto">
      <section className="max-w-lg w-full">
        <div className="flex flex-col w-fit mt-8">
          <ProfileImageUploader
            onImageChange={handleImageChange}
            isSignup={isSignup}
            imageUrl={profileImage}
          />

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
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
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
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          {/* Gender, Username, Phone Number */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Gender
              </Typography>
              <Select
                size="lg"
                name="gender"
                value={formData.gender}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
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
                Username
              </Typography>
              <Input
                size="lg"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
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
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          {/* Email and Vicinity */}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
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
                name="vicinity"
                value={formData.vicinity}
                onChange={handleChange}
                placeholder="Vicinity"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Password
              </Typography>
              <Input
                size="lg"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Confirm Password
              </Typography>
              <Input
                size="lg"
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          {/* Footer Button */}
          <div className="flex justify-start">
            {" "}
            <DialogFooter>
              <Button
                size="lg"
                variant="gradient"
                color="purple"
                onClick={handleSave}
                disabled={isUpdating}
              >
                <span>
                  {isSignup ? "SIGN UP" : isUpdating ? "SAVING..." : "SAVE"}
                </span>
              </Button>
            </DialogFooter>
          </div>
          {updateError && (
            <p className="text-red-500 mt-2">
              Error updating profile: {updateError.message}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
