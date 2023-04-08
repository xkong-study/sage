import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  MapPinIcon,
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Input } from "antd-mobile";
import { AiFillCar } from "react-icons/ai";
import {
  BiWalk,
  BiBus,
  BiCar,
  IoBicycle,
  BsBusFrontFill,
  BsFillTrainFreightFrontFill,
} from "react-icons/all";

import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount, incrementByHidden } from "../store/reducer";
import { RootState } from "../store";
import { FcCheckmark } from "react-icons/fc";
import { Mask } from "antd-mobile";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../utils";
import BackButton from "../atoms/BackButton";

import { ModeOfTransport, TraverseDirection } from "../types";
import TraverseDirectionHolder from "../atoms/TraverseDirectionHolder";
import TraversalExchanger from "../atoms/TraversalExchanger";
import TransportButton from "../atoms/TransportButton";

const TransportBadgeColorMap = {
  [ModeOfTransport.Walk]: "bg-emerald-500 shadow-emerald-300",
  [ModeOfTransport.Bicycle]: "bg-green-500 shadow-green-300",
  [ModeOfTransport.Bus]: "bg-amber-400 shadow-amber-300",
  [ModeOfTransport.Car]: "bg-blue-500 shadow-blue-400",
};

export default function SearchPlace() {
  const hidden = useSelector((state: RootState) => state.user.value);
  useEffect(() => {
    if (hidden == "hidden") {
      setVisible_bg(false);
    } else {
      setVisible_bg(true);
    }
  }, [hidden]);
  const location = useLocation();
  let placeHolder: string;
  if (location.state != null) {
    placeHolder = location.state.name;
  } else {
    placeHolder = "choose destination";
  }

  const [traverseDirection, setTraverseDirection] = useState<TraverseDirection>(
    TraverseDirection.Forward
  );

  const toggleTraverseDirection = () => {
    setTraverseDirection(
      traverseDirection === TraverseDirection.Forward
        ? TraverseDirection.Reverse
        : TraverseDirection.Forward
    );
  };

  const [content, setContent] = useState("your position");
  const [show, setShow] = useState("none");
  const [visible, setVisible] = useState("none");
  const [visible1, setVisible1] = useState("none");
  const [visible2, setVisible2] = useState("none");
  const [visible_bg, setVisible_bg] = useState(false);
  const dispatch = useDispatch();

  const Timer = () => {
    hidden == "hidden"
      ? dispatch(incrementByAmount("block"))
      : dispatch(incrementByAmount("hidden"));
    if (hidden == "hidden") {
      setVisible_bg(true);
      dispatch(incrementByHidden("true"));
    } else {
      setVisible_bg(false);
      dispatch(incrementByHidden("false"));
    }
  };
  const exchange = () => {
    if (content == "your position") {
      setContent(`${placeHolder}`);
    }
  };
  const choose = () => {
    if (show == "none") {
      setShow("block");
    } else {
      setShow("none");
    }
  };
  const Selector = () => {
    if (visible == "none") {
      setVisible("block");
    } else {
      setVisible("none");
    }
  };
  const Selector1 = () => {
    if (visible1 == "none") {
      setVisible1("block");
    } else {
      setVisible1("none");
    }
  };
  const Selector2 = () => {
    if (visible2 == "none") {
      setVisible2("block");
    } else {
      setVisible2("none");
    }
  };

  const [selectedTransport, setSelectedTransport] = useState<ModeOfTransport>(
    ModeOfTransport.Bus
  );
  const transportSelectionBadge = useRef<HTMLDivElement>(null);

  const handleTransportSelectionBadgePosition = (position: DOMRect) => {
    if (!transportSelectionBadge.current) return;
    transportSelectionBadge.current.style.left = `${position.left}px`;
  };
  const handleTransportChange = (transport: ModeOfTransport) => () => {
    setSelectedTransport(transport);
  };

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-12 w-full mt-2 px-2">
          <BackButton className=" col-span-1" />
          <div className="col-span-1 flex items-center justify-end">
            <TraverseDirectionHolder traverseDirection={traverseDirection} />
          </div>
          {/* input group below */}
          <div className="mx-2 col-span-9 space-y-1">
            <div>
              <label htmlFor="From-direction" className="sr-only">
                Email
              </label>
              <input
                type="text"
                name="From-direction"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Your Position"
              />
            </div>
            <div>
              <label htmlFor="From-direction" className="sr-only">
                Email
              </label>
              <input
                type="text"
                name="From-direction"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Your Position"
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <TraversalExchanger onClick={toggleTraverseDirection} />
          </div>
        </div>
        <div className="flex justify-around relative my-2 h-6 items-center">
          <TransportButton
            className={classNames(
              "z-10",
              selectedTransport === ModeOfTransport.Bus
                ? "text-black"
                : "text-gray-600"
            )}
            Icon={<BiBus className="h-5 w-5" />}
            onClick={handleTransportChange(ModeOfTransport.Bus)}
            handleBadgePosition={handleTransportSelectionBadgePosition}
          />
          <TransportButton
            className={classNames(
              "z-10",
              selectedTransport === ModeOfTransport.Bicycle
                ? "text-white"
                : "text-gray-600"
            )}
            Icon={<IoBicycle className="h-5 w-5" />}
            onClick={handleTransportChange(ModeOfTransport.Bicycle)}
            handleBadgePosition={handleTransportSelectionBadgePosition}
          />
          <TransportButton
            className={classNames(
              "z-10",
              selectedTransport === ModeOfTransport.Walk
                ? "text-white"
                : "text-gray-600"
            )}
            Icon={<BiWalk className="h-5 w-5" />}
            onClick={handleTransportChange(ModeOfTransport.Walk)}
            handleBadgePosition={handleTransportSelectionBadgePosition}
          />
          <TransportButton
            className={classNames(
              "z-10",
              selectedTransport === ModeOfTransport.Car
                ? "text-white"
                : "text-gray-600"
            )}
            Icon={<BiCar className="h-5 w-5" />}
            onClick={handleTransportChange(ModeOfTransport.Car)}
            handleBadgePosition={handleTransportSelectionBadgePosition}
          />
          <div
            ref={transportSelectionBadge}
            style={{
              transform: `translateX(-30%)`,
            }}
            className={classNames(
              "absolute h-7 w-12 bg-blue-600 rounded-full z-5 transition-all shadow-md",
              TransportBadgeColorMap[selectedTransport]
            )}
          ></div>
        </div>
      </div>

      <div className="w-full h-36 bg-white-500 border border-b-2 border-collapse">
        <div className="flex flex-col">
          <div className="mx-5 mt-2">
            <p>Recommend Route</p>
          </div>
          <div className="mt-2">
            <div className="flex flex-row justify-between">
              <div className={classNames("flex mt-5")}>
                <BiWalk className="w-4 h-4 mx-5 mr-3" />
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                <BsBusFrontFill className="w-4 h-4 mx-3" />
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                <BiWalk className="w-4 h-4 mx-3" />
              </div>
              <div className="mr-5">
                <p>13 min</p>
              </div>
            </div>
          </div>
          <div className="mx-5 mt-1">
            <p>Every 3 minutes from Dawson</p>
          </div>
        </div>
      </div>
      <div className="w-full h-40 bg-white-500 border border-b-8 border-t-8 border-collapse">
        <div className="flex flex-col">
          <div className="mx-5 mt-2">
            <p>Other Option</p>
          </div>
          <div className="mt-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row mt-5">
                <BiWalk className="w-4 h-4 mx-5 mr-3" />
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                <BsBusFrontFill className="w-4 h-4 mx-3" />
              </div>
              <div className="mr-5">
                <p>15 min</p>
              </div>
            </div>
          </div>
          <div className="mx-5 mt-5">
            <p>
              {moment().calendar().split(" ")[2]}-
              {moment().calendar().split(" ")[2]}
            </p>
          </div>
          <div className="mx-5 mt-1">
            <p>Every 3 minutes from Dawson</p>
          </div>
        </div>
      </div>
    </>
  );
}
