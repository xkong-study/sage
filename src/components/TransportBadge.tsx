import React from "react";
import { classNames } from "../utils";

export enum TransportType {
  Bus = "Bus",
  Train = "Train",
  Cycle = "Cycle",
}

interface TransportBadgeProps {
  transportType: TransportType;
  svgClassName: string;
  className: string;
}

function TransportBadge({
  transportType,
  svgClassName,
  className,
}: TransportBadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium",
        className
      )}
    >
      <svg
        className={classNames("-ml-1 mr-1.5 h-2 w-2", svgClassName)}
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {transportType}
    </span>
  );
}

export default TransportBadge;
