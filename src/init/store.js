import createStore from './create-store'

const store = createStore({
    map: {
    },
    message: {
        messaging: false,
        pagingIcon: null,
        activePage: 0,
        characterIndex: -1,
        currentMessage: null
    },
    people: {
        /* Populated on mount */
    },
    battleRequests: {
        showRequest: false,
        requesterName: "Drew",
        requesterLevel: 21
    },
    game: {
        isPaused: false
    }
});

export default store;