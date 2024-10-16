import React from "react";

// @material-tailwind/react
import {
  Input,
  Typography,
  Select,
  Option,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import UserInfo from "../../components/UserInfo";
const Signup = () => {
  const [date, setDate] = React.useState();

  return (
    <div className="flex justify-center w-full border-black-2">
      <section className="py-20 max-w-lg w-full">
        <UserInfo isSignup={true} />
      </section>
    </div>
  );
};

export default Signup;
