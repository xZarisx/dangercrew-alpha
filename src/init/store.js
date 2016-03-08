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
    playerData: {
        name: "Jacob",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
        level: 1,//1,
        hp: 20,
        maxHp: 20,

        xp: 0,
        coins: 10,

        attackStatPoints: 3,
        defenseStatPoints: 2,
        speedStatPoints: 2,

        attacks: [
            "action_attack_basic_001",
            "action_attack_theft_001",
            //"action_attack_status_002",
            //"action_attack_repetitions_001"
        ],
        items: ["action_item_hp_001"]
    },
    battleRequests: {
        showRequest: false
        //requesterName: "Drew", /* This is all for dev. Doesnt need to have initial value */
        //requesterLevel: 21,
        //requesterSkin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg"
    },
    game: {
        isPaused: false,
        gameArea: "pause" //I think only these are possible: [ map | battle | pause | title | credits? | levelup? ]
    },
    pauseMenu: {
        currentCursoringList: "pauseRoot",
        selectedMenuItem: "pauseRoot-stats",
        showMenuTab: "pauseRoot-items"//"pauseRoot-stats"
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