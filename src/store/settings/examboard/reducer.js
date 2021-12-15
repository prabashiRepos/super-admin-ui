import {
  ADD_EXAM_BOARD_FAIL,
  ADD_EXAM_BOARD_SUCCESS,
  DELETE_EXAM_BOARD_FAIL,
  DELETE_EXAM_BOARD_SUCCESS,
  GET_EXAM_BOARDS_FAIL,
  GET_EXAM_BOARDS_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_EXAM_BOARD_FAIL,
  UPDATE_EXAM_BOARD_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  examboards: [],
  error: "",
  form_errors: []
}

const examBoard = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_EXAM_BOARDS_SUCCESS: {
      return {
        ...state,
        examboards: payload
      }
    }
    case GET_EXAM_BOARDS_FAIL:
      return {
        ...state,
        error: payload
      }

    case ADD_EXAM_BOARD_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        examboards: [...state.examboards, data]
      }
    }
    case ADD_EXAM_BOARD_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors
      }
    }
    case UPDATE_EXAM_BOARD_SUCCESS: {
      const { data } = payload
      const roleIndex = state.examboards.findIndex(item => item.id == data.id)
      return {
        ...state,
        examboards: [
          ...state.examboards.map((item, index) => {
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
    case UPDATE_EXAM_BOARD_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors
      }
    }
    case DELETE_EXAM_BOARD_SUCCESS:
      return {
        ...state,
        examboards: state.examboards.filter(
          examboards => examboards.id.toString() !== payload.id.toString()
        )
      }

    case DELETE_EXAM_BOARD_FAIL:
      return {
        ...state,
        error: payload
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: payload
      }
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: payload
      }

    default:
      return state
  }
}

export default examBoard
