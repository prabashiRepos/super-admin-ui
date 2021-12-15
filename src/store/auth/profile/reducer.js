import { GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR, PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG } from "./actionTypes"

const initialState = {
  profile:{},
  error: "",
  success: "",
  form_errors:[]
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      state = { ...state }
      break
    case GET_PROFILE_SUCCESS: {
      state = { ...state, profile: action.payload }
      break
    }
    case GET_PROFILE_ERROR: {
      const { data } = action.payload.response
      // const { message, errors } = data
      return {
        ...state,
        error: "Profile failed to update",
        form_errors: data,
      }
      break
    }
    case EDIT_PROFILE:
      state = { ...state }
      break
    case PROFILE_SUCCESS: {
      state = { ...state, success: action.payload }
      break
    }
    case PROFILE_ERROR: {
      const { data } = action.payload.response
      // const { message, errors } = data

      return {
        ...state,
        error: "Profile failed to update",
        form_errors: data,
      }
      break
    }
    case RESET_PROFILE_FLAG :
      state = { ...state, success: null }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default profile
