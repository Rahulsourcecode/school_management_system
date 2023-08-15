import React from "react";
// import { useSelector } from "react-redux";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({state=false}) => {
  // const { data } = useSelector((store) => store.auth);
console.log(state);
  return state? <Outlet/> : <Navigate to='/'/>
};

export default PrivateRoute;
