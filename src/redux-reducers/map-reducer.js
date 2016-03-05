export function map(state = {}, action) {
    switch(action.type) {
        case 'SET_VIEWPORT_SIZE':

            return {
                ...state,
                viewportWidth: action.width,
                viewportHeight: action.height
            };

        case 'LOAD_MAP':
            return {
                ...state,
                ...action.map
            };

        default:
            return state;
    }
}