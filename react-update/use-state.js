import { generateUIInterface } from '.';
export function useState(initialState) {
    var state = {};
    state.value = initialState;
    var setState = function (newState) {
        state.value = newState;
        generateUIInterface();
    };
    // setTimeout(() => render(), 0);
    return [state, setState];
}
