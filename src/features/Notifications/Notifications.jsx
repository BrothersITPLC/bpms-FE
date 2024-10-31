import React, { useState, useEffect } from "react"; // Import useEffect
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline"; // Import for v2

const messages = [
  // Inbox Notifications

  {
    name: "Yohannes Assefa",
    email: "yohannes.assefa@brothersitplc.com",

    message: "Need your feedback!",
    details:
      "Hey! I just sent over the latest draft. I'd really appreciate your thoughts on it when you get a chance. Let me know what you think!",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    type: "inbox",
  },
  {
    name: "Seblewongel Hailu",
    email: "seblewongel.hailu@brothersitplc.com",

    message: "Hey, quick question!",
    details:
      "Hi! I hope you're doing well. Could you send over the latest project proposal when you have a moment? Thanks a ton!",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    type: "inbox",
  },
  {
    name: "Kbruysfa Desalegn",
    email: "kbruysfa.desalegn@brothersitplc.com",
    message: "Team meeting this Friday!",
    details:
      "Hi there! I've scheduled a team meeting for Friday at 10 AM to catch up on our project progress. Hope to see you there!",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.jpg",

    type: "inbox",
  },

  // Task Updates Notifications
  {
    name: "Helen Tesfaye",
    email: "helen.tesfaye@brothersitplc.com",
    message: "Project Status Update",
    details:
      "Helen updated the project status to 'In Progress'. Check the dashboard for more details.",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",

    type: "task",
  },
  {
    name: "Kedir Mohammed",
    email: "kedir.mohammed@brothersitplc.com",
    message: "New Task Assigned: Document Preparation",
    details:
      "Technical document preparation assigned. Due by the end of this month.",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    type: "task",
  },
  {
    name: "Fasika Getachew",
    email: "fasika.getachew@brothersitplc.com",
    message: "Task Review Feedback",
    details:
      "Fasika has reviewed your recent task. Suggested improvements are available.",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    type: "task",
  },
  {
    name: "Yordanos Mengist",
    email: "yordanos.mengist@brothersitplc.com",
    message: "Design Mockup Completed",
    details:
      "Yordanos has completed the design mockup for the new project. Please review it.",
    image:
      "https://images.pexels.com/photos/2080383/pexels-photo-2080383.jpeg?auto=compress&cs=tinysrgb&w=600",
    type: "task",
  },
  {
    name: "Hajira Seid",
    email: "hajira.seid@brothersitplc.com",
    message: "Task Deadline Extended",
    details:
      "Hajira has extended the deadline for your marketing research task to next Friday.",
    image:
      "https://demos.creative-tim.com/corporate-ui-dashboard/assets/img/marie.jpg",
    type: "task",
  },

  // Resources Notifications
  {
    name: "Yohannes Assefa",
    email: "yohannes.assefa@brothersitplc.com",
    message: "Request for Paper Supplies",
    details: "Yohannes has requested a pack of paper for office supplies.",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.jpg",
    type: "resources",
  },
  {
    name: "Seblewongel Hailu",
    email: "seblewongel.hailu@brothersitplc.com",
    message: "Printer Cartridge Approval",
    details:
      "Seblewongel approved your printer cartridge request. Please collect it from the office.",
    image:
      "data:image/jpeg;base64,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",
    type: "resources",
  },
  {
    name: "Kedir Mohammed",
    email: "kedir.mohammed@brothersitplc.com",
    message: "Office Refreshments Order",
    details: "Kedir has placed an order for office refreshments for next week.",
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.jpg",
    type: "resources",
  },
];

const NOTIFICATION_TABS = [
  { label: "Inbox", value: "inbox" },
  { label: "Task Updates", value: "task" },
  { label: "Resources", value: "resources" },
];

const Notifications = () => {
  const [selectedTab, setSelectedTab] = useState("inbox");
  const [openAccordion, setOpenAccordion] = useState(null);

  const filteredMessages = messages.filter((msg) => msg.type === selectedTab);

  const handleOpenAccordion = (index) =>
    setOpenAccordion(openAccordion === index ? null : index);

  // Reset openAccordion when the selectedTab changes
  useEffect(() => {
    setOpenAccordion(null);
  }, [selectedTab]);

  return (
    <Card className="flex-1 w-full">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Notifications
          </Typography>
        </div>
        <Tabs value={selectedTab} className="mb-4" onChange={setSelectedTab}>
          <TabsHeader>
            {NOTIFICATION_TABS.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setSelectedTab(value)}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div>
          {filteredMessages.map(
            ({ name, email, message, image, details, type }, index) => (
              <Accordion
                key={index}
                open={openAccordion === index}
                className="mb-2 rounded-lg border border-blue-gray-100 px-4"
              >
                <AccordionHeader
                  onClick={() => handleOpenAccordion(index)}
                  className={`flex items-center justify-between border-b-0 transition-colors ${
                    openAccordion === index
                      ? "text-blue-500 hover:!text-blue-700"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-x-3">
                    <Avatar size="sm" src={image} alt={name} />
                    <div>
                      <Typography color="blue-gray" variant="h6">
                        {name}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {email}
                      </Typography>
                      <Typography variant="small" color="gray" className="mt-1">
                        {message}
                      </Typography>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody className="pt-0">
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-2 mb-3">
                    <Typography
                      variant="body2"
                      color="blue-gray"
                      className="italic text-sm"
                    >
                      {details}
                    </Typography>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    {type === "inbox" ? (
                      <Button
                        variant="text"
                        color="blue"
                        className="flex items-center gap-x-2"
                      >
                        <ArrowSmallRightIcon className="h-5 w-5" /> Reply
                      </Button>
                    ) : type === "task" ? (
                      <Button color="blue">Go to Board</Button>
                    ) : (
                      <>
                        <Button color="green">Accept</Button>
                        <Button color="red">Decline</Button>
                      </>
                    )}
                  </div>
                </AccordionBody>
              </Accordion>
            )
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Notifications;
