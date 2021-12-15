import {
  GET_QA_SUCCESS,
  GET_QA_FAIL,
  CREATE_QA_SUCCESS,
  CREATE_QA_FAIL,
  UPDATE_QA_SUCCESS,
  UPDATE_QA_FAIL,
  DELETE_QA_SUCCESS,
  DELETE_QA_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  questions: [],
  pagination:{},
  error: "",
  form_errors: [],
}

const questionAndAnswer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_QA_SUCCESS: {
      const { data } = payload
      const {
        current_page,
        from,
        to,
        prev_page_url,
        next_page_url,
        path,
        per_page,
        last_page,
        last_page_url,
        links,
        total
      } = payload
      return {
        ...state,
        questions: data,
        pagination: {
          current_page,
          from,
          to,
          prev_page_url,
          next_page_url,
          path,
          per_page,
          last_page,
          last_page_url,
          links,
          total
        }
      }
    }
    case GET_QA_FAIL:
      return {
        ...state,
        error: payload,
      }

    case CREATE_QA_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        // questions: [...state.questions, data],
      }
    }
    case CREATE_QA_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_QA_SUCCESS: {
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
    case UPDATE_QA_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_QA_SUCCESS:
      return {
        ...state,
        // questions: state.questions.filter(
        //   questions => questions.id.toString() !== payload.id.toString()
        // ),
      }

    case DELETE_QA_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default questionAndAnswer
