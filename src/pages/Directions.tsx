import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { BiWalk, BiBus, BiCar, IoBicycle } from "react-icons/all";

import { classNames } from "../utils";
import BackButton from "../atoms/BackButton";

import {
  DestinationSearchStateKeys,
  DirectionsResponse,
  ModeOfTransport,
  Prediction,
  TraverseDirection,
} from "../types";
import TraverseDirectionHolder from "../atoms/TraverseDirectionHolder";
import TraversalExchanger from "../atoms/TraversalExchanger";
import TransportButton from "../atoms/TransportButton";
import Logo from "../components/Logo";
import { useViewNavigate } from "../hooks";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  destinationSearchAtom,
  directionsResponseArrayAtom,
  navigationDataAtom,
} from "../recoil/atoms";
import TransportRoutes from "../organisms/TranportRoute";
import useWebSocket, { ReadyState } from "react-use-websocket";

const TransportBadgeColorMap = {
  [ModeOfTransport.Walk]: "bg-emerald-500 shadow-emerald-300",
  [ModeOfTransport.Bicycle]: "bg-green-500 shadow-green-300",
  [ModeOfTransport.Transit]: "bg-yellow-400 shadow-yellow-300",
  [ModeOfTransport.Driving]: "bg-blue-500 shadow-blue-400",
};

const SOCKET_URL = "ws://localhost:8080/directions/1234";
export default function Directions() {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    SOCKET_URL,
    {
      onError: (error) => {
        console.error(error);
      },
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    }
  );

  const setDirectionsResponse = useSetRecoilState(directionsResponseArrayAtom);

  const transitButtonRef = useRef<HTMLButtonElement | null>(null);

  const viewNavigate = useViewNavigate();

  const [destinationSearchState, setDestinationSearchState] = useRecoilState(
    destinationSearchAtom
  );

  const areAllDestinationsSelected = useMemo(
    () => Object.values(destinationSearchState).every((v) => v !== null),
    [destinationSearchState]
  );

  const [traverseDirection, setTraverseDirection] = useState<TraverseDirection>(
    TraverseDirection.Forward
  );

  const fromPositionRef = useRef<HTMLDivElement>(null);
  const toPositionRef = useRef<HTMLDivElement>(null);

  const exchangePositionInputDivs = (prevDirection: TraverseDirection) => {
    if (!fromPositionRef.current || !toPositionRef.current) return;
    const fromPositionInputDiv = fromPositionRef.current;
    const toPositionInputDiv = toPositionRef.current;
    const fromPosition = fromPositionInputDiv.getBoundingClientRect();
    const toPosition = toPositionInputDiv.getBoundingClientRect();
    const difference =
      prevDirection === TraverseDirection.Forward
        ? toPosition.y - fromPosition.y
        : 0;

    fromPositionInputDiv.style.transform = `translateY(${difference}px)`;
    toPositionInputDiv.style.transform = `translateY(${-difference}px)`;
  };

  const toggleTraverseDirection = () => {
    if (Object.values(destinationSearchState).some((v) => v === null)) return;
    setTraverseDirection((prevDirection) => {
      exchangePositionInputDivs(prevDirection);
      return prevDirection === TraverseDirection.Forward
        ? TraverseDirection.Reverse
        : TraverseDirection.Forward;
    });

    setDestinationSearchState((prev) => ({
      ...prev,
      [DestinationSearchStateKeys.FROM_DESTINATION_PREDICTION]:
        prev[DestinationSearchStateKeys.TO_DESTINATION_PREDICTION],
      [DestinationSearchStateKeys.TO_DESTINATION_PREDICTION]:
        prev[DestinationSearchStateKeys.FROM_DESTINATION_PREDICTION],
    }));
  };

  const [selectedTransport, setSelectedTransport] =
    useState<ModeOfTransport | null>(null);

  const transportSelectionBadge = useRef<HTMLDivElement>(null);

  const handleTransportSelectionBadgePosition = (position: DOMRect) => {
    if (!transportSelectionBadge.current) return;
    transportSelectionBadge.current.style.left = `${position.left}px`;
  };
  const handleTransportChange = (transport: ModeOfTransport) => async () => {
    if (Object.values(destinationSearchState).some((v) => v === null)) return;
    setSelectedTransport(transport);
    const fromPlaceId =
      destinationSearchState.fromDestinationPrediction?.place_id;
    const toPlaceId = destinationSearchState.toDestinationPrediction?.place_id;
    if (!fromPlaceId || !toPlaceId) return;
    sendJsonMessage({
      origin_place_id: fromPlaceId,
      destination_place_id: toPlaceId,
      mode: transport === ModeOfTransport.Transit ? "transit" : transport,
      ...(transport === ModeOfTransport.Transit && {
        transit_mode: ["bus", "subway", "train", "tram"],
      }),
    });
  };

  useEffect(() => {
    if (readyState !== ReadyState.OPEN || lastJsonMessage === null) return;
    const data = lastJsonMessage as any as Array<DirectionsResponse>;
    setDirectionsResponse(data);
  }, [lastJsonMessage]);

  useEffect(() => {
    if (!transitButtonRef.current) return;
    transitButtonRef.current.click();
  }, [areAllDestinationsSelected]);

  const descriptivePredictionText = (prediction: Prediction | null): string => {
    if (!prediction) return "";
    const {
      structured_formatting: { main_text, secondary_text },
    } = prediction;
    return `${main_text}, ${secondary_text}`;
  };
  return (
    <div className="h-full overflow-y-hidden">
      <div className="grid grid-cols-12 w-full mt-2 px-2">
        <BackButton className=" col-span-1" onClick={() => viewNavigate(-1)} />
        <div className="col-span-1 flex items-center justify-end">
          <TraverseDirectionHolder traverseDirection={traverseDirection} />
        </div>
        {/* input group below */}
        <div className="mx-2 col-span-9 space-y-2">
          <div ref={fromPositionRef} className="transition-all">
            <label htmlFor="from-position" className="sr-only">
              From Position
            </label>
            <input
              type="text"
              name="from-position"
              className="block text-sm w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 caret-transparent active:ring-gray-400 sm:text-sm sm:leading-6"
              placeholder="From position"
              onClick={() =>
                viewNavigate(
                  `/destination-search/${DestinationSearchStateKeys.FROM_DESTINATION_PREDICTION}`
                )
              }
              value={descriptivePredictionText(
                destinationSearchState[
                  DestinationSearchStateKeys.FROM_DESTINATION_PREDICTION
                ]
              )}
              onChange={() => void 0}
            />
          </div>
          <div ref={toPositionRef} className="transition-all">
            <label htmlFor="to-destination" className="sr-only">
              To Destination
            </label>
            <input
              type="text"
              name="to-destination"
              className="block text-sm w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 caret-transparent active:ring-gray-400 sm:text-sm sm:leading-6"
              placeholder="Choose destination"
              onClick={() =>
                viewNavigate(
                  `/destination-search/${DestinationSearchStateKeys.TO_DESTINATION_PREDICTION}`
                )
              }
              value={descriptivePredictionText(
                destinationSearchState[
                  DestinationSearchStateKeys.TO_DESTINATION_PREDICTION
                ]
              )}
              onChange={() => void 0}
            />
          </div>
        </div>
        <div className="col-span-1 flex items-center">
          <TraversalExchanger onClick={toggleTraverseDirection} />
        </div>
      </div>
      <div className="flex justify-around relative my-4 h-6 items-center">
        <TransportButton
          transitButtonRef={transitButtonRef}
          className={classNames(
            "z-10",
            selectedTransport === ModeOfTransport.Transit
              ? "text-black"
              : "text-gray-600"
          )}
          Icon={<BiBus className="h-5 w-5" />}
          onClick={handleTransportChange(ModeOfTransport.Transit)}
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
            selectedTransport === ModeOfTransport.Driving
              ? "text-white"
              : "text-gray-600"
          )}
          Icon={<BiCar className="h-5 w-5" />}
          onClick={handleTransportChange(ModeOfTransport.Driving)}
          handleBadgePosition={handleTransportSelectionBadgePosition}
        />
        <div
          ref={transportSelectionBadge}
          style={{
            transform: `translateX(-30%)`,
          }}
          hidden={selectedTransport === null}
          className={classNames(
            "absolute h-7 w-12 bg-blue-600 rounded-full z-5 transition-all shadow-md",
            TransportBadgeColorMap[selectedTransport as ModeOfTransport]
          )}
        ></div>
      </div>

      {selectedTransport ? (
        <TransportRoutes selectedTransport={selectedTransport} />
      ) : (
        <div className="h-full flex bg-gray-200 justify-center items-center">
          <Logo className="h-72 w-72 -translate-y-16" />
        </div>
      )}
    </div>
  );
}
