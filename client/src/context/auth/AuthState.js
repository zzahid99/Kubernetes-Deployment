import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  let url = window.REACT_APP_BRAND;
  console.log("url is - " + url);
  // Load User
  const loadUser = async () => {
    // @todo - load token into global headers
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(url + "/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    //debugger;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      //console.log(process.env)

      //debugger;

      const res = await axios.post(url + "/api/users", formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(url + "/api/auth", formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
