export default {
    mapId: "devColorStreet",
    musicTrackId : "walkingOutside",
    backgroundImage: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/dangerMap.svg",
    width: 16, //this is a real value. the map will appear incorrectly if this number does not match the backgroundImage
    height: 16, //this one I made up
    walls: {
        "8x2": {type:"solid"} /* this is for a sign */
    },

    interactiveEvents: {
        "8x2": { /* Sign */
            type: "readable",
            dialog:[
                ["How to do Stuff: ", "@@pause_1000", "The Complete Guide"],
                ["[FAST]This is page2"]
            ],
            restrictedDirections: null
        },
        "7x1": { /* Sign */
            type: "readable",
            dialog:[
                ["Whoa you found me"]
            ],
            restrictedDirections: ["up"],
            restrictionErrorDialog: [
                ["Hey punk, you can't read the sign from here."]
            ]
        }
    },
    footEvents: {
        "6x0": {type: "map-transition", playerDirection: "up", useCoords:[5,8], mapName: "alphaCoffee"},
        "7x0": {type: "map-transition", playerDirection: "up", useCoords:[6,8], mapName: "alphaCoffee"},

        //Battle Zones
        "8x6": {
            type: "battle-zone",
            levelRange: [3,5]
            //Not sure if this is the best way to handle this. Need to think about it.
            //What else would you want to specify here?
        },
        "9x6": {type: "battle-zone", levelRange: [3,5]},
        "10x6": {type: "battle-zone", levelRange: [3,5]},
        "11x6": {type: "battle-zone", levelRange: [3,5]}
    },

    people: {
        "player": {
            x: 7,
            y: 5,
            dir: "down"
        },
        "npc_001": {
            x: 3,
            y: 3,
            skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg",
            dir: "down",
            interaction: {
                type: "dialog",
                content: [
                    ["I'm too busy for this conversation!"],
                    ["[LIGHTNING]Scram!"]
                ]
            },
            useBehavior: "roaming",
            behaviorData: {
                path: ["left","left","left","up","up","up"],
                isCircular: false
            }
        },
        "npc_002": {
            x: 8,
            y: 3,
            dir: "down",
            skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg",
            interaction: {
                type: "dialog",
                content: [
                    ["Did that guy yell at you?"],
                    ["[SLOW]Yeah...", "@@pause_700@@", "He yelled at me, too."]
                ]
            },
            useBehavior: "stationary",
            behaviorData: {
                rotationDirections: ["left","up","right"],
                doesRotate: true
            }
        }
    }
}