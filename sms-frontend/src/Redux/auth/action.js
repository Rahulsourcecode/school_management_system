import { toast } from "react-toastify";
import * as types from "./types";
import axios from "axios";
const notify = (text) => toast(text);
// Set the base URL for the API requests
export const baseURL = "http://localhost:3001/";
export const axioss = axios.create({
  withCredentials: true,
  baseURL: baseURL,
})

// login student
export const StudentLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_STUDENT_REQUEST });
    const res = await axioss.post(`/students/login`, data);
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
    const res = await axioss.post(`/teachers/login`, data);
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
    const res = await axioss.post(`/admin/login`, data);
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
export const TeacherRegister = (doc) => async () => {
  try {
    const res = await axioss.post(`/teachers/register`, doc);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// register student
export const StudentRegister = (data) => async () => {
  try {
    const res = await axioss.post(`/admin/studentregister`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// REGISTER ADMIN
export const AdminRegister = (data) => async () => {
  try {
    const res = await axioss.post(`/admin/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//publish notice
export const AddNotice = (data) => async () => {
  console.log("hello");
  try {
    const res = await axioss.post(`/admin/createnotice`, data);
    return res.data;
  } catch (error) {
    console.log("Axios error:", error);
  }
};
//

export const feedback = (data) => async () => {
  try {
    const res = await axioss.post("/students/submitFeedback", data);
    return res;
  } catch (error) {
    console.log(error);
  }
}


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
    await axioss.patch(`/students/${id}`, data).then((res) => dispatch({ type: types.EDIT_STUDENT_SUCCESS, payload: { user: res.data.user, token: res.data.token } }))
  } catch (error) {
    console.log(error);
  }
};

//update teacher
export const UpdateTeacher = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TEACHER_REQUEST });
    await axioss.patch(`/teachers/${id}`, data).then((res) => dispatch({ type: types.EDIT_TEACHER_SUCCESS, payload: { user: res.data.user, token: res.data.token } }))

  } catch (error) {
    console.log(error);
  }
};

//update admin
export const UpdateAdmin = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_ADMIN_REQUEST });
    await axioss.patch(`/admin/${id}`, data).then((res) => dispatch({ type: types.EDIT_ADMIN_SUCCESS, payload: { user: res.data.user, token: res.data.token } }))

  } catch (error) {
    console.log(error)
  }
};


//send password

export const SendPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.SEND_PASSWORD_REQUEST });
    const res = await axioss.post(`/admin/password`, data);
    dispatch({ type: types.SEND_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//forgot password
export const forgetPassword = (data) => async () => {
  try {
    const res = await axioss.post(`/general/forgotpassword`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//verify otp
export const VerifyOtp = (data) => async () => {
  try {
    const res = await axioss.post("/general/Verifyotp", data);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

//set password
export const setpassword = (data) => async () => {
  try {
    const res = await axioss.post("/general/resetpassword", data);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}
//create new Class
export const NewClass = (data) => async () => {
  console.log(data)
  try {
    const res = await axioss.post(`/admin/createclass`, data);
    return res
  } catch (error) {
    console.log("Axios error:", error);
    return
  }
};

//apply for leave
export const applyLeave = (data) => async () => {
  console.log(data)
  try {
    const res = await axioss.post('teachers/applyleave', data)
    return res
  } catch (error) {

  }
}

//ask Doubt
export const askDoubt = (data) => async () => {
  try {
    const res = await axioss.post("/general/askdoubt", data)
    return res
  } catch (error) {
    console.log(error)
  }
}


export const getContacts = (type) => async () => {
  try {
    console.log(type)
    const res = await axioss.post("/general/getall", { type })
    return res.data
  } catch (error) {
    console.log(error)
  }
}