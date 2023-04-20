import { DestinationSearchState, DirectionsResponse, Leg } from "../../types";
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
