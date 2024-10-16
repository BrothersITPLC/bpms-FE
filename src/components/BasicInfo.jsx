import {
  Typography,
  Input,
  Select,
  Option,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
const BasicInfo = () => {
  return (
    <div className="flex justify-center w-fit border-black-2">
      <section className=" max-w-lg w-full">
        <Typography variant="h5" color="blue-gray">
          Basic Information
        </Typography>
        <Typography variant="small" className="text-gray-600 font-normal mt-1">
          Enter your profile information below.
        </Typography>
        <div className="flex flex-col w-fit mt-8">
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
                Last Name
              </Typography>
              <Input
                size="lg"
                placeholder="Kebede"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col items-end gap-4 md:flex-row">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Gender{" "}
                </Typography>
                <Select
                  size="lg"
                  labelProps={
                    {
                      //   className: "hidden",
                    }
                  }
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
                  Username{" "}
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  labelProps={
                    {
                      // className: "hidden",
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
                  Phone Number
                </Typography>
                <Input
                  size="lg"
                  placeholder="+251 910 111 213"
                  labelProps={
                    {
                      // className: "hidden",
                    }
                  }
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </div>
            </div>
          </div>
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
                placeholder="name.father'sname@brothersitplc.com"
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>

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
                placeholder="6-kilo, Gerji, Bole, etc... "
                labelProps={
                  {
                    //   className: "hidden",
                  }
                }
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-start">
          <DialogFooter>
            <Button size="lg" variant="gradient" color="purple">
              <span>{"Save"}</span>
            </Button>
          </DialogFooter>
        </div>
      </section>
    </div>
  );
};
export default BasicInfo;
