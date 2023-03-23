import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Divider } from 'antd-mobile'
import { useSwipeable } from "react-swipeable";
import { classNames } from "../utils/utils";
import ListContainer from "../components/ListContainer";
import {ChevronLeftIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";

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

export default function Page3() {
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
            >
                <div className="flex flex-row justify-center">
                    <ChevronLeftIcon className="h-10 w-8" aria-hidden="true" onClick={()=>navigate(-1)}/>
                    <div className="ml-10 mt-6 text-xl"><p>work</p></div>
                <div className="w-0.5 h-16 bg-black rounded mx-auto -mt-0 -mb-4"></div>
                    <div className="mr-20 mt-6 text-xl"><p>home</p></div>
                </div>
                <div className="px-4">
                    <div className="w-full space-y-1">
                        <div className="flex flex-col -mt-2">
              <span className="inline-flex space-x-2 items-baseline my-2">
              </span>
                        </div>
                        <Divider className="border-1 border-black mt-0.5"></Divider>
                        <ListContainer/>
                    </div>
                </div>
            </div>
        </div>
    );
}
