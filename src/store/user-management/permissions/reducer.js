import {
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAIL,
  ASSIGN_PERMISSION_SUCCESS,
  ASSIGN_PERMISSION_FAIL
} from "./actionTypes"

const INIT_STATE = {
  permissions: [],
  error: {},
}

const permissions = (state = INIT_STATE, {type, payload}) => {
  switch (type) {
    case GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: payload,
    }
      
    case GET_PERMISSIONS_FAIL:
      return {
        ...state,
        error: payload,
      }
    case ASSIGN_PERMISSION_SUCCESS: {
      return state
    }
    
    case ASSIGN_PERMISSION_FAIL: {
      const { data } = payload?.response || { data: null }
      const { message } = data || { message: "Not found" }
      return {
        ...state,
        error: message,
      }
    }
      
    case GET_PERMISSIONS_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default permissions;
