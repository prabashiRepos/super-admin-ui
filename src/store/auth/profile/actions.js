import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
} from "./actionTypes"

export const getProfile = user => {
  return {
    type: GET_PROFILE,
    payload: user,
    meta: {
      thunk: true,
    },
  }
}

export const getProfileSuccess = (msg, { thunk }) => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: msg,
    meta: {
      thunk,
    },
  }
}

export const getProfileError = (error, { thunk }) => {
  return {
    type: GET_PROFILE_ERROR,
    payload: error,
    error: true,
    meta: {
      thunk,
    },
  }
}

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: user,
    meta: {
      thunk: true,
    },
  }
}

export const profileSuccess = (msg, { thunk }) => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
    meta: {
      thunk,
    },
  }
}

export const profileError = (error, { thunk }) => {
  return {
    type: PROFILE_ERROR,
    payload: error,
    error: true,
    meta: {
      thunk,
    },
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}
