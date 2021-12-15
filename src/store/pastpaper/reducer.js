import {
  GET_PASTPAPER_ITEM,
  GET_PASTPAPER_ITEM_SUCCESS,
  GET_PASTPAPER_ITEM_FAIL,
  GET_PASTPAPER_SUCCESS,
  GET_PASTPAPER_FAIL,
  ADD_PASTPAPER_SUCCESS,
  ADD_PASTPAPER_FAIL,
  UPDATE_PASTPAPER_SUCCESS,
  UPDATE_PASTPAPER_FAIL,
  DELETE_PASTPAPER_SUCCESS,
  DELETE_PASTPAPER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  single_pastpaper:{},
  pastpaper: [],
  error: "",
  form_errors: [],
}

const pastpaper = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_PASTPAPER_ITEM_SUCCESS: {
      return {
        ...state,
        single_pastpaper: payload[0],
      }
    }
    case GET_PASTPAPER_ITEM_FAIL:
      return {
        ...state,
        error: payload,
      }
    
    case GET_PASTPAPER_SUCCESS: {
      return {
        ...state,
        pastpaper: payload,
      }
    }
    case GET_PASTPAPER_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_PASTPAPER_SUCCESS: {
      const { data } = payload
      
      return {
        ...state,
        pastpaper: [...state.pastpaper, data],
      }
    }
    case ADD_PASTPAPER_FAIL: {
      
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_PASTPAPER_SUCCESS: {
      const { data } = payload
      const roleIndex = state.pastpaper.findIndex(item => item.id == data.id)
      return {
        ...state,
        pastpaper: [
          ...state.pastpaper.map((item, index) => {
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
    case UPDATE_PASTPAPER_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_PASTPAPER_SUCCESS:
      return {
        ...state,
        pastpaper: state.pastpaper.filter(
          pastpaper => pastpaper.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_PASTPAPER_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default pastpaper;
