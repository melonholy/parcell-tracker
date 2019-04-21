import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";
import setAuthToken from "../setAuthToken";

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const registerUser = user => {
  return axios
    .post("/api/users/register", user)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const loginUser = user => dispatch => {
  return axios
    .post("/api/users/login", user)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};