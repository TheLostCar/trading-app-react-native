import ActionTypes from "../ActionTypes";
import Transition from "./Transition";

// State Machine defines possible states (passed as status) of the Items
const stateMachine = Object.freeze({
    idle: {
        LOAD_USERS_REQUEST: 'loading'
    },
    loading: {
        LOAD_USERS_SUCCESS: 'success',
        LOAD_USERS_FAILURE: 'failure'
    },
    failure: {
        LOAD_USERS_REQUEST: 'loading'
    },
    success: {
        LOAD_USERS_REQUEST: 'loading'
    }
})

export const users = (state = { status: { status: 'idle', idle: true } }, action) => {
    const nextStatus = Transition(stateMachine, state.status.status, action.type)
    const status = {
        status: nextStatus,
        [nextStatus]: true
    }

    switch (action.type) {
        case ActionTypes.LOAD_USERS_REQUEST:
            return { ...state, status: status }

        case ActionTypes.LOAD_USERS_SUCCESS:
            return { ...state, users: action.payload, status: status }

        case ActionTypes.LOAD_USERS_FAILURE:
            return { ...state, error: action.payload, status: status }

        default:
            return state;
    }
}