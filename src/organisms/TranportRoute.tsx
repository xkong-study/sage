import React, { Fragment, useMemo } from "react";
import { DirectionsResponse, Leg, Step, TransitStep } from "../types";
import { MdDirectionsWalk } from "react-icons/md";
import { BiBus, BiTrain, BiCar, BiWalk } from "react-icons/bi";
import { IoBicycle } from "react-icons/io5";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { TbNavigationFilled } from "react-icons/tb";
import { classNames, flattenSteps } from "../utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useViewNavigate } from "../hooks";

import {
  directionsResponseArrayAtom,
  navigationDataAtom,
} from "../recoil/atoms";

import { ModeOfTransport } from "../types";

interface TransportRoutesProps {
  selectedTransport: ModeOfTransport | null;
}
function TransportRoutes({ selectedTransport }: TransportRoutesProps) {
  const data = useRecoilValue(directionsResponseArrayAtom);

  if (!data || data?.length === 0 || selectedTransport === null) return null;

  return (
    <div className="flex flex-col">
      <div className="w-full bg-gray-300 h-1"></div>
      <ul role="list" className="space-y-2 divide-gray-200 w-full">
        {data.map((directionResponses: DirectionsResponse, i: number) => {
          return directionResponses.legs.map((leg: Leg) => (
            <li key={directionResponses.overview_polyline.points}>
              <TransitRoute
                subText={i == 0 ? "Recommended Route" : ""}
                data={leg}
                selectedTransport={selectedTransport}
              />
            </li>
          ));
        })}
      </ul>
    </div>
  );
}

export default TransportRoutes;
interface VehicleInfo {
  departureStop: string;
  vehicleName: string;
  vehicleType: string;
}

function getVehicleInfo(step: TransitStep | undefined) {
  if (!step)
    return {
      departureStop: "",
      vehicleName: "",
      vehicleType: "",
    };

  const departureStop = step.transit_details.departure_stop.name;
  const vehicleType = step.transit_details.line.vehicle.type;

  const vehicleName =
    vehicleType === "HEAVY_RAIL"
      ? step.transit_details.line.name
      : step.transit_details.line.short_name;

  return {
    departureStop,
    vehicleName,
    vehicleType,
  };
}

function getTimeInfoFromLeg(leg: any) {
  const departureTime = leg.departure_time?.text ?? "";
  const arrivalTime = leg.arrival_time?.text ?? "";
  const duration = leg.duration.text;
  return { departureTime, arrivalTime, duration };
}

function getDistanceInfoFromLeg(leg: any) {
  const distance = leg.distance.text;
  return { distance };
}

interface TransitRouteProps {
  data: Leg;
  subText?: string;
  selectedTransport: ModeOfTransport;
}

function TransitRoute({ subText, data, selectedTransport }: TransitRouteProps) {
  let viewNavigate = useViewNavigate();
  const setNavigationData = useSetRecoilState(navigationDataAtom);
  const transitSteps = useMemo(() => flattenSteps([data], 1), []);
  const { departureTime, arrivalTime, duration } = useMemo(
    () => getTimeInfoFromLeg(data),
    []
  );
  const { distance } = useMemo(() => getDistanceInfoFromLeg(data), []);

  const vehicleInfos: VehicleInfo[] = useMemo(
    () =>
      transitSteps
        .filter((step) => step.travel_mode === "TRANSIT")
        .map((step) => getVehicleInfo(step as TransitStep)) as VehicleInfo[],
    [transitSteps]
  );

  const handleClick = () => {
    viewNavigate(-1);
    setNavigationData(data);
  };

  const departureStop = vehicleInfos[0]?.departureStop;

  return (
    <>
      <div className="flex mx-6 flex-col space-y-1 mt-2">
        {subText && <p className="text-gray-500">{subText}</p>}
        <div className="flex w-full justify-between">
          {selectedTransport === ModeOfTransport.Transit ? (
            <TransitIcons vehicleInfos={vehicleInfos} />
          ) : selectedTransport === ModeOfTransport.Walk ? (
            <BiWalk className="h-5 w-5" />
          ) : selectedTransport === ModeOfTransport.Bicycle ? (
            <IoBicycle className="h-5 w-5" />
          ) : selectedTransport === ModeOfTransport.Driving ? (
            <BiCar className="h-5 w-5" />
          ) : null}
          <span className="text-md font-semibold truncate">{duration}</span>
        </div>
        <div className="flex w-full justify-between items-center">
          <div>
            <h4 className=" text-md font-base">
              {selectedTransport === ModeOfTransport.Transit
                ? `${departureTime} - ${arrivalTime}`
                : distance}
            </h4>
            <p className="text-sm">
              {selectedTransport === ModeOfTransport.Transit
                ? `Scheduled at ${departureTime}, from ${departureStop}`
                : `Starting now from your location`}
            </p>
          </div>
          <span className="p-2 rounded-full border-2 border-gray-300">
            <TbNavigationFilled
              onClick={handleClick}
              className="w-5 h-5 text-[#1da1f2]"
            />
          </span>
        </div>
      </div>
      <div
        className={classNames(
          "mt-2",
          subText === "Recommended Route"
            ? "bg-gray-300 h-2"
            : "bg-gray-200 h-[1px]"
        )}
      ></div>
    </>
  );
}

function TransitIcons({ vehicleInfos }: { vehicleInfos: VehicleInfo[] }) {
  return (
    <div className="flex items-center space-x-0.5">
      <MdDirectionsWalk className="w-5 h-5" />
      <ChevronRightIcon className="w-4 h-4" />
      {vehicleInfos.map(({ vehicleName, vehicleType }) => (
        <Fragment key={vehicleName}>
          <TransitIcon vehicleName={vehicleName} vehicleType={vehicleType} />
          <ChevronRightIcon className="w-4 h-4" />
        </Fragment>
      ))}
      <MdDirectionsWalk className="w-5 h-5" />
    </div>
  );
}

function TransitIcon({
  vehicleName,
  vehicleType,
}: {
  vehicleName: string;
  vehicleType: string;
}) {
  return (
    <span className="inline-flex items-center space-x-1">
      {vehicleType === "BUS" ? (
        <BiBus className="w-5 h-5" />
      ) : (
        <BiTrain className="w-5 h-5" />
      )}
      <p
        className={classNames(
          "text-sm rounded-md px-1 truncate text-ellipsis max-w-[4rem]",
          vehicleType === "BUS"
            ? "bg-yellow-400"
            : vehicleType === "HEAVY_RAIL"
            ? "bg-green-700 text-white"
            : "bg-red-700 text-white"
        )}
      >
        {vehicleName}
      </p>
    </span>
  );
}
