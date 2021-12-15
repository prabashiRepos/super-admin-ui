import {
  ADD_KEY_STAGE_FAIL,
  ADD_KEY_STAGE_SUCCESS,
  DELETE_KEY_STAGE_FAIL,
  DELETE_KEY_STAGE_SUCCESS,
  GET_KEY_STAGES_FAIL,
  GET_KEY_STAGES_SUCCESS,
  UPDATE_KEY_STAGE_FAIL,
  UPDATE_KEY_STAGE_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  keystages: [],
  error: "",
  form_errors: []
}

const keystage = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_KEY_STAGES_SUCCESS: {
      return {
        ...state,
        keystages: payload
      }
    }
    case GET_KEY_STAGES_FAIL:
      return {
        ...state,
        error: payload
      }

    case ADD_KEY_STAGE_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        keystages: [...state.keystages, data]
      }
    }
    case ADD_KEY_STAGE_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors
      }
    }
    case UPDATE_KEY_STAGE_SUCCESS: {
      const { data } = payload
      const roleIndex = state.keystages.findIndex(item => item.id == data.id)
      return {
        ...state,
        keystages: [
          ...state.keystages.map((item, index) => {
            if (index !== roleIndex) {
              return item
            }
            return {
              ...item,
              ...data
            }
          })
        ]
      }
    }
    case UPDATE_KEY_STAGE_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors
      }
    }
    case DELETE_KEY_STAGE_SUCCESS:
      return {
        ...state,
        keystages: state.keystages.filter(
          keystages => keystages.id.toString() !== payload.id.toString()
        )
      }

    case DELETE_KEY_STAGE_FAIL:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}

export default keystage
