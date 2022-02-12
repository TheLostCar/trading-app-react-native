import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { items } from './reducers/items';
import { listings } from './reducers/listings';
import { users } from './reducers/users';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            items,
            listings,
            users,
        }),
        applyMiddleware(thunk)
    )

    return store
}