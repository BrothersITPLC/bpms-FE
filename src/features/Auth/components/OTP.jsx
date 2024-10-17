import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  Input,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useValidateOTPMutation } from "../apiSlice";
import Logo from "../../../assets/images/logo.png";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = React.useRef([]);
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const [validateOTP, { isLoading, error }] = useValidateOTPMutation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  console.log(token);
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleConfirm = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6 && token) {
      try {
        const result = await validateOTP({ otp: otpCode, token }).unwrap();
        console.log("OTP validated successfully", result);
        navigate("/signup");
      } catch (err) {
        console.error("Error validating OTP", err);
      }
    } else {
      console.error("Please enter a valid OTP and token.");
    }
  };

  return (
    <section className="grid h-screen place-items-center p-4">
      <Card className="w-auto max-w-[24rem]">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="w-full flex justify-center">
            <img className="w-1/2 items-center" src={Logo} alt="card-image" />
          </div>
          <Chip
            size="lg"
            className="justify-center"
            variant="outlined"
            value="OTP Verification"
          />
          <Typography
            color="blue-gray"
            className="mt-1 mb-2 text-[20px] font-bold"
          >
            Enter the OTP code from your email.
          </Typography>
        </CardHeader>
        <CardBody className="px-4 pt-0">
          <div className="my-4 flex items-center justify-center gap-2">
            {otp.map((digit, index) => (
              <React.Fragment key={index}>
                <Input
                  type="text"
                  maxLength={1}
                  className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "!min-w-0 !w-10 !shrink-0",
                  }}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
                {index === 2 && (
                  <span className="text-2xl text-slate-700">-</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <Typography color="red" className="text-center mt-2">
              {error.data?.detail || "Error validating OTP"}
            </Typography>
          )}

          <Typography variant="small" className="mt-6 flex justify-center">
            Didn&apos;t receive the code?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Resend
            </Typography>
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center pt-0 px-4">
          <Button
            className="mx-auto bg-primary1"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Validating..." : "Confirm"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default OTP;
