import ActionTypes from "../ActionTypes";
import Transition from "./Transition";


const stateMachine = Object.freeze({
    idle: {
        LOAD_LISTINGS_REQUEST: 'loading',
        POST_LISTINGS_REQUEST: 'loading',
    },
    loading: {
        LOAD_LISTINGS_SUCCESS: 'success',
        LOAD_LISTINGS_FAILURE: 'failure',

        POST_LISTINGS_SUCCESS: 'success',
        POST_LISTINGS_FAILURE: 'failure',
    },
    failure: {
        LOAD_LISTINGS_REQUEST: 'loading',
        POST_LISTINGS_REQUEST: 'loading',
    },
    success: {
        LOAD_LISTINGS_REQUEST: 'loading',
        POST_LISTINGS_REQUEST: 'loading',
    },
})


// loadStatus is an object that contains a 'status' property that represents the current status: idle/loading/success/failure
// loadStatus will have another property named after one of the possible states (idle/loading/success/failure) 
export const listings = (state = { loadStatus: { status: 'idle', idle: true } }, action) => {
    const nextLoadStatus = Transition(stateMachine, state.loadStatus.status, action.type)
    const loadStatus = {
        status: nextLoadStatus,
        [nextLoadStatus]: true
    }

    // const postStatus = 

    switch (action.type) {
        // Load Listings 
        case ActionTypes.LOAD_LISTINGS_REQUEST:
            return { ...state, loadStatus: loadStatus };

        case ActionTypes.LOAD_LISTINGS_SUCCESS:
            return { ...state, listings: action.payload, loadStatus: loadStatus };

        case ActionTypes.LOAD_LISTINGS_FAILURE:
            return { ...state, error: action.payload, loadStatus: loadStatus };


        // Post Listings
        case ActionTypes.POST_LISTING_REQUEST:
            return { ...state, postStatus: postStatus }

        case ActionTypes.POST_LISTING_SUCCESS:
            return { ...state, listing: action.payload, postStatus: postStatus };

        case ActionTypes.POST_LISTING_FAILURE:
            return { ...state, error: action.payload };


        // Delete Listings
        case ActionTypes.DELETE_LISTING_REQUEST:
        case ActionTypes.DELETE_LISTING_SUCCESS:
        case ActionTypes.DELETE_LISTING_FAILURE:

        default:
            return state;
    }
}