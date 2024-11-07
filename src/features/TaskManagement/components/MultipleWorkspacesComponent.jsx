import React from "react";
import WorkspaceComponent from "./WorkspaceComponent";

const MultipleWorkspacesComponent = ({ workspaces }) => {
  return (
    <div className="space-y-4 w-full">
      {workspaces.map((workspace) => (
        <WorkspaceComponent key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
};

export default MultipleWorkspacesComponent;
