import * as types from "./types";
import axios from "axios";
import { baseURL } from "../auth/action";
// Create Report
export const CreateReport = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "",
      data
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ADD doubts
export const AddDoubts = (data) => async () => {
  try {
    const res = await axios.post(
      "",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//GET doubts
export const GetDoubts = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOUBT_REQUEST });
    const res = await axios.post(
      "",
      data
    );
    dispatch({
      type: types.GET_DOUBT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//get notices
export const GetNotices = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_NOTICE_REQUEST });
    const res = await axios.get(
      `${baseURL}/admin/getnotices`,
      data
    );
    dispatch({
      type: types.GET_NOTICE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};


// delete doubt
export const deleteDoubt = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DOUBT_REQUEST });
    await axios.delete(
      ``
    );
    dispatch({
      type: types.DELETE_DOUBT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};



// GET ALL DATA
export const GetAllData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALLDATA_REQUEST });
    const res = await axios.get(
      `https://ill-blue-wildebeest-kilt.cyclic.app/schools`
    );
    dispatch({
      type: types.GET_ALLDATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL report DETAILS
export const GetAllReport = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      ``,
      data
    );
    dispatch({
      type: types.GET_REPORT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE Reports
export const DeleteReports = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      ``
    );
    console.log(res.data);
    dispatch({
      type: types.DELETE_REPORT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

