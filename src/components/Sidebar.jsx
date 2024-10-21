import React, { useState } from "react"; // Import useState here
import {
  List,
  Card,
  Avatar,
  ListItem,
  Accordion,
  Typography,
  AccordionBody,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import {
  TicketIcon,
  UserGroupIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/images/logo.png";

const Sidebar = () => {
  const [open, setOpen] = useState(0); // Move state declarations here
  const [openAlert, setOpenAlert] = useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const LIST_ITEM_STYLES =
    "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

  return (
    <div className="w-fit grid grid-cols-1 h-screen">
      <Card className="h-full w-fit mx-auto p-6 shadow-md overflow-auto sidebar">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img src={Logo} alt="brand" className="w-20 h-auto" />
          <Typography color="blue-gray" className="uppercase text-xl font-bold">
            Brothers IT{" "}
          </Typography>
        </div>
        <hr className="my-2 border-gray-200" />
        <List>
          <Accordion open={open === 1}>
            <ListItem
              selected={open === 1}
              data-selected={open === 1}
              onClick={() => handleOpen(1)}
              className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <Avatar
                  size="sm"
                  src="https://www.material-tailwind.com/img/avatar1.jpg"
                />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                User User{" "}
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/Settings">
                  <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                    Settings
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-gray-200" />
          <Accordion open={open === 2}>
            <ListItem
              selected={open === 2}
              data-selected={open === 2}
              onClick={() => handleOpen(2)}
              className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <RectangleGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                Dashboard
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                  Analytics
                </ListItem>
                <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                  Bid Stats
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Link to="/tasks">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Task Management
            </ListItem>
          </Link>
          <Link to="/user-management">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              User Management
            </ListItem>
          </Link>
          <Link to="/Bids">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <Square2StackIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Bids
            </ListItem>
          </Link>
          <Link to="/bid-purchase-orders">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <TicketIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Orders
            </ListItem>
          </Link>
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <UserGroupIcon className="text-primary1 h-5 w-5" />
            </ListItemPrefix>
            Customers
          </ListItem>
        </List>
        <hr className="my-2 border-gray-200" />
        <List>
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <ChatBubbleLeftEllipsisIcon className="text-primary1 h-5 w-5" />
            </ListItemPrefix>
            Help & Support
          </ListItem>
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <ArrowLeftStartOnRectangleIcon
                strokeWidth={2.5}
                className="text-primary1 h-5 w-5"
              />
            </ListItemPrefix>
            Sign Out
          </ListItem>
        </List>
        {/* <Alert
            open={openAlert}
            className="mt-auto"
            color="green"
            variant="ghost"
          >
            <Typography
              variant="small"
              color="green"
              className="mb-1 font-bold"
            >
              New Version Available
            </Typography>
            <Typography variant="small" color="green" className="font-normal">
              Update your app and enjoy the new features and improvements.
            </Typography>
            <div className="mt-4 flex gap-4">
              <Typography
                as="a"
                href="#"
                variant="small"
                color="green"
                className="font-normal"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="green"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert> */}
        <Typography
          variant="small"
          className="mt-5 font-medium text-gray-500 flex justify-center"
        >
          BIT v1.0
        </Typography>
      </Card>
    </div>
  );
};

export default Sidebar;
