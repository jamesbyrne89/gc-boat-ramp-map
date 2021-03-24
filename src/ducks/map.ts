import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import { deduplicateArray } from "../utils/helpers";

interface State {
  isLoading: boolean;
  hasError: boolean;
  ramps?: FeatureCollection<Geometry, GeoJsonProperties> & {
    totalFeatures: number;
  };
  materials?: string[];
}

interface Action {
  type:
    | "FILTER_BY_SIZE"
    | "FILTER_BY_MATERIAL"
    | "GET_RAMPS_REQUEST"
    | "GET_RAMPS_SUCCESS"
    | "GET_RAMPS_ERROR";
  payload?: any;
}

const initialState = {
  isLoading: false,
  hasError: false,
  materials: [],
};

export default function mapDataReducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case "FILTER_BY_SIZE":
      return { ...state, ramps: { ...state.ramps, features: action.payload } };
    case "FILTER_BY_MATERIAL":
      return { ...state, ramps: { ...state.ramps, features: action.payload } };
    case "GET_RAMPS_REQUEST":
      return { ...state, isLoading: true };
    case "GET_RAMPS_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case "GET_RAMPS_ERROR":
      return { ...state, hasError: true, isLoading: false };
    default:
      return state;
  }
}

export const filterBySize = () => ({
  type: "FILTER_BY_SIZE",
});

export const filterByMaterial = () => ({
  type: "FILTER_BY_MATERIAL",
});

export const loadData = (
  data: FeatureCollection<Geometry, GeoJsonProperties>
): Action => ({
  type: "GET_RAMPS_SUCCESS",
  payload: {
    ramps: data,
    materials: deduplicateArray<string>(
      data.features.map(
        (f: Feature<Geometry, GeoJsonProperties>) => f?.properties?.material
      )
    ),
  },
});
