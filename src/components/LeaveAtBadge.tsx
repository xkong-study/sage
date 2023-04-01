import React from "react";
import { classNames } from "../utils";
import { ClockIcon } from "@heroicons/react/24/solid";

interface LeaveAtBadgeProps {
  svgClassName: string;
  className: string;
}

function LeaveAtBadge({ svgClassName, className }: LeaveAtBadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center px-3 py-0.5 text-sm font-medium",
        className
      )}
    >
      {"Depart at"}
      <span className="inline-block font-bold ml-1 text-gray-800">
        {" 11:25"}
      </span>
      <ClockIcon className={classNames("h-4 w-4 ml-1", svgClassName)} />
    </span>
  );
}

export default LeaveAtBadge;
