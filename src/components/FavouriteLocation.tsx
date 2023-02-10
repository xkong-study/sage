import React from "react";
import { classNames } from "../utils/utils";

interface FavouriteLocationProps {
  name: string;
  time: string;
  distance: string;
  className?: string;
}

export const FavouriteLocation = ({
  name,
  time,
  distance,
  className,
}: FavouriteLocationProps) => {
  return (
    <div
      className={classNames(
        "w-full text-left bg-sky-200 p-2 rounded-lg",
        className ?? ""
      )}
    >
      <span className=" inline-block">
        <span className="text-blue-900">{name}</span>
        <span className="text-blue-900">{" . "}</span>
        <span className="text-blue-900">{time}</span>
      </span>
    </div>
  );
};
