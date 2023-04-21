import React, { useState, useRef, useCallback, useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import { classNames, getStopsNearAccidents } from "../utils";
import ListContainer from "../components/ListContainer";
import FavouriteLocation from "../components/FavouriteLocation";
import Divider from "../components/Divider";
import {
  lineIntersect,
  lineString,
  pointToLineDistance,
  point,
} from "@turf/turf";
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

import { useViewNavigate } from "../hooks";
import { useRecoilValue } from "recoil";
import { navigationDataAtom } from "../recoil/atoms";
import polyline from "@mapbox/polyline";
import type {
  Feature,
  FeatureCollection,
  LineString,
  Point,
  Polygon,
  Position,
} from "geojson";
import Suggestion from "../components/Suggestion";
import { LocationSearchResponse, Prediction } from "../types";

const TEST_DATA: any = {
  predictions: [
    {
      description: "Trinity College, College Green, Dublin 2",
      matched_substrings: [{ length: 7, offset: 0 }],
      place_id: "ChIJ3Y7HLZsOZ0gRZ2FxjA3-ACc",
      reference: "ChIJ3Y7HLZsOZ0gRZ2FxjA3-ACc",
      structured_formatting: {
        main_text: "Trinity College",
        main_text_matched_substrings: [{ length: 7, offset: 0 }],
        secondary_text: "College Green, Dublin 2",
      },
      terms: [
        { offset: 0, value: "Trinity College" },
        { offset: 17, value: "College Green" },
        { offset: 32, value: "Dublin 2" },
      ],
      types: [
        "tourist_attraction",
        "university",
        "point_of_interest",
        "establishment",
      ],
    },
    {
      description:
        "Trinity College Library, College Green, South-East Inner City, Dublin 2",
      matched_substrings: [{ length: 7, offset: 0 }],
      place_id: "ChIJVdIER5sOZ0gRbNBq2VcIW9Q",
      reference: "ChIJVdIER5sOZ0gRbNBq2VcIW9Q",
      structured_formatting: {
        main_text: "Trinity College Library",
        main_text_matched_substrings: [{ length: 7, offset: 0 }],
        secondary_text: "College Green, South-East Inner City, Dublin 2",
      },
      terms: [
        { offset: 0, value: "Trinity College Library" },
        { offset: 25, value: "College Green" },
        { offset: 40, value: "South-East Inner City" },
        { offset: 63, value: "Dublin 2" },
      ],
      types: ["library", "point_of_interest", "establishment"],
    },
    {
      description: "Trinity Hall, Dartry Road, Dartry, Dublin 6",
      matched_substrings: [{ length: 7, offset: 0 }],
      place_id: "ChIJg_re5P8LZ0gRpm7PRFteXog",
      reference: "ChIJg_re5P8LZ0gRpm7PRFteXog",
      structured_formatting: {
        main_text: "Trinity Hall",
        main_text_matched_substrings: [{ length: 7, offset: 0 }],
        secondary_text: "Dartry Road, Dartry, Dublin 6",
      },
      terms: [
        { offset: 0, value: "Trinity Hall" },
        { offset: 14, value: "Dartry Road" },
        { offset: 27, value: "Dartry" },
        { offset: 35, value: "Dublin 6" },
      ],
      types: ["point_of_interest", "establishment"],
    },
    {
      description: "Trinity College Sports Centre, Pearse Street, Dublin 2",
      matched_substrings: [{ length: 7, offset: 0 }],
      place_id: "ChIJiXbRr5EOZ0gRwAvWG0ZddPc",
      reference: "ChIJiXbRr5EOZ0gRwAvWG0ZddPc",
      structured_formatting: {
        main_text: "Trinity College Sports Centre",
        main_text_matched_substrings: [{ length: 7, offset: 0 }],
        secondary_text: "Pearse Street, Dublin 2",
      },
      terms: [
        { offset: 0, value: "Trinity College Sports Centre" },
        { offset: 31, value: "Pearse Street" },
        { offset: 46, value: "Dublin 2" },
      ],
      types: ["gym", "point_of_interest", "health", "establishment"],
    },
    {
      description: "Trinity Business School, Pearse Street, Dublin 2",
      matched_substrings: [{ length: 7, offset: 0 }],
      place_id: "ChIJ60tDQZAOZ0gRvJ_MbtfzNxs",
      reference: "ChIJ60tDQZAOZ0gRvJ_MbtfzNxs",
      structured_formatting: {
        main_text: "Trinity Business School",
        main_text_matched_substrings: [{ length: 7, offset: 0 }],
        secondary_text: "Pearse Street, Dublin 2",
      },
      terms: [
        { offset: 0, value: "Trinity Business School" },
        { offset: 25, value: "Pearse Street" },
        { offset: 40, value: "Dublin 2" },
      ],
      types: ["university", "university", "point_of_interest", "establishment"],
    },
  ],
};

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
// route layer style
const accidentPreventionLayerStyle = {
  id: "accident",
  type: "line",
  paint: {
    "line-width": 20,
    "line-color": "red",
  },
};

export default function Navigation() {
  const viewNavigate = useViewNavigate();
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelState>(
    SlidePanelState.Midway
  );

  const draw = useRef<MapboxDraw | null>(null);

  const [selfCoords, setSelfCoords] = useState<GeolocationCoordinates | null>(
    null
  );
  const navigationData = useRecoilValue(navigationDataAtom);
  const [routeFeatures, setRouteFeatures] = useState<FeatureCollection>();
  const [busStopsLayerData, setBusStopsLayerData] = useState<any>(null);

  let [predictions, setPredictions] = useState<any[]>(TEST_DATA.predictions);

  const [accidentPreventionLayerData, setAccidentPreventionLayerData] =
    useState<FeatureCollection>({
      type: "FeatureCollection",
      features: [],
    });

  const [accidentsPolygons, setAccidentsPolygons] = useState<
    FeatureCollection<Polygon> | undefined
  >(undefined);

  useEffect(() => {
    if (routeFeatures && accidentsPolygons) {
      const intersections = getStopsNearAccidents(
        routeFeatures,
        accidentsPolygons
      );

      let features: any[] = [];
      let avoidLines = intersections.map(([[fromPoint, toPoint], polygon]) => {
        // return getSmallestPolyLineAlongPolygon({
        //   from_point: fromPoint,
        //   to_point: toPoint,
        //   polygon,
        // });
        return [fromPoint, toPoint];
      });

      // try {
      //   console.log({
      //     from_point: fromPoint,
      //     to_point: toPoint,
      //     feature_collection: accidentsPolygons,
      //   });
      //   let req = await fetch("http://127.0.0.1:8000/api/shortest_path/", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       from_point: fromPoint,
      //       to_point: toPoint,
      //       feature_collection: accidentsPolygons,
      //     }),
      //   });
      //   let data = await req.json();
      //   let feature: Feature = {
      //     type: "Feature",
      //     properties: {},
      //     geometry: {
      //       type: "LineString",
      //       coordinates: data["coordinates"],
      //     },
      //   };
      //   features.push(feature);
      // } catch (e) {
      //   console.log(e);
      // }
    }
  }, [accidentsPolygons, routeFeatures]);

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

  // dublin's center
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
      const features = draw.current?.getAll();
      console.log(features);
      setAccidentsPolygons(features as FeatureCollection<Polygon>);
    });
  }, []);

  useEffect(() => {
    if (!draw.current) return;
  }, [draw.current]);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      <Map
        data-testid="map"
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
        {!!busStopsLayerData && (
          <Source id="bus-stops" type="geojson" data={busStopsLayerData}>
            <Layer {...(layerStyle as any)} />
          </Source>
        )}
        {routeFeatures && (
          <Source id="route" type="geojson" data={routeFeatures}>
            <Layer {...(routeLayerStyle as any)} />
            <Layer {...(routeStopLayerStyle as any)} />
          </Source>
        )}
        {accidentPreventionLayerData &&
          accidentPreventionLayerData.features.length > 0 && (
            <Source
              id="accident"
              type="geojson"
              data={accidentPreventionLayerData}
            >
              <Layer {...(accidentPreventionLayerStyle as any)} />
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
          onClick={() => viewNavigate("/directions")}
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
            <ul role="list" className="divide-y divide-gray-200">
              {predictions.map((item) => (
                <li
                  key={item?.place_id || item.description}
                  className="px-4 py-4 sm:px-6"
                >
                  <Suggestion
                    mainText={item.structured_formatting.main_text}
                    subText={item.structured_formatting.secondary_text}
                    handleGoToPrediction={() => void 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
