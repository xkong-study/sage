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

let bicycleData = {
  bounds: {
    northeast: {
      lat: 53.3445743,
      lng: -6.259424,
    },
    southwest: {
      lat: 53.3210057,
      lng: -6.4269881,
    },
  },
  copyrights: "Map data ©2023",
  legs: [
    {
      distance: {
        text: "12.6 km",
        value: 12555,
      },
      duration: {
        text: "40 mins",
        value: 2370,
      },
      end_address: "College Green, Dublin 2, Ireland",
      end_location: {
        lat: 53.3443341,
        lng: -6.259424,
      },
      start_address: "Deansrath, Dublin, Co. Dublin, D22 W9H6, Ireland",
      start_location: {
        lat: 53.32155359999999,
        lng: -6.4269744,
      },
      steps: [
        {
          distance: {
            text: "63 m",
            value: 63,
          },
          duration: {
            text: "1 min",
            value: 11,
          },
          end_location: {
            lat: 53.3210057,
            lng: -6.4267981,
          },
          html_instructions:
            "Head <b>south</b> on <b>Castlegrange Dr</b> toward <b>Bóthar Ghráinseach an Chaisleáin</b>",
          polyline: {
            points: "ujmdIpgff@?@D@F?D?FCJCNEr@W",
          },
          start_location: {
            lat: 53.32155359999999,
            lng: -6.4269744,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.3 km",
            value: 279,
          },
          duration: {
            text: "1 min",
            value: 46,
          },
          end_location: {
            lat: 53.32188590000001,
            lng: -6.422887900000001,
          },
          html_instructions: "Turn <b>left</b> onto <b>Castlegrange Rd</b>",
          maneuver: "turn-left",
          polyline: {
            points: "igmdInfff@_@aFQiAMu@Mg@AICKAOCKIiAG]o@{CSmA",
          },
          start_location: {
            lat: 53.3210057,
            lng: -6.4267981,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.1 km",
            value: 117,
          },
          duration: {
            text: "1 min",
            value: 16,
          },
          end_location: {
            lat: 53.322725,
            lng: -6.423889700000001,
          },
          html_instructions: "Turn <b>left</b> onto <b>St Cuthberts Rd</b>",
          maneuver: "turn-left",
          polyline: {
            points: "ylmdI`nef@WLOLQLWVSRMNMRCLAB]z@",
          },
          start_location: {
            lat: 53.32188590000001,
            lng: -6.422887900000001,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.1 km",
            value: 128,
          },
          duration: {
            text: "1 min",
            value: 27,
          },
          end_location: {
            lat: 53.3230978,
            lng: -6.422633599999999,
          },
          html_instructions:
            "At the roundabout, take the <b>2nd</b> exit onto <b>Westbourne Dr</b>",
          maneuver: "roundabout-left",
          polyline: {
            points:
              "_rmdIhtef@?@?@?@?@?@?@?@?@?@?@A@?@?@?@A??@?@A??@A??@A??@A?A@A?A?A?A?A??AA?A??AA??AAA?AA??A?AA??A?AAA?A?A?A?A?A?A?A?A?A?A?A?AUy@?AAMCKAQEk@AcB",
          },
          start_location: {
            lat: 53.322725,
            lng: -6.423889700000001,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.1 km",
            value: 100,
          },
          duration: {
            text: "1 min",
            value: 14,
          },
          end_location: {
            lat: 53.3239787,
            lng: -6.422384300000001,
          },
          html_instructions: "Turn <b>left</b> onto <b>Westbourne Rise</b>",
          maneuver: "turn-left",
          polyline: {
            points: "ktmdIllef@oAOeAOOEAAECAE",
          },
          start_location: {
            lat: 53.3230978,
            lng: -6.422633599999999,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.5 km",
            value: 466,
          },
          duration: {
            text: "1 min",
            value: 66,
          },
          end_location: {
            lat: 53.3277733,
            lng: -6.420132199999999,
          },
          html_instructions: "Slight <b>left</b>",
          maneuver: "turn-slight-left",
          polyline: {
            points:
              "{ymdIzjef@YNC?E?ECGISUUYKKGGGEGEMMMKIKMQQSY_@e@m@IMIOEMCCACCAGAC?E@G@C@KDIDG@G@C?E?E?IAG?IAGCCAGEMIi@[ECC?AAEGoAo@WOAACAIA[IqA]OEC?C?",
          },
          start_location: {
            lat: 53.3239787,
            lng: -6.422384300000001,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "7 m",
            value: 7,
          },
          duration: {
            text: "1 min",
            value: 2,
          },
          end_location: {
            lat: 53.3277726,
            lng: -6.4200328,
          },
          html_instructions: "Turn <b>right</b> toward <b>Melrose Ave</b>",
          maneuver: "turn-right",
          polyline: {
            points: "qqndIx|df@?S",
          },
          start_location: {
            lat: 53.3277733,
            lng: -6.420132199999999,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "8 m",
            value: 8,
          },
          duration: {
            text: "1 min",
            value: 2,
          },
          end_location: {
            lat: 53.32784729999999,
            lng: -6.4200103,
          },
          html_instructions: "Turn <b>left</b> at <b>Melrose Green</b>",
          maneuver: "turn-left",
          polyline: {
            points: "qqndId|df@OC",
          },
          start_location: {
            lat: 53.3277726,
            lng: -6.4200328,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.2 km",
            value: 242,
          },
          duration: {
            text: "1 min",
            value: 40,
          },
          end_location: {
            lat: 53.3288344,
            lng: -6.4176201,
          },
          html_instructions: "Turn <b>right</b> onto <b>Melrose Ave</b>",
          maneuver: "turn-right",
          polyline: {
            points: "arndI`|df@I{ECoDAMAEACCCAAAAQAs@COAMCMESKa@S",
          },
          start_location: {
            lat: 53.32784729999999,
            lng: -6.4200103,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "13 m",
            value: 13,
          },
          duration: {
            text: "1 min",
            value: 3,
          },
          end_location: {
            lat: 53.3288654,
            lng: -6.417807499999999,
          },
          html_instructions: "Turn <b>left</b> onto <b>Lindisfarne Park</b>",
          maneuver: "turn-left",
          polyline: {
            points: "exndIbmdf@Gd@",
          },
          start_location: {
            lat: 53.3288344,
            lng: -6.4176201,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.1 km",
            value: 97,
          },
          duration: {
            text: "1 min",
            value: 18,
          },
          end_location: {
            lat: 53.3297154,
            lng: -6.4174621,
          },
          html_instructions: "Turn <b>right</b> toward <b>Grand Canal Wy</b>",
          maneuver: "turn-right",
          polyline: {
            points: "mxndIhndf@YM[Ky@Uy@U",
          },
          start_location: {
            lat: 53.3288654,
            lng: -6.417807499999999,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "3.9 km",
            value: 3870,
          },
          duration: {
            text: "11 mins",
            value: 674,
          },
          end_location: {
            lat: 53.3304896,
            lng: -6.3596302,
          },
          html_instructions: "Turn <b>right</b> onto <b>Grand Canal Wy</b>",
          maneuver: "turn-right",
          polyline: {
            points:
              "w}ndIbldf@D}CXiLJwE@uFAyC?a@?yA?AJkIDsCJaGB{A@gA?e@?I@yB@_@@kAB_CDmBBsBHaFDaFF_FFsD@u@Dq@@e@?s@?w@DgB`@o]X_W`@_[`@u[@{@BiCAi@Eu@Eo@AQCg@AYEo@MgBIkACa@Ey@gAmQi@aJW{DOgC[yEEy@?AI}A{B_`@C_@c@eHI{AAaA?K",
          },
          start_location: {
            lat: 53.3297154,
            lng: -6.4174621,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "2.1 km",
            value: 2119,
          },
          duration: {
            text: "7 mins",
            value: 432,
          },
          end_location: {
            lat: 53.3342311,
            lng: -6.328431,
          },
          html_instructions:
            "Slight <b>left</b> to stay on <b>Grand Canal Wy</b>",
          maneuver: "turn-slight-left",
          polyline: {
            points:
              "qbodItbye@EMCMEWCOCKCOAK?CCSAOAC?AAEAE?CAC?A?C?C?I?E@C@M?O@G?GA[Ek@WkD?Cg@oJc@qHk@yJOaCYaFu@yLK}BKmDMsAQcBAY{@cOs@aL?CWaFK{AKyAMuAIsAAKYiFGgAMoBSeEa@sGEcAAc@Ck@AMEm@GaAM{BKmBO}BEk@QyBKwACW?O?GACACAAAA?C?A?E@A",
          },
          start_location: {
            lat: 53.3304896,
            lng: -6.3596302,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.8 km",
            value: 772,
          },
          duration: {
            text: "2 mins",
            value: 130,
          },
          end_location: {
            lat: 53.3395516,
            lng: -6.3210359,
          },
          html_instructions:
            'Slight <b>left</b> onto <b>Naas Rd</b>/<wbr/><b>R810</b><div style="font-size:0.9em">Continue to follow R810</div>',
          maneuver: "turn-slight-left",
          polyline: {
            points:
              "}yodIt_se@ISOKUUQQIKKKe@e@Ye@sAmBKOW_@s@eAa@o@g@y@i@y@_@k@q@cAGIOYy@yAGImBoDGOGICCy@_BS]IQcAiBg@aAS]EIIMKOEEQUu@m@",
          },
          start_location: {
            lat: 53.3342311,
            lng: -6.328431,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "3.2 km",
            value: 3155,
          },
          duration: {
            text: "10 mins",
            value: 624,
          },
          end_location: {
            lat: 53.3433767,
            lng: -6.275053199999999,
          },
          html_instructions:
            'Turn <b>right</b> onto <b>Emmet Rd</b>/<wbr/><b>R810</b><div style="font-size:0.9em">Continue to follow R810</div>',
          maneuver: "turn-right",
          polyline: {
            points:
              "e{pdInqqe@Hc@B[Dk@@IBWDg@?S@K?W?E?IAIAMCISgASeAESG_@EWUuAi@_EGc@Ec@Ec@Gq@AOMeBEg@Go@KyAAICa@GaAGu@?MACGw@Ek@Ge@AOAIAYC[A[AY?U?Y?A?m@@gAF_B@]@QBu@@o@@w@?w@AS?gAAgAAo@?AE_E?W?E?Q?u@?YCiAAMCmB?[CaACcA?[?OAc@As@?S?Q?I@e@?Q@YBw@@]?I?K?QA[ASMyAMyAGo@AUGs@IgAEa@QkBAMC[Iy@KuAEa@AOAMEg@AOAMEs@Cs@?AGkAAUAYC_@CWGs@AKMiACQCUMmACSWcBEUEOGUKg@WmAESAGQw@GYG]Ki@Ic@Ii@SuA[cCG[]oCQaBG_@Ey@KmAK_@Su@Gg@G_@Ce@?ACe@EuAEiAC_BEgCAo@?CAkA?_@?W?w@@W?m@BeAF{ADq@BaADkB@u@BgA@aADmANeDDg@BUD]Lw@LeAJ{@Fi@@QDe@Fm@@GDo@BiD?Y?i@@a@?G?KAM?EAGKaAEY[kCIe@Iq@C[Ki@Ig@Km@CW",
          },
          start_location: {
            lat: 53.3395516,
            lng: -6.3210359,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.2 km",
            value: 233,
          },
          duration: {
            text: "1 min",
            value: 79,
          },
          end_location: {
            lat: 53.3429462,
            lng: -6.2716724,
          },
          html_instructions: "Slight <b>right</b> onto <b>R108</b>",
          maneuver: "turn-slight-right",
          polyline: {
            points: "csqdI`rhe@GsAFy@BUD_@Hs@H}@@GLoAXmCPgBC_@",
          },
          start_location: {
            lat: 53.3433767,
            lng: -6.275053199999999,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.1 km",
            value: 143,
          },
          duration: {
            text: "1 min",
            value: 20,
          },
          end_location: {
            lat: 53.3435976,
            lng: -6.270024100000001,
          },
          html_instructions:
            'Continue onto <b>Christchurch Pl</b>/<wbr/><b>R137</b><div style="font-size:0.9em">Continue to follow R137</div>',
          polyline: {
            points: "mpqdI||ge@G{@AOAIEe@?E?SCKEU?KAAE[ACCMEKAEMWKKIGIEKGUI",
          },
          start_location: {
            lat: 53.3429462,
            lng: -6.2716724,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "0.7 km",
            value: 699,
          },
          duration: {
            text: "2 mins",
            value: 104,
          },
          end_location: {
            lat: 53.3445743,
            lng: -6.2597195,
          },
          html_instructions:
            'Turn <b>right</b> onto <b>Lord Edward St</b>/<wbr/><b>R137</b><div style="font-size:0.9em">Continue to follow R137</div>',
          maneuver: "turn-right",
          polyline: {
            points:
              "otqdIrrge@CKAIOkAc@uDW}BGc@Ca@IsACs@A[CgAA_@?U?s@?yB?eB?eA?g@C}ACyAAiAAaAASI]Ai@AgACe@?MCe@Iw@Cc@?EG{BC_@ASESGc@",
          },
          start_location: {
            lat: 53.3435976,
            lng: -6.270024100000001,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "32 m",
            value: 32,
          },
          duration: {
            text: "1 min",
            value: 45,
          },
          end_location: {
            lat: 53.3444312,
            lng: -6.2594977,
          },
          html_instructions:
            'Take the crosswalk<div style="font-size:0.9em">Walk your bicycle</div>',
          polyline: {
            points: "qzqdIfree@FCDAFAJCE_@",
          },
          start_location: {
            lat: 53.3445743,
            lng: -6.2597195,
          },
          travel_mode: "BICYCLING",
        },
        {
          distance: {
            text: "12 m",
            value: 12,
          },
          duration: {
            text: "1 min",
            value: 17,
          },
          end_location: {
            lat: 53.3443341,
            lng: -6.259424,
          },
          html_instructions: "Turn <b>right</b> onto <b>R138</b>",
          maneuver: "turn-right",
          polyline: {
            points: "uyqdIzpee@RO",
          },
          start_location: {
            lat: 53.3444312,
            lng: -6.2594977,
          },
          travel_mode: "BICYCLING",
        },
      ],
      traffic_speed_entry: [],
      via_waypoint: [],
    },
  ],
  overview_polyline: {
    points:
      "ujmdIpgff@RBvAe@_@aFQiA[}AKq@QgBcAiFg@Zi@d@a@b@MRCL_@~@?@?B?D?FGNOBIKCU?EU_AMwAAcBoAOuAUGEAEYNI?EC}@eAe@a@w@}@sAkBOWY@a@NW@c@GcAm@ICGImBcAgCo@G??SOCI{EE}DIOwAI[Iu@_@Gd@YMuAa@y@UD}Cd@aS?kO\\cVNyPXeTNsKFgBFyFz@ou@bAuw@DeEG_BMcCqDkl@q@}KeC}b@g@eIK}CEYQaAOoACa@Bg@@OGgAWoDkAaTkCwc@WkH_@wDqBc]c@}HYoDm@qKa@uHg@wIEoAG{@q@iLg@uGC_@CI@GISOKg@g@UW_AkA_B}BuCoEcCsD_EmHwEyIc@u@QUQUu@m@L_AFu@J_BAq@m@eDi@aD}@kHw@eKQiCWyCI{AAkA@uBH}BHoDKeN?gBIaFKoHB{ADkBAm@OmB_@sEcAqLWmEO{C[aDYiC]yBMe@k@qCm@yCcAgH_AmHQgC_@uAOgACg@SeHIgG@gCJoEHsBFaDDiCTsF\\sCb@}DTkCDoGAg@o@oFc@}CUuAKkBZcDr@cHPgBC_@IkAGiAKo@Km@GQYc@SMa@Qy@wG_@aDMuBEoAEgB?iH?mBGwDCkCASI]CqBCs@QgCK{CGg@Gc@FCLCJCE_@RO",
  },
  summary: "Grand Canal Wy and R810",
  warnings: [
    "Bicycling directions are in beta. Use caution – This route may contain streets that aren't suited for bicycling.",
  ],
  waypoint_order: [],
};
interface TransportRoutesProps {
  selectedTransport: ModeOfTransport | null;
}
function TransportRoutes({ selectedTransport }: TransportRoutesProps) {
  const data = useRecoilValue(directionsResponseArrayAtom);

  console.log("data", data);

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

interface OtherRouteProps {
  data: Leg;
}
function OtherRoute({ data }: OtherRouteProps) {
  console.log(data);
  return <></>;
}

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
