import { Typography } from "@material-tailwind/react";

import SpaceList from "../components/SpaceList";
export function Workspace() {
  return (
    <section className="m-10 flex gap-4 items-center flex-col">
      <Typography variant="h3" color="blue-gray">
        Choose Workspace
      </Typography>
      <div className="m-10 flex gap-4">
        <SpaceList />
        <SpaceList />
        <SpaceList />
      </div>
    </section>
  );
}
export default Workspace;
