import * as types from "./types";
import axios from "axios";

// Set the base URL for the API requests
export const baseURL = "http://localhost:3001";
export const axioss = axios.create({
  baseURL: baseURL,
});
// login student
export const StudentLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_STUDENT_REQUEST });
    const res = await axios.post(`${baseURL}/students/login`, data);
    dispatch({
      type: types.LOGIN_STUDENT_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_STUDENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// login teacher
export const TeacherLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_TEACHER_REQUEST });
    const res = await axios.post(`${baseURL}/teachers/login`, data);
    dispatch({
      type: types.LOGIN_TEACHER_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_TEACHER_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// login admin
export const AdminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    const res = await axios.post(`${baseURL}/admin/login`, data);
    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// register Teacher
export const TeacherRegister =(doc) => async () => {
  try {
    const res = await axios.post(`${baseURL}/teachers/register`,doc);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// register student
export const StudentRegister = (data) => async () => {
  try {
    const res = await axios.post(`${baseURL}/admin/studentregister`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// REGISTER ADMIN
export const AdminRegister = (data) => async () => {
  try {
    const res = await axios.post(`${baseURL}/admin/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//publish notice
export const AddNotice = (data) => async () => {
  console.log("hello");
  try {
    const res = await axios.post(`${baseURL}/admin/createnotice`,data);
    return res.data;
  } catch (error) {
    console.log("Axios error:", error);
  }
};





// // REGISTER bus
// export const BusRegister = (data) => async (dispatch) => {
//   try {
//     await axios.post(`${baseURL}/bus/add`, data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// logout user
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

//update student
export const UpdateStudent = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_STUDENT_REQUEST });
    const res = await axios.patch(`${baseURL}/students/${id}`, data);
    dispatch({ type: types.EDIT_STUDENT_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

//update teacher
export const UpdateTeacher = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TEACHER_REQUEST });
    const res = await axios.patch(`${baseURL}/teachers/${id}`, data);
    dispatch({ type: types.EDIT_TEACHER_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

//update admin
export const UpdateAdmin =(data,id)=>async (dispatch) => {
  try {
    dispatch({type:types.EDIT_ADMIN_REQUEST});
    const res = await axios.patch(`${baseURL}/admin/${id}`,data);
    dispatch({type:types.EDIT_ADMIN_SUCCESS, payload:res.data.user})
  } catch (error) {
    console.log(error)
  }
};


//send password

export const SendPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.SEND_PASSWORD_REQUEST });
    const res = await axios.post(`${baseURL}/admin/password`, data);
    dispatch({ type: types.SEND_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//forgot password
export const forgetPassword = (data) => async () => {
  try {
    const res = await axios.post(`${baseURL}/general/forgotpassword`,data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//verify otp
export const VerifyOtp = (data) => async()=>{
  try{
    const res = await axioss.post("/general/Verifyotp",data);
    return res.data;
  }catch (error){
    console.log(error)
  }
}

//set password
export const setpassword =(data) =>async()=>{
 try {
  const res = await axioss.post("/general/resetpassword",data);
  return res.data;
 } catch (error) {
  console.log(error)
 }
}

export const NewClass = (data) => async () => {
  console.log(data)
  try {
    const res=await axios.post(`${baseURL}/admin/createclass`,data);
    return res
  } catch (error) {
    console.log("Axios error:", error);
    return 
  }
};