import React, { useRef } from "react";
import {
  ClockIcon,
  PaperClipIcon,
  HeartIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../utils";
import { BsArrowRightCircle } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { predictionsDataAtom } from "../recoil/atoms";
import { Prediction } from "../types";

interface SuggestionProps {
  mainText: string;
  subText?: string;
  handleGoToPrediction: () => void;
  data: Prediction;
}

function Suggestion({
  mainText,
  subText,
  handleGoToPrediction,
  data,
}: SuggestionProps) {
  const setPredictions = useSetRecoilState(predictionsDataAtom);

  const heartRef = useRef<SVGSVGElement>(null);
  const [heart, setHeart] = React.useState(!!data.heart);

  const heartAnimation = () => {
    if (!heartRef.current) {
      return;
    }
    heartRef.current.animate(
      [
        {
          transform: "scale(1)",
        },
        {
          transform: "scale(1.2)",
        },
        {
          transform: "scale(1)",
        },
      ],
      {
        duration: 400,
        easing: "ease-in-out",
      }
    );
  };

  React.useEffect(() => {
    if (heart) {
      heartAnimation();
      setPredictions((old) => {
        return old.map((item) => {
          if (item.place_id === data.place_id) {
            return {
              ...item,
              heart: true,
            };
          }
          return item;
        });
      });
    } else {
      setPredictions((old) => {
        return old.map((item) => {
          if (item.place_id === data.place_id) {
            return {
              ...item,
              heart: false,
            };
          }
          return item;
        });
      });
    }
  }, [heart]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <ClockIcon className="h-9 w-9 text-blue-600 p-2 bg-blue-100 rounded-full" />
        <div>
          <dt className=" text-base">{mainText}</dt>
          <dl className=" text-sm text-gray-500 text-ellipsis">{subText}</dl>
        </div>
      </div>
      <div className="inline-flex space-x-2 items-center">
        <button
          className={classNames(
            "ring-2 rounded-full transition-all ring-pink-400 active:scale-90 duration-200 ease-in-out",
            heart ? "bg-pink-100" : "bg-white"
          )}
        >
          <HeartIcon
            ref={heartRef}
            fill={heart ? "rgb(219 39 119)" : "none"}
            onClick={() => {
              setHeart(!heart);
            }}
            className="h-7 w-7 text-pink-600 p-1"
          />
        </button>
        <button
          onClick={handleGoToPrediction}
          className="ring-2 rounded-full ring-[#1da1f2] transition-transform active:scale-90 duration-200 ease-out"
        >
          <ArrowUturnRightIcon className="h-7 w-7 text-[#1da1f2] p-1" />
        </button>
      </div>
    </div>
  );
}

export default Suggestion;
