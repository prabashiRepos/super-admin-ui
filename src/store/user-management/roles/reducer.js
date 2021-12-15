import {
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  roles: [],
  error: {},
  form_errors:{}
}

const roles = (state = INIT_STATE, { type,payload }) => {
  switch (type) {
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: payload,
      }

    case GET_ROLES_FAIL: {
      return {
        ...state,
        error: payload,
      }
    }
    case ADD_ROLE_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        roles: [...state.roles, data],
      }
    }

    case ADD_ROLE_FAIL: {
      const { data } = payload.response
      const { message, errors } = data
      
      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_ROLE_SUCCESS: {
      const { data } = payload
      const roleIndex = state.roles.findIndex(item => item.id == data.id)
      return {
        ...state,
        roles: [
          ...state.roles.map((item, index) => {
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

    case UPDATE_ROLE_FAIL:{
      const { data } = payload.response
      const { message, errors } = data
      
      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter(
          role => role.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_ROLE_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default roles
