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
  Badge,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLogoutUserMutation } from "../features/Auth/apiSlice";
import { useNavigate } from "react-router-dom";
import {
  TicketIcon,
  UserGroupIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/images/logo.png";

const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const LIST_ITEM_STYLES =
    "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

  return (
    <div className="flex h-screen">
      <Card className="fixed h-full w-64 bg-white shadow-md overflow-auto">
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
                <Avatar size="sm" src={user?.image_url} />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                <div className="flex gap-20 uppercase">
                  {" "}
                  {user?.username} <Badge content="5"></Badge>{" "}
                </div>
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
                <Link to="/Notifications">
                  <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                    <div className="flex gap-8">
                      Notifications <Badge className="ml-4" content="5"></Badge>
                    </div>
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-gray-200" />

          {/* Dashboard Accordion */}
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
                <Link to="/analytics">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Analytics
                  </ListItem>
                </Link>
                <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                  Bid Stats
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Task Management Accordion */}
          <Accordion open={open === 3}>
            <ListItem
              selected={open === 3}
              data-selected={open === 3}
              onClick={() => handleOpen(3)}
              className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                Task Management
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                  open === 3 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/assigned-tasks">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Assigned Tasks
                  </ListItem>
                </Link>
                {/* <Link to="/tasks">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Tasks
                  </ListItem>
                </Link> */}
                <Link to="/workspace">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Workspace
                  </ListItem>
                </Link>
                <Link to="/space">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Space
                  </ListItem>
                </Link>
                <Link to="/folder">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Folder
                  </ListItem>
                </Link>
                <Link to="/kanban">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    My Kanban Board
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <Link to="/user-management">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              User Management
            </ListItem>
          </Link>

          <Link to="/departments">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Departments{" "}
            </ListItem>
          </Link>

          <Link to="/resource-requests">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Resource Requests{" "}
            </ListItem>
          </Link>
          <Link to="/user-resource-requests">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Request a Resource{" "}
            </ListItem>
          </Link>
          <Link to="/clients">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Clients{" "}
            </ListItem>
          </Link>
          <Link to="/role-management">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Role Management{" "}
            </ListItem>
          </Link>
          <Accordion open={open === 4}>
            <ListItem
              selected={open === 4}
              data-selected={open === 4}
              onClick={() => handleOpen(4)}
              className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <RectangleGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                Bids
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                  open === 4 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/Bids">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Bids
                  </ListItem>
                </Link>
                <Link to="/bid-purchase-orders">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Orders
                  </ListItem>
                </Link>
                <Link to="/bid-tasks">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Bid Tasks{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <UserGroupIcon className="text-primary1 h-5 w-5" />
            </ListItemPrefix>
            Customers
          </ListItem>
          <Link to="/monthly-plan">
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <UserGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Work Plan
            </ListItem>
          </Link>
          <Accordion open={open === 5}>
            <ListItem
              selected={open === 5}
              data-selected={open === 5}
              onClick={() => handleOpen(5)}
              className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
            >
              <ListItemPrefix>
                <RectangleGroupIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-inherit">
                Inventory Management
              </Typography>
              <ChevronDownIcon
                strokeWidth={3}
                className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                  open === 5 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/companies-store">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Store Owners{" "}
                  </ListItem>
                </Link>
                <Link to="/store">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Stores
                  </ListItem>
                </Link>
                <Link to="/products-table">
                  <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                    Products{" "}
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
        {/* <Link to="/store">
          <List>
            <ListItem className={LIST_ITEM_STYLES}>
              <ListItemPrefix>
                <ChatBubbleLeftEllipsisIcon className="text-primary1 h-5 w-5" />
              </ListItemPrefix>
              Inventory Management{" "}
            </ListItem>
          </List>
        </Link> */}

        <List>
          <ListItem className={LIST_ITEM_STYLES} onClick={handleLogout}>
            <ListItemPrefix>
              <ArrowLeftStartOnRectangleIcon
                strokeWidth={2.5}
                className="text-primary1 h-5 w-5"
              />
            </ListItemPrefix>
            Sign Out
          </ListItem>
        </List>
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
