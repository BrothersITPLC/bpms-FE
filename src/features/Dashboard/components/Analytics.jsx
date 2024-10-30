import React, { useState } from "react";
import Totalbids from "./charts/Totalbids";
import Companybids from "./charts/Companybids";
import Usersbid from "./charts/Usersbid";

const Analytics = () => {
  return (
    <div className="h-screen flex-1">
      <div className="h-full">
        <div
          className={`ml-${"64"} transition-all duration-300 w-fit flex-1 h-full overflow-auto`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-fit bg-gray-200 col-span-2 rounded shadow-md">
              <Totalbids />{" "}
            </div>
            <div className="bg-gray-200 rounded shadow-md">
              <Companybids />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-200 col-span-3 rounded shadow-md">
              <Usersbid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
