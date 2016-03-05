export default {
    backgroundImage: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/southnorth.svg",
    height: 16,
    width: 9,
    people: {
        "player": {
            x: 6,
            y: 15,
            dir: "up"
        },
        "npc_003": {
            x: 1,
            y: 7,
            skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg",
            dir: "down",
            interaction: {}, //not implemented,
            useBehavior: "roaming",
            behaviorData: {
                path: ["right","up","up", "up"],
                isCircular: false
            }
        },
        "npc_004": {
            x: 4,
            y: 1,
            skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
            dir: "down",
            interaction: {}, //not implemented,
            useBehavior: "roaming",
            behaviorData: {
                path: ["right","right","right","down","down"],
                isCircular: false
            }
        },
    },
    walls: {
        "3x12": {type:"solid"}
    },
    interactiveEvents: {

    },
    footEvents: {

    },
    npcs: {

    }
};