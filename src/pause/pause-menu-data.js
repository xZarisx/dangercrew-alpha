export default {
    /* The structure of these objects will not be the same. Different functionalities */
    "pauseRoot": [
        {
            "id": "pauseRoot-stats",
            "label": "STATS",
            "pageTitle": "Stats & Skills",
            "rightKeyDest": "pauseStats-health"
        },
        {
            "id": "pauseRoot-laptop",
            "label": "LAPTOP",
            "pageTitle": "Laptop",
            //"rightKeyDest": "pauseStats-whateverFirstOptionIdIs"
            infoBoxDescription: "Your laptop can be configured with parts and components."
        },
        {
            "id": "pauseRoot-attacks",
            "label": "ATTACKS",
            "pageTitle": "Attacks",
            //"rightKeyDest": "pauseStats-health"
        },
        {
            "id": "pauseRoot-items",
            "label": "ITEMS",
            "pageTitle": "Items",
            //"rightKeyDest": "pauseStats-health"
        }
        /* Some day: MAP?, SAVE GAME? */
    ],

    "pauseStatsMenu": [
        {
            id: "pauseStats-health",
            label: "Health",
            infoBoxTitle: "Health",
            infoBoxDescription: "--Some description for health--"
        },
        {
            id: "pauseStats-attack",
            label: "Attack",
            infoBoxTitle: "Attack",
            infoBoxDescription: "--Some description for attack--"
        },
        {
            id: "pauseStats-defense",
            label: "Defense",
            infoBoxTitle: "Defense",
            infoBoxDescription: "--Some description for defense--"
        },
        {
            id: "pauseStats-speed",
            label: "Speed",
            infoBoxTitle: "Speed",
            infoBoxDescription: "--Some description for speed--"
        },
        {
            id: "pauseStats-efficiency",
            label: "Efficiency",
            infoBoxTitle: "Efficiency",
            infoBoxDescription: "--Some description for eff--"
        }
    ]
}