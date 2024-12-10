import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/images/logo.png";
function NavItem({ children }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        color="blue-gray"
        className="text-blue-gray-700 flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}

const LandingPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <>
      <Navbar shadow={false} fullWidth className="border-0">
        <div className="container mx-auto flex items-center justify-between">
          <Typography color="blue-gray" className="text-lg font-bold">
            <div className="flex gap-2">
              <img className="w-8" src={Logo} />
              Brothers IT PLC{" "}
            </div>
          </Typography>
          <ul className="ml-10 hidden items-center gap-6 lg:flex">
            <Link to="./analytics">
              <NavItem>
                <RectangleStackIcon className="h-5 w-5" />
                Pages
              </NavItem>
            </Link>
            <NavItem>
              <UserCircleIcon className="h-5 w-5" />
              Account
            </NavItem>
            <NavItem>
              <Squares2X2Icon className="h-5 w-5" />
              Blocks
            </NavItem>
            <NavItem>
              <CommandLineIcon className="h-5 w-5" />
              Docs
            </NavItem>
          </ul>
          <div className="hidden items-center gap-4 lg:flex">
            <Link to="./Auth/Login">
              <Button color="gray">Log in</Button>
            </Link>
            {/* <Button variant="text">Log in</Button> */}

            {/* <Button color="gray">buy now</Button> */}
          </div>
          <IconButton
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="ml-auto inline-block lg:hidden"
          >
            {open ? (
              <XMarkIcon strokeWidth={2} className="h-6 w-6" />
            ) : (
              <Bars3Icon strokeWidth={2} className="h-6 w-6" />
            )}
          </IconButton>
        </div>
        <Collapse open={open}>
          <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
            <ul className="flex flex-col gap-4">
              <Link to="./analytics">
                <NavItem>
                  <RectangleStackIcon className="h-5 w-5" />
                  Pages
                </NavItem>
              </Link>
              <NavItem>
                <UserCircleIcon className="h-5 w-5" />
                Account
              </NavItem>
              <NavItem>
                <Squares2X2Icon className="h-5 w-5" />
                Blocks
              </NavItem>
              <NavItem>
                <CommandLineIcon className="h-5 w-5" />
                Docs
              </NavItem>
            </ul>
            <div className="mt-6 mb-4 flex items-center gap-4">
              <Button variant="text">Log in</Button>
              <Button color="gray">buy now</Button>
            </div>
          </div>
        </Collapse>
      </Navbar>
      <header className="bg-white p-8">
        <div className="grid mt-16 min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] place-items-stretch bg-[url('/image/bg-hero-17.svg')] bg-center bg-contain bg-no-repeat">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
              Exciting News! Introducing our latest Project.z{" "}
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
              Get ready to experience a new level of{" "}
              <span className="text-green-500 leading-snug ">performance</span>{" "}
              and{" "}
              <span className="leading-snug text-green-500">collaboration</span>{" "}
              at Brothers IT PLC .
            </Typography>
            {/* <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              The time is now for it to be okay to be great. For being a bright
              color. For standing out.
            </Typography> */}
            <div className="mt-8 grid w-fit mx-auto place-items-start md:justify-center">
              <div className="mb-2 flex w-fit flex-col gap-4 md:flex-row">
                <Textarea
                  color="gray"
                  label="Enter your anonymous messages"
                  size="lg"
                />
                <Button color="gray" className="w-fit px-4 md:w-[12rem]">
                  <PaperAirplaneIcon />{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LandingPage;
