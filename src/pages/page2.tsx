import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import { classNames } from "../utils/utils";
import ListContainer from "../components/ListContainer";
import { FavouriteLocation } from "../components/FavouriteLocation";
import Divider from "../components/Divider";
import {ChevronLeftIcon} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

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
  const { isLoaded } = useJsApiLoader({
    id: 'd07532df77f9d9a5',
    googleMapsApiKey: 'AIzaSyBxhljI-42-8Sn2UOAVf3Cw_9lH4otQ6vY',
    libraries: ['geometry', 'drawing'],
  });
  const navigate = useNavigate()
  const [slidePanelState, setSlidePanelState] = useState(
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
  const containerStyle = {
    width: screen.width,
    height: screen.height
  };
  const center = {
    lat: 53.49332,
    lng: -6.31718
  };
  const options = {
    // 将 `language` 属性添加到 `options` 对象中
    ...{
      zoomControl: true,
      streetViewControl: false,
    },
    language: "en-GB" // 设置地图的语言为中文
  };

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {isLoaded && <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
      >
      </GoogleMap>
      }
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
        <div className="w-6 h-2 bg-gray-500 rounded mx-auto my-2"></div>
        <div className="px-4">
          <div className="w-full space-y-1">
            <div className="flex flex-col">
              <ChevronLeftIcon className="h-10 w-8" aria-hidden="true" onClick={()=>navigate(-1)}/>
              <span className="inline-flex space-x-2 items-baseline my-2">
                <h4 className="text-black text-left text-xl">Favourites</h4>
                <span className="p-[0.8px] rounded-full ring-2 ring-amber-300 ">
                  <SparklesIcon className="h-4 w-4 text-amber-500" />
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
            <ListContainer/>
          </div>
        </div>
      </div>
    </div>
  );
}
