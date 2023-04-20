import React from "react";
import { classNames } from "../utils";

interface DividerProps {
  dividerTitle?: string;
  className?: string;
  bgColour?: string;
}

export default function Divider({
  dividerTitle,
  className,
  bgColour,
}: DividerProps) {
  return (
    <div className={classNames("relative", className ?? "")}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      {dividerTitle && (
        <div className="relative flex justify-center">
          <span
            className={classNames(
              "px-3 text-lg font-medium text-gray-900",
              bgColour ?? ""
            )}
          >
            {dividerTitle}
          </span>
        </div>
      )}
    </div>
  );
}
