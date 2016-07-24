import createStore from './create-store'
import InitialPlayerData from './initial-player-data'

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
    playerData: {
        ...InitialPlayerData,
        // speedStatPoints: 99,
        // attackStatPoints: 99
    },
    battleRequests: {
        showRequest: false,
        datetimeRequested: 1, //timestamp
        requesterName: "Drew", /* This is all for dev. Doesnt need to have initial value */
        requesterLevel: 21,
        requesterSkin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg"
    },
    battleResultPrompt: {
        showResult: false,//false
        xpGain: 29, //null?
        safeToPause: true
    },

    game: {
        isTouchMode: false, //false
        isAllowingMusic: true, //true
        transitionOverlayOpacity: 1,  //should be 1
        showOnboardingPopup: true, //true
        isPaused: false, /* TODO: Not sure this is used anymore */
        gameArea: "title"//"title" //I think only these are possible: [ map | battle | pause | title | credits? | levelup? ]
    },
    pauseMenu: {
        currentCursoringList: "pauseRoot", //"pauseLevelUpMenu", //"pauseRoot",
        selectedMenuItem: "pauseRoot-stats", //"pauseRoot-levelup", //"pauseLevelUp-health", //"pauseRoot-levelup",
        showMenuTab: "pauseRoot-stats",
        newAttackBadge: false
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
    combatProcessor: {},
    //end b3

    storyPoints: {
        battles: {
            //"drewber": {
            //    wins: 22,
            //    losses: 9
            //}
        },
        acquiredItems: {},
        foundPackages: {},
        visitedMaps: {}
    }
});

export default store;