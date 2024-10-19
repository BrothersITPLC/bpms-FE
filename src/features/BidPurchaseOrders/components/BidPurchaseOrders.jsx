import React from "react";
import BidsCard from "../../Bids/components/BidsCard";
import { Typography, Card } from "@material-tailwind/react";
import Sidebar from "../../../components/Sidebar";

const BidPurchaseOrders = () => {
  const data = [
    {
      label: "Active Orders",
      value: "active_orders",
      cardTitle: "Active Orders",
      cardDescription:
        "Please complete the purchase for the following purchase requests",
    },
    {
      label: "Purchased Bids",
      value: "purchased_bids",
      cardTitle: "Purchased Bids",
      cardDescription:
        "These are the bids that have been successfully purchased.",
    },
    {
      label: "Past Bids",
      value: "past_bids",
      cardTitle: "Past Bids",
      cardDescription: "These are the bids that have been closed.",
    },
  ];

  // Sample bids data for active orders section
  const sampleBids = [
    {
      companyName: "Company ABC",
      bidTitle: "Bid for Office Supplies",
      rfqNo: "RFQ-12345",
      submissionDate: "2024-11-05",
      openingDate: "2024-11-10",
      bidSecurityAmount: "$10,000",
      bidSecurityValidity: "30 days",
    },
    {
      companyName: "Company XYZ",
      bidTitle: "Bid for IT Equipment",
      rfqNo: "RFQ-12346",
      submissionDate: "2024-11-05",
      openingDate: "2024-11-10",
      bidSecurityAmount: "$20,000",
      bidSecurityValidity: "30 days",
    },
    {
      companyName: "Company PLC",
      bidTitle: "Windows License",
      rfqNo: "RFQ-12347",
      submissionDate: "2024-11-05",
      openingDate: "2024-11-10",
      bidSecurityAmount: "$10,000",
      bidSecurityValidity: "30 days",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-1/2 flex-1 m-4">
        <Typography variant="h5" color="blue-gray">
          Bid Purchase Orders
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Here are the sample bid purchase orders.
        </Typography>

        {/* Render Active Orders */}
        <div className="mt-10">
          <Card
            title={data[0].cardTitle}
            description={data[0].cardDescription}
          />
          <div className="w-full gap-4 flex flex-wrap mt-4">
            {sampleBids.map((bid, index) => (
              <BidsCard
                key={index}
                companyName={bid.companyName}
                bidTitle={bid.bidTitle}
                rfqNo={bid.rfqNo}
                submissionDate={bid.submissionDate}
                openingDate={bid.openingDate}
                bidSecurityAmount={bid.bidSecurityAmount}
                bidSecurityValidity={bid.bidSecurityValidity}
                buttonLabel="Purchased" // This changes the button text to "Purchased"
              />
            ))}
          </div>
        </div>

        {/* Render Purchased Bids */}
        <div className="mt-10">
          <Card
            title={data[1].cardTitle}
            description={data[1].cardDescription}
          />
        </div>

        {/* Render Past Bids */}
        <div className="mt-10">
          <Card
            title={data[2].cardTitle}
            description={data[2].cardDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default BidPurchaseOrders;
