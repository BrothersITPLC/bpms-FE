import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Modal from "../../../components/Modal"; // Import your existing Modal component
import BidsCard from "./BidsCard";
import DatePicker from "../../../components/DatePicker"; // Adjust the import path as necessary

const Bids = () => {
  const [activeTab, setActiveTab] = useState("floated_bids");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [confirmText, setConfirmText] = useState("Submit");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const data = [
    {
      label: "Floated Bids",
      value: "floated_bids",
      content: "FLOATED",
      cardTitle: "Floated Bids",
      cardDescription: "Please propose a floating bid for purchase.",
      showAddBidIcon: true,
      modalFields: [
        {
          name: "company_name",
          label: "Company Name",
          placeholder: "Enter company name",
        },
        {
          name: "company_address",
          label: "Company Address",
          placeholder: "Enter company address",
        },
        {
          name: "bid_title",
          label: "Bid Title",
          placeholder: "Enter bid title",
        },
        { name: "rfq_no", label: "RFQ No.", placeholder: "Enter RFQ number" },
        {
          name: "submission_date",
          label: "Submission Date",
          placeholder: "Select submission date",
          type: "date",
          min: today,
        },
        {
          name: "opening_date",
          label: "Opening Date",
          placeholder: "Select opening date",
          type: "date",
          min: today,
        },
        {
          name: "bid_security_amount",
          label: "Bid Security Amount",
          placeholder: "Enter bid security amount",
        },
        {
          name: "bid_security_validity",
          label: "Bid Security Validity Period",
          placeholder: "Enter validity period",
        },
      ],
    },
    {
      label: "Active Bids",
      value: "active_bids",
      content: "ACTIVE",
      cardTitle: "Active Bids",
      cardDescription: "These are the bids that are currently being processed.",
      showAddBidIcon: false,
    },
    {
      label: "Past Bids",
      value: "past_bids",
      content: "PAST",
      cardTitle: "Past Bids",
      cardDescription: "These are the bids that have been closed.",
      showAddBidIcon: false,
    },
  ];

  const sampleBid = {
    companyName: "Company ABC",
    bidTitle: "Bid for Office Supplies",
    rfqNo: "RFQ-12345",
    submissionDate: "2024-11-05",
    openingDate: "2024-11-10",
    bidSecurityAmount: "$10,000",
    bidSecurityValidity: "30 days",
  };
  const sampleBid1 = {
    companyName: "Company XYZ",
    bidTitle: "Bid for IT Equipments",
    rfqNo: "RFQ-12345",
    submissionDate: "2024-11-05",
    openingDate: "2024-11-10",
    bidSecurityAmount: "$20,000",
    bidSecurityValidity: "30 days",
  };
  const sampleBid2 = {
    companyName: "Company PLC",
    bidTitle: "Windows License",
    rfqNo: "RFQ-12345",
    submissionDate: "2024-11-05",
    openingDate: "2024-11-10",
    bidSecurityAmount: "$10,000",
    bidSecurityValidity: "30 days",
  };

  const openModal = (title, fields) => {
    setModalTitle(title);
    setModalFields(fields);
    setConfirmText("Submit");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    // Handle bid purchase logic here
    console.log("Submitted form data:", modalFields);
    closeModal(); // Close the modal after confirming
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-1/2 flex-1 m-4">
        <Typography variant="h5" color="blue-gray">
          Bids
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          You can view the statuses of different bids and propose purchases.
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
                showAddBidIcon,
                modalFields,
              }) => (
                <TabPanel key={value} value={value}>
                  {value === "floated_bids" ? (
                    <div className="w-full gap-4 flex flex-wrap">
                      {/* BidsCard components */}
                      <BidsCard
                        companyName={sampleBid.companyName}
                        bidTitle={sampleBid.bidTitle}
                        rfqNo={sampleBid.rfqNo}
                        submissionDate={sampleBid.submissionDate}
                        openingDate={sampleBid.openingDate}
                        bidSecurityAmount={sampleBid.bidSecurityAmount}
                        bidSecurityValidity={sampleBid.bidSecurityValidity}
                      />
                      <BidsCard
                        companyName={sampleBid1.companyName}
                        bidTitle={sampleBid1.bidTitle}
                        rfqNo={sampleBid1.rfqNo}
                        submissionDate={sampleBid1.submissionDate}
                        openingDate={sampleBid1.openingDate}
                        bidSecurityAmount={sampleBid1.bidSecurityAmount}
                        bidSecurityValidity={sampleBid1.bidSecurityValidity}
                      />
                      <BidsCard
                        companyName={sampleBid2.companyName}
                        bidTitle={sampleBid2.bidTitle}
                        rfqNo={sampleBid2.rfqNo}
                        submissionDate={sampleBid2.submissionDate}
                        openingDate={sampleBid2.openingDate}
                        bidSecurityAmount={sampleBid2.bidSecurityAmount}
                        bidSecurityValidity={sampleBid2.bidSecurityValidity}
                      />
                      <Card
                        title={cardTitle}
                        description={cardDescription}
                        button={
                          showAddBidIcon ? (
                            <div
                              className="flex items-center justify-center cursor-pointer"
                              onClick={() =>
                                openModal("Request Bid Purchase", modalFields)
                              }
                            >
                              <FaPlus className="h-5 w-5" />
                              <span className="ml-2">Request Bid Purchase</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <span>Detail</span>
                            </div>
                          )
                        }
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

        {/* Modal for adding bid purchase */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
          confirmText={confirmText}
          onConfirm={handleConfirm}
        >
          {modalFields.map((field) => {
            if (field.type === "date") {
              return (
                <DatePicker
                  key={field.name}
                  field={{
                    label: field.label,
                    name: field.name,
                    placeholder: field.placeholder,
                  }}
                />
              );
            }
            return (
              <div key={field.name} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            );
          })}
        </Modal>
      </div>
    </div>
  );
};

export default Bids;
