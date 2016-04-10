export default {
    "mapId": "alphaStreet",
    "musicTrackId" : "walkingOutside",
    "backgroundImage": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/263408/theRedButton.svg",
    "width": "28",
    "height": "20",
    "walls": {
        "10x12": {"id": "wall_b74165f4"},
        "10x6": {"id": "wall_1a3ebdd8"},
        "11x12": {"id": "wall_c4ge7d5g"},
        "11x5": {"id": "wall_4g122202"},
        "11x6": {"id": "wall_dggcdcc7"},
        "11x7": {"id": "wall_d4eeb7b8"},
        "12x12": {"id": "wall_930g3456"},
        "12x5": {"id": "wall_f341842b"},
        "13x12": {"id": "wall_f4ea78fd"},
        "13x5": {"id": "wall_g477b2ea"},
        "14x12": {"id": "wall_3308301a"},
        "14x5": {"id": "wall_735e3087"},
        "15x12": {"id": "wall_38998a11"},
        "15x5": {"id": "wall_d1geg193"},
        "16x12": {"id": "wall_d1c9d9fg"},
        "16x5": {"id": "wall_4a647604"},
        "16x6": {"id": "wall_1ef0f05f"},
        "16x7": {"id": "wall_c2b17922"},
        "17x12": {"id": "wall_357fd89e"},
        "17x7": {"id": "wall_eeb29e28"},
        "18x12": {"id": "wall_1g2018cd"},
        "18x7": {"id": "wall_2e2fa57e"},
        "19x12": {"id": "wall_90g46359"},
        "19x7": {"id": "wall_a90008eg"},
        "20x12": {"id": "wall_55dc31db"},
        "20x7": {"id": "wall_9ef8ff57"},
        "21x10": {"id": "wall_47d136fe"},
        "21x11": {"id": "wall_69g1e448"},
        "21x12": {"id": "wall_agge6e7g"},
        "21x7": {"id": "wall_68780e1a"},
        "21x8": {"id": "wall_c6a9728e"},
        "21x9": {"id": "wall_91bb88a3"},
        "5x10": {"id": "wall_b9de6ecg"},
        "5x11": {"id": "wall_9e5864a7"},
        "5x12": {"id": "wall_a232dg04"},
        "5x7": {"id": "wall_300c8eg2"},
        "5x8": {"id": "wall_d7a47614"},
        "5x9": {"id": "wall_6711635c"},
        "6x12": {"id": "wall_b0ga54c8"},
        "6x7": {"id": "wall_fromInteractive_6x7"},
        "7x12": {"id": "wall_f7a070a2"},
        "7x7": {"id": "wall_f16cgd9b"},
        "8x12": {"id": "wall_86g9f06e"},
        "8x7": {"id": "wall_bg3724a0"},
        "9x12": {"id": "wall_49800a99"},
        "9x7": {"id": "wall_fromInteractive_9x7"},
        "15x10": {
            "id": "wall_manual_fromInteractive_15x10",
            "omitOnStoryPoint":"hasFoundPackage::package_001"
        },
    },
    "people": {
        "player": {"dir": "down", "x": 12, "y": 10},
        "npc_0ab65234": {
            "x": 12,
            "y": 8,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {
                "rotationDirections": ["left", "right"],
                "doesRotate": true
            },
            "interaction": {
                "type": "dialog",
                "content": [["Hey, Jacob!"], ["Learned any new terminal commands lately?", "@@pause_700", " You can choose your attacks from the Pause Menu."], ["If you train hard enough, I'm sure you'll become even stronger than Berg!"]]
            }
        },
        "npc_c5fa960d": {
            "x": 8,
            "y": 10,
            "omitOnStoryPoint": "hasVisitedMap::alphaCoffee",
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {
                "rotationDirections": ["left", "right"],
                "doesRotate": true
            },
            "interaction": {
                "type": "dialog",
                "content": [["Have you been to SouthNorth before?"], ["That's the coffee shop straight ahead. ", "@@pause_500", "Developers are always hanging out there."]]
            }
        },
        "npc_c5fa960d_variation1": {
            "x": 8,
            "y": 10,
            "includeOnStoryPoint": "hasVisitedMap::alphaCoffee",
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {
                "rotationDirections": ["left", "right"],
                "doesRotate": true
            },
            "interaction": {
                "type": "dialog",
                "content": [["Saw you at the coffee shop."]]
            }
        },
        "npc_e524266a": {
            "x": 19,
            "y": 8,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg",
            "dir": "down",
            "useBehavior": "roaming",
            "behaviorData": {
                "path": ["down", "down", "down", "right", "up", "up", "up"],
                "isCircular": false
            },
            "interaction": {
                "type": "dialog",
                "content": [["I'm Berg. ", "@@pause_400", "I don't know what you want, but I'm way too busy for this conversation."], ["Why don't you take that beard for a walk and ", "[FAST]get outta my face!"]]
            }
        },
        "npc_444de679": {
            "x": 15,
            "y": 6,
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
            "dir": "down",
            "useBehavior": "stationary",
            "behaviorData": {
                "rotationDirections": ["down"],
                "doesRotate": true
            },
            "interaction": {
                "type": "dialog",
                "content": [["This road is closed for the Art Fair!"]]
            }
        }
    },
    "interactiveEvents": {
        "6x7": {
            "dialog": [["WE'RE NOT OPEN"]],
            "isSolid": true,
            "restrictedDirections": ["up"],
            "restrictionErrorDialog": [["Hey punk, you can't read the sign from here."]],
            "type": "readable"
        },
        "15x10": {
            "omitOnStoryPoint": "hasFoundPackage::package_001",
            "dialog": [["You found an item!"]],
            "isSolid": true,
            "restrictedDirections": ["up", "down", "left", "right"],
            "restrictionErrorDialog": [["Hey punk, you can't read the sign from here."]],
            "type": "package",
            "packageId": "package_001",
            "skin": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/box-blue.svg" /* It will use a skin if it has one */
        }
    },

    "footEvents": {
        "10x7": {type: "map-transition", playerDirection: 'up', useCoords:[5,8], mapName: "alphaCoffee"},

        //Battle Zones
        "7x11": {type: "battle-zone"},
        "7x10": {type: "battle-zone"},
        "7x9": {type: "battle-zone"},
        "7x8": {type: "battle-zone"}, /* left side, near The Hole */
        "16x11": {type: "battle-zone"},
        "16x10": {type: "battle-zone"},
        "16x9": {type: "battle-zone"},
        "16x8": {type: "battle-zone"}, /* right side, near Berg */
        //
         "13x7": {type: "battle-zone"},
         "12x6": {type: "battle-zone"},
         "14x6": {type: "battle-zone"}

    },
}