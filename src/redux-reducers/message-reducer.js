export function message(state = {}, action) {

    switch(action.type) {

        case 'SET_MESSAGE':
            return {
                ...state,
                currentMessage: action.payload
            }

        case 'START_MESSAGING':
            return {
                ...state,
                messaging: true
            }

        case 'STOP_MESSAGING':
            /* acts as a reset */
            return {
                ...state,
                messaging: false,
                pagingIcon: null,
                activePage: 0,
                characterIndex: -1
            }

        case 'INCREASE_CHARACTER_INDEX':
            return {
                ...state,
                characterIndex: state.characterIndex + 1,
                endOfPage: false
            }

        case 'SET_CHARACTER_INDEX': /* for jumping to end */
            return {
                ...state,
                characterIndex: action.payload,
            }

        case 'NEXT_MESSAGE_PAGE':
            return {
                ...state,
                pagingIcon: null,
                activePage: state.activePage + 1
            }

        case 'END_OF_PAGE':
            return {
                ...state,
                endOfPage: true
            }

        case 'SET_PAGING_ICON':
            return {
                ...state,
                pagingIcon: action.payload
            }

        default:
            return state;
    }
}
