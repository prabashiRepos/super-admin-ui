import {
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAIL,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL,
  GET_ACCESS_TOKEN_SUCCESS,
  GET_ACCESS_TOKEN_FAIL,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAIL,
  VERIFY_VIDEO_SUCCESS,
  VERIFY_VIDEO_FAIL
} from "./actionTypes"

const INIT_STATE = {
  lessons: [],
  error: "",
  form_errors: [],
  // below for Vimeo
  access_token: "",
  video_info:{}
}

const lessons = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_LESSONS_SUCCESS: {
      return {
        ...state,
        lessons: payload,
      }
    }
    case GET_LESSONS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_LESSON_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        lessons: [...state.lessons, data],
      }
    }
    case ADD_LESSON_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_LESSON_SUCCESS: {
      const { data } = payload
      const roleIndex = state.lessons.findIndex(item => item.id == data.id)
      return {
        ...state,
        lessons: [
          ...state.lessons.map((item, index) => {
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
    case UPDATE_LESSON_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(
          lessons => lessons.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_LESSON_FAIL:
      return {
        ...state,
        error: payload,
      }
    
    case GET_ACCESS_TOKEN_SUCCESS: {
      const { data } = payload.response
      const {access_token} = data
      return {
        ...state,
        access_token: access_token,
      }
    }
    case GET_ACCESS_TOKEN_FAIL:
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    case CREATE_VIDEO_SUCCESS:
      // const { data } = payload.response
      // const { message, errors } = data
      return {
        ...state,
        video_info: payload,
      }
    case CREATE_VIDEO_FAIL: {
      const { data } = payload.response
      const { message, errors } = data
      return {
        ...state,
        error: message,
      }
    }
    default:
      return state
  }
}

export default lessons
