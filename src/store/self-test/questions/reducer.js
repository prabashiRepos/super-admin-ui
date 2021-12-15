import {
  GET_SELFTEST_QUESTIONS_SUCCESS,
  GET_SELFTEST_QUESTIONS_FAIL,
  ADD_SELFTEST_QUESTIONS_SUCCESS,
  ADD_SELFTEST_QUESTIONS_FAIL,
  UPDATE_SELFTEST_QUESTIONS_SUCCESS,
  UPDATE_SELFTEST_QUESTIONS_FAIL,
  DELETE_SELFTEST_QUESTIONS_SUCCESS,
  DELETE_SELFTEST_QUESTIONS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  questions: [],
  error: "",
  form_errors: [],
}

const selfTestQuestions = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_SELFTEST_QUESTIONS_SUCCESS: {
      return {
        ...state,
        questions: payload,
      }
    }
    case GET_SELFTEST_QUESTIONS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_SELFTEST_QUESTIONS_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        questions: [...state.questions, data],
      }
    }
    case ADD_SELFTEST_QUESTIONS_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_SELFTEST_QUESTIONS_SUCCESS: {
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
    case UPDATE_SELFTEST_QUESTIONS_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_SELFTEST_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(
          questions => questions.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_SELFTEST_QUESTIONS_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default selfTestQuestions
