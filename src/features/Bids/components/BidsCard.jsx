import React from "react";
import Card from "../../../components/Card";
import { Typography, Button } from "@material-tailwind/react";

const BidsCard = ({
  companyName,
  bidTitle,
  rfqNo,
  submissionDate,
  openingDate,
  bidSecurityAmount,
  bidSecurityValidity,
}) => {
  const handleDetailsClick = () => {
    console.log("Details for:", bidTitle);
  };

  return (
    <Card
      title={bidTitle}
      description={
        <div className="overflow-wrap break-words w-72">
          <Typography color="gray" className="mb-1">
            Company Name: {companyName}
          </Typography>
          <Typography color="gray" className="mb-1">
            RFQ No: {rfqNo}
          </Typography>
          <Typography color="gray" className="mb-1">
            Submission Date: {submissionDate}
          </Typography>
          <Typography color="gray" className="mb-1">
            Opening Date: {openingDate}
          </Typography>
          <Typography color="gray" className="mb-1">
            Bid Security Amount: {bidSecurityAmount}
          </Typography>
          <Typography color="gray" className="mb-1">
            Bid Security Validity: {bidSecurityValidity}
          </Typography>
        </div>
      }
      customButton={
        <Button onClick={handleDetailsClick} size="lg" className="w-full">
          View Details
        </Button>
      }
    />
  );
};

export default BidsCard;
