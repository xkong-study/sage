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

export default function FavouriteLocation({
  name,
  time,
  distance,
  className,
}: FavouriteLocationProps) {
  return (
    <div
      className={classNames(
        "text-left bg-sky-200 p-2 rounded-lg flex flex-col space-y-2",
        className ?? ""
      )}
    >
      <span className="whitespace-nowrap text-blue-900">{`${name} - ${time}`}</span>
      <div className="flex justify-between items-center space-x-2">
        <span className="p-1 rounded-full inline-flex items-center space-x-1 bg-white ring-2 ring-blue-700">
          <p className="text-xs">Start</p>
          <MapPinIcon className="h-5 w-5 rounded-full text-blue-700" />
        </span>
        <span className="inline-flex space-x-2">
          <MapIcon className="h-6 w-6 p-1 bg-white ring-2 ring-emerald-500 rounded-full text-emerald-500" />
          <HeartIcon className="h-6 w-6 p-1 bg-white ring-2 ring-pink-500 rounded-full text-pink-500" />
        </span>
      </div>
    </div>
  );
}
