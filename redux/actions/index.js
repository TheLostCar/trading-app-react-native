import { baseUrl } from "../../shared/baseUrl"
import ActionTypes from "../ActionTypes"


////////////////////
//               //
//   LISTINGS   //
//             //
////////////////

// LOAD
export const loadListingsRequest = () => ({
    type: ActionTypes.LOAD_LISTINGS_REQUEST
})

export const loadListingsSuccess = (listings) => ({
    type: ActionTypes.LOAD_LISTINGS_SUCCESS,
    payload: listings
})

export const loadListingsFailure = (errorMessage) => ({
    type: ActionTypes.LOAD_LISTINGS_FAILURE,
    payload: errorMessage
})

export const loadListings = () => dispatch => {
    dispatch(loadListingsRequest())
    fetch(baseUrl + 'listings')
        .then(response => {
            if (response.ok) return response.json();

            //throws error if the response is outside of the 200-299 range
            throw new Error(`Error ${response.statusText}`);
        },
            error => {
                // throws new error if there is no response or rethrows error above ^
                throw error;

            })
        .then(listings => dispatch(loadListingsSuccess(listings)))
        .catch(error => dispatch(loadListingsFailure(error.message)))

}

// POST
export const postListingRequest = () => ({
    type: ActionTypes.POST_LISTING_REQUEST
})

export const postListingSuccess = (listing) => ({
    type: ActionTypes.POST_LISTING_SUCCESS,
    payload: listing
})

export const postListingFailure = (errorMessage) => ({
    type: ActionTypes.POST_LISTING_FAILURE,
    payload: errorMessage
})

export const postListing = (listing) => dispatch => {
    dispatch(postListingRequest())
    fetch('', {
        method: "POST",
        body: JSON.stringify(listing),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) return response.json()

            throw new Error(`Error ${response.statusText}`);
        },
            error => { throw error; }
        )
        .then(response => {
            dispatch(postListingSuccess())
        })
        .catch(error => {
            dispatch(postListingFailure(error.message))
        })
}

////////////////////
//               //
//   ITEMS      //
//             //
////////////////

export const loadItemsRequest = () => ({
    type: ActionTypes.LOAD_ITEMS_REQUEST,
})

export const loadItemsSuccess = (items) => ({
    type: ActionTypes.LOAD_ITEMS_SUCCESS,
    payload: items,
})

export const loadItemsFailure = (error) => ({
    type: ActionTypes.LOAD_ITEMS_FAILURE,
    payload: error,
})

export const loadItems = () => dispatch => {
    dispatch(loadItemsRequest())
    fetch(baseUrl + 'items')
        .then(response => {
            if (response.ok) return response.json();
            //throws error if the response is outside of the 200-299 range
            throw new Error(`Error ${response.statusText}`);
        },
            error => {
                // throws new error if there is no response or rethrows error above ^
                throw error;
            })
        .then(items => dispatch(loadItemsSuccess(items)))
        .catch(error => dispatch(loadItemsFailure(error.message)))


}

////////////////////
//               //
//   USERS      //
//             //
////////////////

export const loadUsersRequest = () => ({
    type: ActionTypes.LOAD_USERS_REQUEST,
})

export const loadUsersSuccess = (users) => ({
    type: ActionTypes.LOAD_USERS_SUCCESS,
    payload: users
})

export const loadUsersFailure = (error) => ({
    type: ActionTypes.LOAD_USERS_FAILURE,
    payload: error
})

export const loadUsers = () => dispatch => {
    dispatch(loadUsersRequest())

    fetch(baseUrl + 'users')
        .then(response => {
            if (response.ok) return response.json();
            //throws error if the response is outside of the 200-299 range
            throw new Error(`Error ${response.statusText}`);
        },
            error => {
                // throws new error if there is no response or rethrows error above ^
                throw error;
            })
        .then(user => dispatch(loadUsersSuccess(user)))
        .catch(error => dispatch(loadUsersFailure(error.message)))
}