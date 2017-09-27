import { createStore } from 'redux';

//Reducer Function
function reducer (state, action) {
    if (action.type === 'TRACK_COMPANY') {
        return {
        //updated state: combine state.trackedCompanies with action.payload(the new array)
        trackedCompanies: state.trackedCompanies.concat(action.payload),
        }; 
    }
    return state;
}


//Export and set initial state
export const store = createStore (reducer, {
    trackedCompanies: [],
})