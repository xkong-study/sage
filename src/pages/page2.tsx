import React, { useState, useRef, useCallback } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import { classNames } from "../utils";
import ListContainer from "../components/ListContainer";
import { FavouriteLocation } from "../components/FavouriteLocation";
import Divider from "../components/Divider";
import {
  ChevronLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { Map } from "react-map-gl";
import BackButton from "../atoms/BackButton";

enum SlidePanelState {
  Open,
  Midway,
}

const slidePanelStateToTranslate = (state: SlidePanelState) => {
  switch (state) {
    case SlidePanelState.Open:
      return "translate-y-[10%]";
    case SlidePanelState.Midway:
      return "translate-y-[70%]";
  }
};

export default function Page2() {
  const navigate = useNavigate();
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelState>(
    SlidePanelState.Midway
  );
  const panelRef = useRef<HTMLDivElement | null>(null);

  const handlers = useSwipeable({
    onSwipedUp: () =>
      slidePanelState === SlidePanelState.Midway &&
      setSlidePanelState(SlidePanelState.Open),
    onSwipedDown: () =>
      slidePanelState === SlidePanelState.Open &&
      setSlidePanelState(SlidePanelState.Midway),
  });

  const refPassthrough = (el: HTMLDivElement) => {
    handlers.ref(el);
    panelRef.current = el;
  };

  const center = {
    latitude: 53.3440369,
    longitude: -6.2567066,
  };

  const navigateToPage = useCallback(
    (page: string) => () => {
      navigate(page);
    },
    [navigate]
  );

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      <Map
        initialViewState={{
          ...center,
          zoom: 15,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiYXJvcmFydSIsImEiOiJjbGc3cTdzM28wN3BlM2RydjJzY2RkdGRpIn0.M7M0wt-FhOcmwoxM7yVZ-Q"
      />
      <div
        {...handlers}
        className={classNames(
          "absolute top-0 h-full w-full rounded-t-3xl bg-white",
          "transition-transform duration-500 ease-in-out",
          slidePanelStateToTranslate(slidePanelState)
        )}
        ref={refPassthrough}
        id="dropbox"
      >
        <button
          onClick={navigateToPage("/Page4")}
          className="absolute -top-16 right-2 bg-blue-500 p-3 rounded-lg"
        >
          <div className="bg-white h-8 w-8 rotate-45 p-1 rounded-md">
            <ArrowUturnRightIcon className="w-6 h-6 -rotate-45 text-blue-500" />
          </div>
        </button>
        <div className="w-6 h-2 bg-gray-500 rounded mx-auto my-2"></div>
        <div className="px-4">
          <div className="w-full space-y-1">
            <div className="flex flex-col items-end">
              <span className="w-full inline-flex items-center justify-between">
                <BackButton />
                <span className="inline-flex space-x-2 items-baseline my-2">
                  <h4 className="text-black text-left text-xl">Favourites</h4>
                  <span className="p-[0.8px] rounded-full ring-2 ring-amber-300 ">
                    <SparklesIcon className="h-4 w-4 text-amber-500" />
                  </span>
                </span>
              </span>
              <span className="text-sm text-gray-400 -translate-y-2">
                Locations you saved as favourites
              </span>
            </div>

            <div className="flex justify-between space-x-2">
              <FavouriteLocation
                name={"Bachelors Walk"}
                time={"18:43"}
                distance={"2.4"}
              />
              <FavouriteLocation
                name={"Stephen's Green"}
                time={"19:02"}
                distance={"1.7"}
              />
            </div>
            <Divider dividerTitle="Suggestions" />
            <ListContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
