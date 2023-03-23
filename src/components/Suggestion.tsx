import React from "react";
import {
  ClockIcon,
  PaperClipIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";


function Suggestion(props:any) {
  return (
    <div className="flex items-center justify-between">
        <div className="flex space-x-2">
            <ClockIcon className="h-12 w-12 text-blue-600 p-2 bg-blue-100 rounded-full"/>
            <div>
                <dt className=" text-base">{props.props}</dt>
                <dl className=" text-sm text-gray-500">Capel Street,Rotunda</dl>
            </div>
        </div>
        <span>
      <HeartIcon className="h-12 w-12 text-pink-600 p-2 bg-pink-100 ring-1 ring-pink-600 rounded-full"/>
      </span>
    </div>
  );
}

export default Suggestion;
