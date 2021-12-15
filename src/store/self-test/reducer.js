import {
  ADD_SELF_TEST_FAIL,
  ADD_SELF_TEST_SUCCESS,
  DELETE_SELF_TEST_FAIL,
  DELETE_SELF_TEST_SUCCESS,
  GET_SELF_TEST_FAIL,
  GET_SELF_TEST_SUCCESS,
  GET_SELF_TESTS_FAIL,
  GET_SELF_TESTS_SUCCESS,
  UPDATE_SELF_TEST_FAIL,
  UPDATE_SELF_TEST_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  single_selftest: {},
  selftest: [],
  error: "",
  form_errors: []
}

const selfTest = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_SELF_TEST_SUCCESS: {
      return {
        ...state,
        single_selftest: payload[0]
      }
    }
    case GET_SELF_TEST_FAIL:
      return {
        ...state,
        error: payload
      }

    case GET_SELF_TESTS_SUCCESS: {
      return {
        ...state,
        selftest: payload
      }
    }
    case GET_SELF_TESTS_FAIL:
      return {
        ...state,
        error: payload
      }

    case ADD_SELF_TEST_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        selftest: [...state.selftest, data]
      }
    }
    case ADD_SELF_TEST_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors
      }
    }
    case UPDATE_SELF_TEST_SUCCESS: {
      const { data } = payload
      const roleIndex = state.selftest.findIndex(item => item.id == data.id)
      return {
        ...state,
        selftest: [
          ...state.selftest.map((item, index) => {
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
    case UPDATE_SELF_TEST_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors
      }
    }
    case DELETE_SELF_TEST_SUCCESS:
      return {
        ...state,
        selftest: state.selftest.filter(
          selftest => selftest.id.toString() !== payload.id.toString()
        )
      }

    case DELETE_SELF_TEST_FAIL:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}

export default selfTest
