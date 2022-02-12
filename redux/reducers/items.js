import ActionTypes from "../ActionTypes";
import Transition from "./Transition";

// State Machine defines possible states (passed as status) of the Items
const stateMachine = Object.freeze({
    idle: {
        LOAD_ITEMS_REQUEST: 'loading'
    },
    loading: {
        LOAD_ITEMS_SUCCESS: 'success',
        LOAD_ITEMS_FAILURE: 'failure'
    },
    failure: {
        LOAD_ITEMS_REQUEST: 'loading'
    },
    success: {
        LOAD_ITEMS_REQUEST: 'loading'
    }
})

export const items = (state = { status: { status: 'idle', idle: true } }, action) => {
    const nextStatus = Transition(stateMachine, state.status.status, action.type)
    const status = {
        status: nextStatus,
        [nextStatus]: true
    }

    switch (action.type) {
        case ActionTypes.LOAD_ITEMS_REQUEST:
            return { ...state, status: status }

        case ActionTypes.LOAD_ITEMS_SUCCESS:
            return { ...state, items: action.payload, status: status }

        case ActionTypes.LOAD_ITEMS_FAILURE:
            return { ...state, error: action.payload, status: status }

        default:
            return state;
    }
}