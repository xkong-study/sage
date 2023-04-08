import React from "react";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { TraverseDirection } from "../types";
import { classNames } from "../utils";
import { Transition } from "@headlessui/react";

interface TraverseDirectionHolderProps {
  traverseDirection: TraverseDirection;
  className?: string;
}

function TraverseDirectionHolder({
  traverseDirection,
  className,
}: TraverseDirectionHolderProps) {
  return (
    <div className={classNames("flex flex-col items-center", className ?? "")}>
      <div
        className={classNames(
          "w-3 h-3  rounded-full border-2 transition-all duration-[225ms]",
          traverseDirection === TraverseDirection.Forward
            ? "bg-blue-500"
            : "border-gray-600"
        )}
      ></div>
      <div className="py-1 space-y-1">
        <div className="w-1 h-1 bg-black rounded-full"></div>
        <div className="w-1 h-1 bg-black rounded-full"></div>
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>
      <div className="relative h-4 w-4">
        <Transition
          show={traverseDirection === TraverseDirection.Forward}
          enter="transition-transform duration-75 delay-150"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MapPinIcon className="absolute w-4 h-4 text-red-600" />
        </Transition>
        <Transition
          show={traverseDirection === TraverseDirection.Reverse}
          enter="transition-transform duration-75 delay-150"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full border-2"></div>
        </Transition>
      </div>
    </div>
  );
}

export default TraverseDirectionHolder;
