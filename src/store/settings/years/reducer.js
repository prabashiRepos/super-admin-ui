import {
  GET_YEARS_SUCCESS,
  GET_YEARS_FAIL,
  ADD_YEAR_SUCCESS,
  ADD_YEAR_FAIL,
  UPDATE_YEAR_SUCCESS,
  UPDATE_YEAR_FAIL,
  DELETE_YEAR_SUCCESS,
  DELETE_YEAR_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  years: [],
  error: "",
  form_errors: [],
}

const years = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_YEARS_SUCCESS: {
      return {
        ...state,
        years: payload,
      }
    }
    case GET_YEARS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_YEAR_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        years: [...state.years, data],
      }
    }
    case ADD_YEAR_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_YEAR_SUCCESS: {
      const { data } = payload
      const roleIndex = state.years.findIndex(item => item.id == data.id)
      return {
        ...state,
        years: [
          ...state.years.map((item, index) => {
            if (index !== roleIndex) {
              return item
            }
            return {
              ...item,
              ...data,
            }
          }),
        ],
      }
    }
    case UPDATE_YEAR_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_YEAR_SUCCESS:
      return {
        ...state,
        years: state.years.filter(
          years => years.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_YEAR_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default years
