import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";

import { useState } from "react";

const MonthlyPlan = () => {
  const TABS = [
    { label: "October", value: "october" },
    { label: "November", value: "november" },
    { label: "December", value: "december" },
  ];

  const TABLE_HEAD = [
    "No",
    "Objective",
    "Milestone",
    "Assigned To",
    "Resource Needed",
    "Blockers",
    "Desired Outcome",
    "Note",
  ];

  const PLANS = [
    {
      month: "October",
      objectives: [
        {
          objective: "OSTA Project",
          milestones: [
            {
              milestone: "SRS Preparation",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "SRS Document",
              note: "",
            },
            {
              milestone: "BRS Preparation",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "BRS Document",
              note: "",
            },
            {
              milestone: "Feedback Submission",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "Feedback Document",
              note: "",
            },
          ],
        },
      ],
    },
    {
      month: "November",
      objectives: [
        {
          objective: "Brothers IT Website",
          milestones: [
            {
              milestone: "Deployment",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "Deployed Website",
              note: "",
            },
          ],
        },
        {
          objective: "Product Catalog",
          milestones: [
            {
              milestone: "Deployment",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "Demo",
              note: "",
            },
          ],
        },
      ],
    },
    {
      month: "December",
      objectives: [
        {
          objective: "Bidding Process Management System",
          milestones: [
            {
              milestone: "Development",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "Demo",
              note: "",
            },
          ],
        },
        {
          objective: "INSA Project",
          milestones: [
            {
              milestone: "Finalize and Deployment",
              assignedTo: "Software Team",
              resources: "",
              blockers: "",
              outcome: "DEployed system",
              note: "",
            },
          ],
        },
        {
          objective: "General Issue",
          milestones: [
            {
              milestone: "Staff Hiring",
              assignedTo: "Yishak",
              resources: "",
              blockers: "",
              outcome: "",
              note: "",
            },
          ],
        },
      ],
    },
  ];

  // Merge all objectives from the three months into one list
  const allPlans = PLANS.reduce((acc, plan) => {
    return [...acc, ...plan.objectives];
  }, []);

  const [activeTab, setActiveTab] = useState("october");

  return (
    <div className="flex-1 ml-64 p-6">
      <Card className="h-full w-fit">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Monthly Plans
            </Typography>
            <Button className="items-center" size="sm">
              Add Monthly Plan
            </Button>
          </div>
          <Tabs
            value={activeTab}
            className="w-full"
            onChange={(val) => setActiveTab(val)}
          >
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full table-auto text-left bg-white">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 font-medium text-sm text-blue-gray-600"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPlans.map(({ objective, milestones }, objIndex) =>
                milestones.map((milestone, msIndex) => (
                  <tr key={`ms-${objIndex}-${msIndex}`}>
                    {/* Display 'No' only once for each group of milestones */}
                    {msIndex === 0 && (
                      <td
                        rowSpan={milestones.length}
                        className="p-4 border-x border-b border-blue-gray-50 text-center"
                      >
                        {objIndex + 1}
                      </td>
                    )}

                    {/* Objective cell with rowspan */}
                    {msIndex === 0 && (
                      <td
                        rowSpan={milestones.length}
                        className="p-4 border-x border-b border-blue-gray-50 font-bold"
                      >
                        {objective}
                      </td>
                    )}

                    <td className="p-4 border-x border-b border-blue-gray-50">
                      {milestone.milestone}
                    </td>
                    <td className="p-4 border-x border-b border-blue-gray-50">
                      {milestone.assignedTo}
                    </td>
                    <td className="p-4 border-x border-b border-blue-gray-50">
                      {milestone.resources}
                    </td>
                    <td className="p-4 border-x border-b border-blue-gray-50">
                      {milestone.blockers}
                    </td>
                    <td className="p-4 border-x border-b border-blue-gray-50">
                      {milestone.outcome}
                    </td>
                    <td className="p-4 border-x border-b border-blue-gray-50">
                      {milestone.note}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          {/* Optional footer, can be used for any additional information */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MonthlyPlan;
