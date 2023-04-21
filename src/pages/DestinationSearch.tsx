import React, { useCallback, useEffect, useState, useTransition } from "react";
import SearchBar from "../atoms/SearchBar";
import BackButton from "../atoms/BackButton";
import Divider from "../components/Divider";
import { useViewNavigate } from "../hooks";
import { BiCurrentLocation } from "react-icons/bi";
import Suggestion from "../components/Suggestion";
import {
  DestinationSearchState,
  LocationSearchResponse,
  Prediction,
  PredictionStatus,
} from "../types";

import { useRecoilState, useSetRecoilState } from "recoil";
import { destinationSearchAtom, predictionsDataAtom } from "../recoil/atoms";
import { DestinationSearchStateKeys } from "../types";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useParams } from "react-router-dom";

const TEST_DATA: LocationSearchResponse = {
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
  status: PredictionStatus.OK,
};

enum SearchStatus {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

interface SearchState {
  status: SearchStatus;
  error: string | null;
}

const SOCKET_URL = "ws://localhost:8080/places/1234";
function DestinationSearch() {
  const { predictionSearchStateKey } = useParams<{
    predictionSearchStateKey: keyof DestinationSearchState;
  }>();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    SOCKET_URL,
    {
      onError: (error) =>
        setSearchState({
          status: SearchStatus.ERROR,
          error: "Socket Connection Failed",
        }),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    }
  );

  const setPrediction = useSetRecoilState(destinationSearchAtom);

  const [searchState, setSearchState] = useState<SearchState>({
    status: SearchStatus.IDLE,
    error: null,
  });
  const [isPending, startTransition] = useTransition();

  const [predictions, setPredictions] = useRecoilState(predictionsDataAtom);

  const sendMessageWhenSearchChanges = (searchText: string) => {
    sendJsonMessage({
      search_text: searchText,
    });
  };

  const handleChosenPrediction = useCallback((prediction: Prediction) => {
    // console.log(prediction, predictionSearchStateKey);
    if (!prediction || !prediction.place_id || !predictionSearchStateKey)
      return;
    setPrediction((prevState) => ({
      ...prevState,
      [predictionSearchStateKey]: prediction,
    }));
    viewNavigate(-1);
  }, []);

  useEffect(() => {
    if (readyState !== ReadyState.OPEN || lastJsonMessage === null) return;
    const data = lastJsonMessage as any as Array<Prediction>;
    startTransition(() => {
      setPredictions(data);
    });
  }, [lastJsonMessage]);

  const viewNavigate = useViewNavigate();

  return (
    <>
      <div className="grid grid-cols-8 mt-6 my-4 mx-2">
        <BackButton
          onClick={() => viewNavigate(-1)}
          className="col-span-1 self-center"
        />
        <SearchBar
          className="col-span-6 self-center justify-self-center flex w-full"
          placeholder="Search location"
          onSearchChange={sendMessageWhenSearchChanges}
        />
        <BiCurrentLocation className="col-span-1 self-center justify-self-center h-8 w-8 border-2 border-gray-400 rounded-full p-1 cursor-pointer hover:bg-gray-100" />
      </div>
      <Divider dividerTitle="Suggestions" bgColour="bg-gray-50" />
      {predictions?.length > 0 && (
        <>
          {
            <Predictions
              predictions={predictions}
              handlePredictionClicked={handleChosenPrediction}
            />
          }
          <div className="flex justify-center border-t-2 mx-4 p-4">
            <button className="bg-[#1da1f2] p-2 px-4 rounded-full text-md text-white active:scale-90 transition-transform duration-200 ease-in-out">
              Show More
            </button>
          </div>
        </>
      )}
    </>
  );
}

function Predictions({
  predictions,
  handlePredictionClicked,
}: {
  predictions: Array<Prediction>;

  handlePredictionClicked: (prediction: Prediction) => void;
}) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {predictions.map((item) => (
        <li
          key={item?.place_id || item.description}
          className="px-4 py-4 sm:px-6"
        >
          <Suggestion
            mainText={item.structured_formatting.main_text}
            subText={item.structured_formatting.secondary_text}
            handleGoToPrediction={() => handlePredictionClicked(item)}
            data={item}
          />
        </li>
      ))}
    </ul>
  );
}

export default DestinationSearch;
