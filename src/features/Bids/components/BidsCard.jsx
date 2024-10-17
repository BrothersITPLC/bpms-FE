import React from "react";
import Card from "../../../components/Card";
import Typography from "@material-tailwind/react/";

const BidsCard = ({
  companyName,
  bidTitle,
  rfqNo,
  submissionDate,
  openingDate,
  bidSecurityAmount,
  bidSecurityValidity,
}) => {
  const description = (
    <div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>Company Name:</strong> {companyName}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>Bid Title:</strong> {bidTitle}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>RFQ No.:</strong> {rfqNo}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>Submission Date:</strong> {submissionDate}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>Opening Date:</strong> {openingDate}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>Bid Security Amount:</strong> {bidSecurityAmount}
        </Typography>
      </div>
      <div className="mb-2">
        <Typography variant="small" color="blue-gray">
          <strong>Bid Security Validity Period:</strong> {bidSecurityValidity}
        </Typography>
      </div>
    </div>
  );

  return (
    <Card title={bidTitle || "Bid Information"} description={description} />
  );
};

export default BidsCard;
