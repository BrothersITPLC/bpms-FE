// BidsCard.js
import React from "react";
import { Card, Button } from "@material-tailwind/react";

const BidsCard = ({
  companyName,
  bidTitle,
  rfqNo,
  submissionDate,
  openingDate,
  bidSecurityAmount,
  bidSecurityValidity,
  buttonLabel = "View Details", // Default to "View Details" if no buttonLabel is provided
}) => {
  return (
    <Card className="p-4 w-72">
      <h5 className="font-semibold">{bidTitle}</h5>
      <p>Company: {companyName}</p>
      <p>RFQ No: {rfqNo}</p>
      <p>Submission Date: {submissionDate}</p>
      <p>Opening Date: {openingDate}</p>
      <p>Bid Security Amount: {bidSecurityAmount}</p>
      <p>Bid Security Validity: {bidSecurityValidity}</p>
      <Button className="mt-4 w-fit">{buttonLabel}</Button>
    </Card>
  );
};

export default BidsCard;
