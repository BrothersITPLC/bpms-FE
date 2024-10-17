import {
  Typography,
  Input,
  Select,
  Option,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
const UserInfo = ({ isSignup }) => {
  return (
    <div className="flex justify-center w-fit border-black-2">
      <section className="max-w-lg w-full">
        <Typography variant="h5" color="blue-gray">
          {isSignup ? "Sign Up" : "Basic Information"}
        </Typography>
        <Typography variant="small" className="text-gray-600 font-normal mt-1">
          {isSignup
            ? "Enter your details to create an account."
            : "Enter your profile information below."}
        </Typography>

        <div className="flex flex-col w-fit mt-8">
          {/* Name Inputs */}
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                First Name
              </Typography>
              <Input
                size="lg"
                placeholder="Abebe"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Last Name
              </Typography>
              <Input
                size="lg"
                placeholder="Kebede"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          {/* Gender, Username, Phone Number */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Gender
                </Typography>
                <Select
                  size="lg"
                  className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                >
                  <Option>Male</Option>
                  <Option>Female</Option>
                </Select>
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Username
                </Typography>
                <Input
                  size="lg"
                  placeholder="Username"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Phone Number
                </Typography>
                <Input
                  size="lg"
                  placeholder="+251 910 111 213"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Email and Vicinity */}
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="name.father@brothersitplc.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
          {isSignup && (
            <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Password{" "}
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  labelProps={
                    {
                      //   className: "hidden",
                    }
                  }
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Confirm password{" "}
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  labelProps={
                    {
                      //   className: "hidden",
                    }
                  }
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
            </div>
          )}
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Vicinity
              </Typography>
              <Input
                size="lg"
                placeholder="6-kilo, Gerji, Bole, etc."
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

          {/* Password Fields - only for signup */}

          {/* Footer Button */}
          <div className="flex justify-start">
            <DialogFooter>
              <Button size="lg" variant="gradient" color="purple">
                <span>{isSignup ? "SIGN UP" : "SAVE"}</span>
              </Button>
            </DialogFooter>
          </div>
        </div>
      </section>
    </div>
  );
};
export default UserInfo;
