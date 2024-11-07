import { Spinner } from "@material-tailwind/react";

const CustomSpinner = () => {
  return (
    <div className="w-full h-full fixed flex items-center justify-center">
      <Spinner className="text-primary1" />
    </div>
  );
};

export default CustomSpinner;
