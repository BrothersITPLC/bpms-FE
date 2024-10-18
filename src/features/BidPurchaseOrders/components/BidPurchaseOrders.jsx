import React, { useState } from "react";
import BidsCard from "../../Bids/components/BidsCard";
import {
  Typography,
  Tabs,
  Tab,
  TabsBody,
  TabsHeader,
  TabPanel,
  Card,
} from "@material-tailwind/react";
import Sidebar from "../../../components/Sidebar";
import { FaPlus } from "react-icons/fa";

const BidPurchaseOrders = () => {
  const [activeTab, setActiveTab] = useState("active_orders");

  const data = [
    {
      label: "Active Orders",
      value: "active_orders",
      cardTitle: "Active Orders",
      cardDescription:
        "Please complete the purchase for thefollowing purchase requests",
      showStatusUpdateButton: true,
    },
    {
      label: "Active Bids",
      value: "active_bids",
      cardTitle: "Active Bids",
      cardDescription: "These are the bids that are currently being processed.",
      showStatusUpdateButton: false,
    },
    {
      label: "Past Bids",
      value: "past_bids",
      cardTitle: "Past Bids",
      cardDescription: "These are the bids that have been closed.",
      showStatusUpdateButton: false,
    },
  ];

  // Sample bids data
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

        {/* Tabs for different bid statuses */}
        <Tabs
          value={activeTab}
          className="mt-10"
          onChange={(value) => setActiveTab(value)}
        >
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(
              ({
                value,
                cardTitle,
                cardDescription,
                showStatusUpdateButton,
              }) => (
                <TabPanel key={value} value={value}>
                  {value === "active_orders" ? (
                    <div className="w-full gap-4 flex flex-wrap">
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
                        />
                      ))}
                      <Card
                        title={cardTitle}
                        description={cardDescription}
                        // button={
                        //   showStatusUpdateButton ? (
                        //     <div className="flex items-center justify-center cursor-pointer">
                        //       <FaPlus className="h-5 w-5" />
                        //       <span className="ml-2">Request Bid Purchase</span>
                        //     </div>
                        //   ) : (
                        //     <div className="flex items-center justify-center">
                        //       <span>Detail</span>
                        //     </div>
                        //   )
                        // }
                      />
                    </div>
                  ) : (
                    <Card
                      title={cardTitle}
                      description={cardDescription}
                      button={
                        <div className="flex items-center justify-center">
                          <span>Detail</span>
                        </div>
                      }
                    />
                  )}
                </TabPanel>
              )
            )}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default BidPurchaseOrders;
