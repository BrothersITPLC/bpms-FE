import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";

const ProfileImageUploader = ({ onImageChange, isSignup, imageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  }, [imageUrl]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // For local preview
      setSelectedImage(imageUrl);
      onImageChange(file); // Pass the File object to parent
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageChange(null);
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
          {isSignup ? "Upload Image" : "Change Profile Picture"}
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
