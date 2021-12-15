import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  user: {},
  permissions_array:[]
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS: {
      const { user } = action.payload
      localStorage.setItem('sqillup_permissions', JSON.stringify(user?.permissions_array) || [])
      localStorage.setItem('sqillup_user', JSON.stringify(user) || [])
      
      state = {
        ...state,
        loading: false,
        user,
        permissions_array:user?.permissions_array || []
      }
      break
  }
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
