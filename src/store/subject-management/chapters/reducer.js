import {
  GET_CHAPTERS_SUCCESS,
  GET_CHAPTERS_FAIL,
  ADD_CHAPTER_SUCCESS,
  ADD_CHAPTER_FAIL,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAIL,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  chapters: [],
  error: "",
  form_errors: [],
}

const chapters = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_CHAPTERS_SUCCESS: {
      return {
        ...state,
        chapters: payload,
      }
    }
    case GET_CHAPTERS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_CHAPTER_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        chapters: [...state.chapters, data],
      }
    }
    case ADD_CHAPTER_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_CHAPTER_SUCCESS: {
      const { data } = payload
      const roleIndex = state.chapters.findIndex(item => item.id == data.id)
      return {
        ...state,
        chapters: [
          ...state.chapters.map((item, index) => {
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
    case UPDATE_CHAPTER_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: state.chapters.filter(
          chapters => chapters.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_CHAPTER_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default chapters
