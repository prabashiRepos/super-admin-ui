import {
  GET_VIDEO_ITEM,
  GET_VIDEO_ITEM_SUCCESS,
  GET_VIDEO_ITEM_FAIL,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAIL,
  ADD_VIDEOS_SUCCESS,
  ADD_VIDEOS_FAIL,
  UPDATE_VIDEOS_SUCCESS,
  UPDATE_VIDEOS_FAIL,
  DELETE_VIDEOS_SUCCESS,
  DELETE_VIDEOS_FAIL,
  VERIFY_NEW_VIDEOS_SUCCESS,
  VERIFY_NEW_VIDEOS_FAIL
} from "./actionTypes"

const INIT_STATE = {
  single_video:{},
  videos: [],
  createdVideo:{},
  error: "",
  form_errors: [],
}

const video = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_VIDEO_ITEM_SUCCESS: {
      return {
        ...state,
        single_video: payload[0],
      }
    }
    case GET_VIDEO_ITEM_FAIL:
      return {
        ...state,
        error: payload,
      }
    
    case GET_VIDEOS_SUCCESS: {
      return {
        ...state,
        video: payload,
      }
    }
    case GET_VIDEOS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_VIDEOS_SUCCESS: {
      return {
        ...state,
        createdVideo: payload,
      }
    }
    case ADD_VIDEOS_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_VIDEOS_SUCCESS: {
      const { data } = payload
      const roleIndex = state.video.findIndex(item => item.id == data.id)
      return {
        ...state,
        video: [
          ...state.video.map((item, index) => {
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
    case UPDATE_VIDEOS_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_VIDEOS_SUCCESS:
      return {
        ...state,
        video: state.video.filter(
          video => video.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_VIDEOS_FAIL:
      return {
        ...state,
        error: payload,
      }
    case VERIFY_NEW_VIDEOS_SUCCESS:
      return {
        ...state,
        error: payload,
      }
    case VERIFY_NEW_VIDEOS_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default video
