import React from "react";
import MultipleWorkspacesComponent from "./MultipleWorkspacesComponent";

export default function Component() {
  const sampleWorkspaces = [
    {
      id: "1",
      name: "Marketing Workspace",
      spaces: [
        {
          id: "1",
          name: "Campaign Planning",
          spaces: [
            {
              id: "2",
              name: "Social Media",
              spaces: [],
              folders: [
                {
                  id: "1",
                  name: "Content Calendar",
                  folders: [],
                  tasks: [
                    {
                      id: "1",
                      name: "Create weekly posts",
                      startDate: "2023-05-01",
                      endDate: "2023-05-05",
                      assignee: "User 1",
                    },
                    {
                      id: "2",
                      name: "Design graphics",
                      startDate: "2023-05-06",
                      endDate: "2023-05-10",
                      assignee: "User 2",
                    },
                  ],
                },
              ],
            },
          ],
          folders: [
            {
              id: "2",
              name: "Budget",
              folders: [
                {
                  id: "3",
                  name: "Q2 Planning",
                  folders: [],
                  tasks: [
                    {
                      id: "3",
                      name: "Allocate resources",
                      startDate: "2023-05-11",
                      endDate: "2023-05-15",
                      assignee: "User 3",
                    },
                  ],
                },
              ],
              tasks: [],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Development Workspace",
      spaces: [
        {
          id: "3",
          name: "Project Alpha",
          spaces: [
            {
              id: "4",
              name: "Frontend",
              spaces: [],
              folders: [
                {
                  id: "4",
                  name: "React Components",
                  folders: [],
                  tasks: [
                    {
                      id: "4",
                      name: "Implement login form",
                      startDate: "2023-05-16",
                      endDate: "2023-05-20",
                      assignee: "User 4",
                    },
                    {
                      id: "5",
                      name: "Optimize performance",
                      startDate: "2023-05-21",
                      endDate: "2023-05-25",
                      assignee: "User 5",
                    },
                  ],
                },
              ],
            },
          ],
          folders: [
            {
              id: "5",
              name: "Backend",
              folders: [
                {
                  id: "6",
                  name: "API Development",
                  folders: [],
                  tasks: [
                    {
                      id: "6",
                      name: "Design RESTful endpoints",
                      startDate: "2023-05-26",
                      endDate: "2023-05-30",
                      assignee: "User 6",
                    },
                  ],
                },
              ],
              tasks: [],
            },
          ],
        },
      ],
    },
  ];
  return <MultipleWorkspacesComponent workspaces={sampleWorkspaces} />;
}
