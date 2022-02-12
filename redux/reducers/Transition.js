// Originally meant to be a reducer, but since many portions of the app needed to keep track of their loading state,
// I instead allow the function to take in a stateMachine definition to return the next state

// export const TransitionReducer = (state = { status: "idle" }, action) => {
//     if (!stateMachine[action.type]) return state

//     return { status: stateMachine[state.status][action.type] }
// };

export default

    Transition = (stateMachine, state, action) => {
        if (!stateMachine[state]) return state
        return stateMachine[state][action]
    };

