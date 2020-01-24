import axios from "axios";
import { FETCH_USER } from "./types";

//we define what the fetch user does when dispatched
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/currentUser");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post("/api/stripe",token);

  dispatch({type: FETCH_USER, payload: res.data});
}