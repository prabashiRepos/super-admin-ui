import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "./actionTypes"

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
    meta:{
      thunk:true
    }
  }
}

export const userForgetPasswordSuccess = (message,{thunk}) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
    meta: {
      thunk
    }
  }
}

export const userForgetPasswordError = (error, { thunk }) => {
  
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: error,
    error:true,
    meta: {
      thunk
    }
  }
}
export const userResetPassword = (data, history) => {
  return {
    type: RESET_PASSWORD,
    payload: { data, history },
    meta:{
      thunk:true
    }
  }
}

export const userResetPasswordSuccess = (message,{thunk}) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: message,
    meta: {
      thunk
    }
  }
}

export const userResetPasswordError = (message, {thunk}) => {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: message,
    error:true,
    meta: {
      thunk
    }
  }
}
