import {
  ADD_USER_LOADING,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  loading:false,
  userProfile: {},
  error: "",
  form_errors:[]
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        users: data,
      }
    }
    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS: {
      const { data }=action.payload
      return {
        ...state,
        users: [...state.users, data],
      }
    }
    case ADD_USER_FAIL: {
      const { data } = action.payload.response
      const { message, errors} = data
      
      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      }

    case UPDATE_USER_SUCCESS: {
        const { data } = action.payload
        const roleIndex = state.users.findIndex(item => item.id == data.id)
        return {
          ...state,
          users: [
            ...state.users.map((item,index) => {
              if (index !== roleIndex) {
                return item
              }
              return {
                ...item,
                ...data
              }
            })
            
          ],
        }
      }
    case UPDATE_USER_FAIL: {
      const { data } = payload.response
      const { message, errors } = data
          
      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(
            user => user.id.toString() !== action.payload.id.toString()
          ),  
        }
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
