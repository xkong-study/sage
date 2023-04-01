import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

import ListContainer from "./ListContainer";
import { FavouriteLocation } from "./FavouriteLocation";
import Divider from "./Divider";
import Suggestion from "./Suggestion";

export const Favourites = () => {
  return (
    <div className="px-4">
      <div className="w-full space-y-1">
        <div className="flex flex-col">
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

        <div className="flex justify-between space-x-2 overflow-y-auto scrollbar-none">
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
        <Divider
          dividerTitle="Suggestions"
          // titleContainerClassname="justify-center"
          // titleTextClassname="text-gray-600"
        />
        <ListContainer>
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
        </ListContainer>
      </div>
    </div>
  );
};

export default Favourites;
