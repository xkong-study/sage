import React, { useState, useRef, useCallback, useEffect } from "react";
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
import {
  FullscreenControl,
  GeolocateControl,
  GeolocateControlRef,
  GeolocateResultEvent,
  Layer,
  Map,
  MapRef,
  NavigationControl,
  Source,
} from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import BackButton from "../atoms/BackButton";
import { useViewNavigate } from "../hooks";
import { useRecoilValue } from "recoil";
import { navigationDataAtom } from "../recoil/atoms";
import polyline from "@mapbox/polyline";
import type { Feature, FeatureCollection, Point } from "geojson";

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

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

// create a route stop layer with filter on the point geometry
const routeStopLayerStyle = {
  id: "route-stop",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
  filter: ["==", "$type", "Point"],
};
// route layer style
const routeLayerStyle = {
  id: "route",
  type: "line",
  paint: {
    "line-width": 5,
    "line-color": "#007cbf",
  },
};

export default function Page2() {
  const viewNavigate = useViewNavigate();
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelState>(
    SlidePanelState.Midway
  );

  const draw = useRef<MapboxDraw | null>(null);

  const [selfCoords, setSelfCoords] = useState<GeolocationCoordinates | null>(
    null
  );
  const navigationData = useRecoilValue(navigationDataAtom);
  const [routeFeatures, setRouteFeatures] =
    useState<FeatureCollection | null>();
  const [busStopsLayerData, setBusStopsLayerData] = useState<any>(null);

  useEffect(() => {
    if (navigationData) {
      const featureCollection: FeatureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      navigationData.steps.forEach((step) => {
        if (step.polyline?.points) {
          const routeLine: Feature = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [],
            },
          };
          routeLine.geometry = polyline.toGeoJSON(step.polyline?.points);
          featureCollection.features.push(routeLine);
        }
        let startLocation = step.start_location;
        let endLocation = step.end_location;
        let routeStartStop: Feature = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [startLocation.lng, startLocation.lat],
          },
        };
        let routeEndStop: Feature = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [endLocation.lng, endLocation.lat],
          },
        };
        featureCollection.features.push(routeStartStop);
        featureCollection.features.push(routeEndStop);
      });
      setRouteFeatures(featureCollection);
    }
  }, [navigationData]);

  useEffect(() => {
    // /busstops?lat=53.341587797747195&lng=-6.253200719554339&radius=2000
    const getBusStops = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/busstops?lat=${selfCoords?.latitude}&lng=${selfCoords?.longitude}&radius=2000`
      );
      const data = await res.json();
      return data;
    };
    if (selfCoords) {
      getBusStops().then((data) => {
        setBusStopsLayerData(data);
      });
    }
  }, [selfCoords]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const geolocateControlRef = useCallback((ref: GeolocateControlRef) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const mapRef = useRef<MapRef>(null);

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

  const handleMapOnLoad = useCallback((e: mapboxgl.MapboxEvent<undefined>) => {
    const map = e.target;
    draw.current = new MapboxDraw({
      touchEnabled: true,
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      styles: [
        {
          id: "gl-draw-polygon-fill",
          type: "fill",
          filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
          paint: {
            "fill-color": "#facc15",
            "fill-outline-color": "#facc15",
            "fill-opacity": 0.4,
          },
        },
        // polygon mid points
        {
          id: "gl-draw-polygon-midpoint",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
          paint: {
            "circle-radius": 3,
            "circle-color": "#ea580c",
          },
        },
        // polygon outline stroke
        // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#fb923c",
            "line-dasharray": [0.2, 2],
            "line-width": 2,
          },
        },
        // vertex point halos
        {
          id: "gl-draw-polygon-and-line-vertex-halo-active",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-color": "#FFF",
          },
        },
        // vertex points
        {
          id: "gl-draw-polygon-and-line-vertex-active",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 3,
            "circle-color": "#c2410c",
          },
        },

        // INACTIVE (static, already drawn)
        // line stroke
        {
          id: "gl-draw-line-static",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["==", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
        },
        // polygon fill
        {
          id: "gl-draw-polygon-fill-static",
          type: "fill",
          filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
          paint: {
            "fill-color": "#000",
            "fill-outline-color": "#000",
            "fill-opacity": 0.1,
          },
        },
        // polygon outline
        {
          id: "gl-draw-polygon-stroke-static",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
        },
      ],
    });

    map.addControl(draw.current, "top-left");
    map.on("draw.create", (e: any) => {
      console.log(draw.current?.getAll());
    });
  }, []);

  useEffect(() => {
    if (!draw.current) return;
  }, [draw.current]);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      <Map
        initialViewState={{
          ...center,
          zoom: 12,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiYXJvcmFydSIsImEiOiJjbGc3cTdzM28wN3BlM2RydjJzY2RkdGRpIn0.M7M0wt-FhOcmwoxM7yVZ-Q"
        attributionControl={false}
        ref={mapRef}
        onLoad={handleMapOnLoad}
      >
        <FullscreenControl position="top-left" />
        <GeolocateControl
          ref={geolocateControlRef}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          position="top-left"
          showAccuracyCircle={true}
          showUserLocation={true}
          showUserHeading={true}
          onGeolocate={({ coords }: GeolocateResultEvent) => {
            const map = mapRef.current?.getMap();
            if (map) {
              map.flyTo({
                center: [coords.longitude, coords.latitude],
                zoom: 16,
                essential: true,
                easing(time) {
                  return time;
                },
              });
            }
            setSelfCoords(coords);
          }}
        />
        <NavigationControl
          position="top-right"
          showCompass={true}
          visualizePitch={true}
        />
        {/* {!!busStopsLayerData && (
          <Source id="bus-stops" type="geojson" data={busStopsLayerData}>
            <Layer {...layerStyle} />
          </Source>
        )} */}
        {routeFeatures && (
          <Source id="route" type="geojson" data={routeFeatures}>
            <Layer {...routeLayerStyle} />
            <Layer {...routeStopLayerStyle} />
          </Source>
        )}
      </Map>
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
          onClick={() => viewNavigate("/Page4")}
          className="absolute -top-16 right-2 bg-[#1da1f2] p-3 rounded-lg"
        >
          <div className="bg-white h-6 w-6 rotate-45 p-1 rounded-md">
            <ArrowUturnRightIcon className="w-4 h-4 -rotate-45 text-[#1da1f2]" />
          </div>
        </button>
        <div className="w-6 h-2 bg-gray-500 rounded mx-auto my-2"></div>
        <div className="px-4">
          <div className="w-full space-y-1">
            <div className="flex flex-col items-end">
              <span className="w-full inline-flex items-center justify-end">
                {/* <BackButton /> */}
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

            <div className="flex space-x-2 overflow-x-auto scrollbar-none">
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
              <FavouriteLocation
                name={"Trinity College Dublin"}
                time={"19:02"}
                distance={"1.7"}
              />
            </div>
            <Divider dividerTitle="Suggestions" bgColour="bg-white" />
            {/* <ListContainer /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
