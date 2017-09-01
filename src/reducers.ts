import { Show } from "./Details";
import { Action } from "redux";

const DEFAULT_STATE = {
  searchTerm: '',
  omdbData: {}
} as AppState;

export interface AppState {
  searchTerm: string;
  omdbData: { [imdbId: string]: Show };
}

export enum ActionType {
  SetSearchTerm = "SET_SEARCH_TERM",
  AddOmdbData = "ADD_OMDB_DATA"
}

// export interface Action {
//   type: ActionType;
// }

const getUpdatedSearchTerm = (state: AppState, action: Action & AppState): AppState => {
  return { ...state, searchTerm: action.searchTerm };
}

const getUpdatedOMDBData = (state: AppState, action: Action & AppState): AppState => {
  return { ...state, omdbData: { ...state.omdbData, ...action.omdbData } } as AppState;
}

export const rootReducer = (state = DEFAULT_STATE, action: Action & AppState): AppState => {
  switch (action.type) {
    case ActionType.SetSearchTerm:
      return getUpdatedSearchTerm(state, action)
    case ActionType.AddOmdbData:
      return getUpdatedOMDBData(state, action)
    default:
      return state
  }
}
