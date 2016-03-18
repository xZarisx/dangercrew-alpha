export default {
    "backgroundImage": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/263408/031516_southNorth.svg",
    "width": "9",
    "height": "9",
    "walls": {
        "0x0": {"id": "wall_86084bd7"},
        "0x2": {"id": "wall_42c62507"},
        "0x3": {"id": "wall_d55dafg0"},
        "0x5": {"id": "wall_1g28ga65"},
        "0x6": {"id": "wall_4332d8b2"},
        "1x0": {"id": "wall_5aegfb4a"},
        "1x8": {"id": "wall_7c1gab42"},
        "2x0": {"id": "wall_d03f3gc3"},
        "2x5": {"id": "wall_fe209496"},
        "2x6": {"id": "wall_6bffeg0e"},
        "2x8": {"id": "wall_7f21fcc2"},
        "3x0": {"id": "wall_41044903"},
        "3x1": {"id": "wall_9e42a914"},
        "3x2": {"id": "wall_07b02fdd"},
        "3x3": {"id": "wall_fromInteractive_3x3"},
        "3x5": {"id": "wall_6e2e28fe"},
        "3x6": {"id": "wall_cb1ba6fc"},
        "3x8": {"id": "wall_a5d63666"},
        "4x0": {"id": "wall_8e5gbb5g"},
        "4x3": {"id": "wall_a9b00a2f"},
        "5x0": {"id": "wall_ga6cf587"},
        "5x3": {"id": "wall_ef35af9e"},
        "6x0": {"id": "wall_3683380c"},
        "6x3": {"id": "wall_f586509c"},
        "6x5": {"id": "wall_b4gg3gdc"},
        "6x6": {"id": "wall_249741b6"},
        "7x0": {"id": "wall_7bbfcae5"},
        "7x1": {"id": "wall_5b4fb09c"},
        "7x2": {"id": "wall_fromInteractive_7x2"},
        "7x3": {"id": "wall_c466c71g"},
        "7x5": {"id": "wall_451abc57"},
        "7x6": {"id": "wall_66182f05"},
        "8x0": {"id": "wall_c5e17c74"}
    },
    "people": {
        "player": {"dir": "down", "x": 6, "y": 8},
        "npc_6c91g149": {
            "x": 1,
            "y": 6,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {"rotationDirections": ["left", "right"], "doesRotate": true},
            "interaction": {
                "type": "dialog",
                "content": [["I hear there's a guy in a suit who's willing to pay for developers' good ideas."], ["Gee,", "@@pause_600@@", "you think it's true?"]]
            }
        },
        "npc_9950fe06": {
            "x": 6,
            "y": 2,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {"rotationDirections": ["right"], "doesRotate": true},
            "interaction": {"type": "dialog", "content": [["Hey man, how are ya?"]]}
        },
        "npc_fdf0a8a3": {
            "x": 0,
            "y": 1,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {"rotationDirections": ["left", "right"], "doesRotate": true},
            "interaction": {
                "type": "dialog",
                "content": [["I'm saving up my coins for a Mechanical Keyboard."], ["A better keyboard increases code accuracy."]]
            }
        },
        "npc_fefa9770": {
            "x": 8,
            "y": 8,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {"rotationDirections": ["left", "right"], "doesRotate": true},
            "interaction": {
                "type": "dialog",
                "content": [["Berg is really tough..."], [" I'll need a lot of XP to beat him."]]
            }
        }
    },
    "interactiveEvents": {
        "3x3": {
            "dialog": [["Almond milk costs extra"]],
            "isSolid": true,
            "restrictedDirections": ["right", "up"],
            "restrictionErrorDialog": [["Hey punk, you can't read the sign from here."]],
            "type": "readable"
        },
        "7x2": {
            "dialog": [["Erm", "[SLOW]...", "@@pause_800@@", " Our espresso machine has a 500 error."], ["How about you go hack with some people and come back later?"]],
            "isSolid": true,
            "restrictedDirections": ["left"],
            "restrictionErrorDialog": [["Hey punk, you can't read the sign from here."]],
            "type": "readable"
        }
    },
    "footEvents": {
        "5x8": {type: "map-transition", playerDirection: 'down', map: "someMapToLoad"},
        "6x8": {type: "map-transition", playerDirection: 'down', map: "someMapToLoad"},

        //Battle Zones
        "5x5": {type: "battle-zone"},
        "4x5": {type: "battle-zone"},
        "5x6": {type: "battle-zone"},
        "4x6": {type: "battle-zone"},

        "2x2": {type: "battle-zone"},
        "1x2": {type: "battle-zone"},
        "2x3": {type: "battle-zone"},
        "1x3": {type: "battle-zone"},

        "0x7": {type: "battle-zone"},
        "1x7": {type: "battle-zone"}

    },
}