import {
  GET_PLANS_SUCCESS,
  GET_PLANS_FAIL,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAIL,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAIL,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  plans: [],
  error: "",
  form_errors: [],
}

const plansAndPrices = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_PLANS_SUCCESS: {
      return {
        ...state,
        plans: payload,
      }
    }
    case GET_PLANS_FAIL:
      return {
        ...state,
        error: payload,
      }

    case ADD_PLAN_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        plans: [...state.plans, data],
      }
    }
    case ADD_PLAN_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case UPDATE_PLAN_SUCCESS: {
      const { data } = payload
      const roleIndex = state.plans.findIndex(item => item.id == data.id)
      return {
        ...state,
        plans: [
          ...state.plans.map((item, index) => {
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
    case UPDATE_PLAN_FAIL: {
      const { data } = payload.response
      const { message, errors } = data

      return {
        ...state,
        error: message,
        form_errors: errors,
      }
    }
    case DELETE_PLAN_SUCCESS:
      return {
        ...state,
        plans: state.plans.filter(
          plans => plans.id.toString() !== payload.id.toString()
        ),
      }

    case DELETE_PLAN_FAIL:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default plansAndPrices
