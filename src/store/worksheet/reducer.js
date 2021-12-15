import {
  GET_WORKSHEET_ITEM,
  GET_WORKSHEET_ITEM_SUCCESS,
  GET_WORKSHEET_ITEM_FAIL,
  GET_WORKSHEET_SUCCESS,
  GET_WORKSHEET_FAIL,
  ADD_WORKSHEET_SUCCESS,
  ADD_WORKSHEET_FAIL,
  UPDATE_WORKSHEET_SUCCESS,
  UPDATE_WORKSHEET_FAIL,
  DELETE_WORKSHEET_SUCCESS,
  DELETE_WORKSHEET_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  single_worksheet:{},
  worksheet: [],
  error: "",
  form_errors: [],
}

const worksheet = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_WORKSHEET_ITEM_SUCCESS: {
      return {
        ...state,
        single_worksheet: payload[0],
      }
    }
    case GET_WORKSHEET_ITEM_FAIL:
      return {
        ...state,
        error: payload,
      }
    
    case GET_WORKSHEET_SUCCESS: {
      return {
        ...state,
        worksheet: payload,
      }
    }
    case GET_WORKSHEET_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_WORKSHEET_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        worksheet: [...state.worksheet, data],
      }
    }
    case ADD_WORKSHEET_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_WORKSHEET_SUCCESS: {
      const { data } = payload
      const roleIndex = state.worksheet.findIndex(item => item.id == data.id)
      return {
        ...state,
        worksheet: [
          ...state.worksheet.map((item, index) => {
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
    case UPDATE_WORKSHEET_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_WORKSHEET_SUCCESS:
      return {
        ...state,
        worksheet: state.worksheet.filter(
          worksheet => worksheet.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_WORKSHEET_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default worksheet
