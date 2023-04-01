import React from "react";

import {
  ArrowsUpDownIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import {
  MapPinIcon as MapPinOutlineIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon as MapPinSolidIcon } from "@heroicons/react/24/solid";
import ListContainer from "./ListContainer";
import Divider from "./Divider";
import LocationSearchBar from "./LocationSearchBar";
import TransportBadge, { TransportType } from "./TransportBadge";
import LeaveAtBadge from "./LeaveAtBadge";
import FilterBadge from "./FiltersBadge";

function TransportSelection() {
  return (
    <>
      <div className="flex mt-3 px-2">
        <div className="flex flex-col items-center px-2 justify-start">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 mt-3" />
        </div>

        <div className="flex flex-col items-center py-2">
          <MapPinOutlineIcon className="h-8 w-8 text-gray-500" />
          <div className=" text-gray-600 flex flex-col leading-[0.5rem] mb-2">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <MapPinSolidIcon className="h-8 w-8 text-gray-500" />
        </div>
        <div className="flex flex-col items-center justify-between space-y-2 w-full px-2">
          <LocationSearchBar
            heading="From"
            placeholder="Select From Location"
          />
          <LocationSearchBar heading="To" placeholder="Select To Location" />
        </div>
        <div className="flex flex-col items-center justify-between py-2">
          <div className=" text-gray-600 flex flex-col leading-[0.4rem] mb-1 font-bold">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <ArrowsUpDownIcon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
      <div className="w-full border-t border-gray-300 mt-4 mb-2" />
      <div className="flex justify-around">
        <TransportBadge
          transportType={TransportType.Bus}
          className="bg-amber-100 text-amber-800 ring-2 ring-amber-500"
          svgClassName="text-amber-500"
        />
        <TransportBadge
          transportType={TransportType.Train}
          className="bg-blue-100 text-blue-800 ring-2 ring-blue-500"
          svgClassName="text-blue-500"
        />
        <TransportBadge
          transportType={TransportType.Cycle}
          className="bg-green-100 text-green-800 ring-2 ring-green-500"
          svgClassName="text-green-500"
        />
      </div>
      <div className="w-full border-t border-gray-300 my-2" />
      <div className="flex justify-around">
        <LeaveAtBadge
          className="bg-white border-2 rounded-lg text-gray-500 border-gray-300"
          svgClassName="text-gray-800"
        />
        <FilterBadge
          className="rounded-lg bg-violet-100 text-violet-800"
          svgClassName="text-violet-800"
        />
      </div>
      <Divider
        dividerTitle="Recommended Route ✦"
        // titleContainerClassname="my-1 justify-start ml-4"
        // titleTextClassname="text-base px-2"
      />
      <div className="flex justify-around">
        <span className=" border-2 rounded-full p-2">
          <ArrowUturnRightIcon className="h-6 w-6 text-blue-500" />
        </span>
      </div>
      <Divider
        dividerTitle="Other Options"
        // titleContainerClassname="my-1 justify-start ml-4"
        // titleTextClassname="text-sm px-2"
      />
      {/* <ListContainer>
        <div className="flex justify-around">
          <span className=" border-2 rounded-full p-2">
            <ArrowUturnRightIcon className="h-6 w-6 text-blue-500" />
          </span>
        </div>
        <div className="flex justify-around">
          <span className=" border-2 rounded-full p-2">
            <ArrowUturnRightIcon className="h-6 w-6 text-blue-500" />
          </span>
        </div>
      </ListContainer> */}
    </>
  );
}

export default TransportSelection;
