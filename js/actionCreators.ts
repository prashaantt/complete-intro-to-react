import axios from 'axios'
import { Show } from "./Details";
import { Dispatch } from "redux";
import { ActionType, AppState } from "./reducers";
import { Action } from "redux";

export function setSearchTerm(searchTerm: string): Action<ActionType> & Partial<AppState> {
  return { type: ActionType.SetSearchTerm, searchTerm }
}

export function addOMDBData(imdbID: string, omdbData: Show): Action<ActionType> & Partial<AppState> {
  return { type: ActionType.AddOmdbData, omdbData: { [imdbID]: omdbData } }
}

export function getOMDBDetails(imdbID: string) {
  return function (dispatch: Dispatch<AppState, ActionType>, getState: () => AppState) {
    // axios.get(`http://www.omdbapi.com/?i=${imdbID}`)
    //   .then((response) => {
    //     dispatch(addOMDBData(imdbID, {
    //       description: "description", 
    //       imdbID,
    //       poster: "http://localhost:8080/details/tt3322312",
    //       title: "title",
    //       year: "1956"
    //     } as Show))
    //   })
    //   .catch((error) => console.error('axios error', error))
    dispatch(addOMDBData(imdbID, {
      description: `Description ${imdbID}`,
      imdbID,
      poster: `http://localhost:8080/details/${imdbID}`,
      title: `Title ${imdbID}`,
      year: `Year ${imdbID}`,
      trailer: `Trailer ${imdbID}`
    }))
  }
}
