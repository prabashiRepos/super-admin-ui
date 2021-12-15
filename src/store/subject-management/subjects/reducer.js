import {
  GET_SUBJECTS_SUCCESS,
  GET_SUBJECTS_FAIL,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_FAIL,
  UPDATE_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_FAIL,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  subjects: [],
  error: "",
  form_errors: [],
}

const subjects = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_SUBJECTS_SUCCESS: {
      return {
        ...state,
        subjects: payload,
      }
    }
    case GET_SUBJECTS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_SUBJECT_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        subjects: [...state.subjects, data],
      }
    }
    case ADD_SUBJECT_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_SUBJECT_SUCCESS: {
      const { data } = payload
      const roleIndex = state.subjects.findIndex(item => item.id == data.id)
      return {
        ...state,
        subjects: [
          ...state.subjects.map((item, index) => {
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
    case UPDATE_SUBJECT_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: state.subjects.filter(
          subjects => subjects.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_SUBJECT_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default subjects
