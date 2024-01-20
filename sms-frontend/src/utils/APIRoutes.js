export const host = process.env.REACT_APP_baseURL
export const loginRoute = `${host}/login`;
export const registerRoute = `${host}/register`;
export const logoutRoute = `${host}/logout`;
export const allUsersRoute = `${host}/allusers`;
export const sendMessageRoute = `${host}/messages/addmsg`;
export const recieveMessageRoute = `${host}/messages/getmsg`;
export const setAvatarRoute = `${host}/setavatar`;