import React from "react";
import { MapPinIcon, MapIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { classNames } from "../utils";

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
        "w-full text-left bg-sky-200 p-2 rounded-lg flex flex-col space-y-2",
        className ?? ""
      )}
    >
      <span className="inline-flex justify-between">
        <span className="text-blue-900 truncate text-ellipsis w-8/12">
          {name}
        </span>
        <span className="text-blue-900 w-4/12">{` - ${time}`}</span>
      </span>
      <div className="flex w-full justify-between items-center ">
        <span className="p-1 rounded-full inline-flex items-center space-x-1 bg-white ring-2 ring-blue-700">
          <p>Start</p>
          <MapPinIcon className="h-6 w-6 rounded-full text-blue-700" />
        </span>
        <></>
        <span className="inline-flex space-x-3">
          <MapIcon className="h-6 w-6 p-1 bg-white ring-2 ring-emerald-500 rounded-full text-emerald-500" />
          <HeartIcon className="h-6 w-6 p-1 bg-white ring-2 ring-pink-500 rounded-full text-pink-500" />
        </span>
      </div>
    </div>
  );
};
