import {
  GET_PASTPAPER_QUESTIONS_SUCCESS,
  GET_PASTPAPER_QUESTIONS_FAIL,
  ADD_PASTPAPER_QUESTIONS_SUCCESS,
  ADD_PASTPAPER_QUESTIONS_FAIL,
  UPDATE_PASTPAPER_QUESTIONS_SUCCESS,
  UPDATE_PASTPAPER_QUESTIONS_FAIL,
  DELETE_PASTPAPER_QUESTIONS_SUCCESS,
  DELETE_PASTPAPER_QUESTIONS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  questions: [],
  error: "",
  form_errors: [],
}

const pastPaperQuestions = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_PASTPAPER_QUESTIONS_SUCCESS: {
      return {
        ...state,
        questions: payload,
      }
    }
    case GET_PASTPAPER_QUESTIONS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_PASTPAPER_QUESTIONS_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        questions: [...state.questions, data],
      }
    }
    case ADD_PASTPAPER_QUESTIONS_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_PASTPAPER_QUESTIONS_SUCCESS: {
      const { data } = payload
      const roleIndex = state.questions.findIndex(item => item.id == data.id)
      return {
        ...state,
        questions: [
          ...state.questions.map((item, index) => {
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
    case UPDATE_PASTPAPER_QUESTIONS_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_PASTPAPER_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(
          questions => questions.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_PASTPAPER_QUESTIONS_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default pastPaperQuestions
