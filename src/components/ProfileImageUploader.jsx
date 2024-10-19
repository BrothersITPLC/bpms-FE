import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";

const ProfileImageUploader = ({ onImageChange, isSignup }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageChange(file); // Pass the file to parent component (UserInfo)
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageChange(null); // Remove the image from parent component
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-2 font-medium"
      >
        Profile Image
      </Typography>
      <div className="w-32 h-32 mb-4 relative">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <input
          type="file"
          accept="image/*"
          id="profileImageInput"
          className="hidden"
          onChange={handleImageUpload}
        />
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          onClick={() => document.getElementById("profileImageInput").click()}
        >
          {isSignup ? "Upload Image" : "CHANGE Profile PICTURE"}
        </Button>
        {selectedImage && (
          <Button
            variant="outlined"
            color="red"
            size="sm"
            onClick={handleRemoveImage}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
