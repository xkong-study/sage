import React from "react";
import { classNames } from "../utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

interface FilterBadgeProps {
  svgClassName: string;
  className: string;
}

function FilterBadge({ svgClassName, className }: FilterBadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center px-3 py-0.5 text-sm font-medium",
        className
      )}
    >
      Filters
      <AdjustmentsHorizontalIcon
        className={classNames("h-4 w-4 ml-1", svgClassName)}
      />
    </span>
  );
}

export default FilterBadge;
