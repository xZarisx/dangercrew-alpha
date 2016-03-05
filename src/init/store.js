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
        isPaused: false,
        gameArea: "map" //I think only these are possible: [ map | battle | pause | title | credits? | levelup? ]
    },

    //b3
    battleUi: {
        terminalMenuKey: "menuRoot",
        terminalMenuSelectedIndex: 0,

        playerId: "a", /* Theses are hardcoded for now */
        playerTargeting: "b",

        rolloutIndex: 0, /* Which event am I looking at? */
        rolloutEventStation: "init", /* Which step am I on? */
        textMessage: "The Cat's Pajamas", /* Will be 'null' between messages */
        textMessageDoneRolling: false,

        combatantStyles: {
        }, /* augment appearance/animations with these inline styles */

        introMessage: null

    },
    battle: {
        isAutoplayMode: false,
        seriesWinnerCount: 0,
        seriesBattleLength: 1,
        winners: [],
        backgroundImage: "some-image-url-or-css-class?",
        music: "some-mp3-url",
        submissions: [],
        queuedSubmissions: [
        ]
    },
    rollout: [],
    combatants: {},
    combatProcessor: {}
});

export default store;