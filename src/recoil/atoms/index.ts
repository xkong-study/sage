import {
  DestinationSearchState,
  DirectionsResponse,
  Leg,
  Prediction,
} from "../../types";
import { atom } from "recoil";

export const destinationSearchAtom = atom<DestinationSearchState>({
  key: "destinationSearchAtom",
  default: {
    fromDestinationPrediction: null,
    toDestinationPrediction: null,
  },
});

export const directionsResponseArrayAtom = atom<DirectionsResponse[]>({
  key: "directionsResponseAtom",
  default: [],
});

export const navigationDataAtom = atom<Leg | undefined>({
  key: "navigationDataAtom",
  default: undefined,
});

export const predictionsDataAtom = atom<Prediction[]>({
  key: "predictionsDataAtom",
  default: [
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
});
