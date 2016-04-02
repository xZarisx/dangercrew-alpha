import store from '../init/store'
import {addKeyboardSinglePress} from '../helpers/single-keypress-binding'
import PauseMenuData from './pause-menu-data'
import {getCensoringList, getMenuNode} from './pause-menu-data'
import togglePlayerAttack from './toggle-player-attack'
import togglePlayerItem from './toggle-player-item'
import {incrementStatPoint, decrementStatPoint, resetStatPoints, submitLevelUp, skillPointsRemaining} from '../level-up/levelup-utilities'
import { Howl } from 'howler'
/* 37 "left" | 39 "right" | 38 "up" | 40 "down" */
var sound_menuMove = new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/menu-move.mp3']});
var sound_submit = new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/submit.mp3']});
var sound_crapout = new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/pause-back.mp3']});



/* Pure functions */
function getNextInList(currentId, list) {
    /* Return next, or last */
    const ids = list.map(item => {return item.id});
    const index = ids.indexOf(currentId);

    return (index < ids.length-1) ? ids[index+1] : ids[ids.length-1] ;
}

function getPreviousInList(currentId, list) {
    /* Return previous, or first */
    const ids = list.map(item => {return item.id});
    const index = ids.indexOf(currentId);

    return (index > 0) ? ids[index-1] : ids[0] ;
}

function getCurrentlySelectedNode() { /* Impure */
    const pauseMenu = store.getState().pauseMenu;
    const list = PauseMenuData[pauseMenu.currentCursoringList];
    return list.filter(item => {
       return item.id == pauseMenu.selectedMenuItem
    })[0];
}

/* Action creator */
function setPauseMenuValue(changes={}) {
    store.dispatch({
        type: "SET_PAUSEMENU_VALUE",
        payload: {
            changes: {...changes}
        }
    })
}

/* Pure function */
function updatedMenuTab(currentCursoringList, currentShowMenuTab, newValue) {
    /* Trying to stay pure may be confusing. If you are interacting with pauseRoot, return the new value */
    /* If you were interacting with some other cursor list, return the old value */
    if (currentCursoringList == "pauseRoot") {
        return newValue
    } else {
        return currentShowMenuTab
    }
}

/* UI Interaction handler for Pause Menu */
export default function(namespace="") {

    /* Levelup State management Init */
    const initialStatLevels = {
        healthStatPoints: store.getState().playerData.healthStatPoints,
        attackStatPoints: store.getState().playerData.attackStatPoints,
        defenseStatPoints: store.getState().playerData.defenseStatPoints,
        speedStatPoints: store.getState().playerData.speedStatPoints,
        efficiencyStatPoints: store.getState().playerData.efficiencyStatPoints
    };


    var moveMenuCursor = function(callerOptions={}) {
        const options = {
            usePrev: false,
            destKeyName: "",
            restrictToDirectionKeyName: null,
            ...callerOptions
        };

        if (options.destKeyName.length == 0) {
            console.warn('WARNING: destKeyName not specified in moveMenuCursor callerOptions')
        }

        const currentCursoringList = store.getState().pauseMenu.currentCursoringList;
        const list = getCensoringList(currentCursoringList, PauseMenuData);
        const selectedMenuItem = store.getState().pauseMenu.selectedMenuItem;
        const selectedNode = getMenuNode(currentCursoringList, selectedMenuItem, PauseMenuData);


        /* If the node has a destination defined, go there */
        if (selectedNode[options.destKeyName]) {
            setPauseMenuValue({
                currentCursoringList: selectedNode[options.destKeyName][0],
                selectedMenuItem: selectedNode[options.destKeyName][1]
            });

            sound_menuMove.play();
            return;
        }

        /* If we're restricting which direction can be used, cancel out here */
        if (options.restrictToDirectionKeyName && !selectedNode[options.restrictToDirectionKeyName]) {
            return false;
        }
        
        const nextItem = options.usePrev
            ? getPreviousInList( selectedMenuItem, list)
            : getNextInList(selectedMenuItem, list);

        /* Play sound */
        if (store.getState().pauseMenu.selectedMenuItem != nextItem) {
            sound_menuMove.play();
        }

        setPauseMenuValue({
            selectedMenuItem: nextItem,
            showMenuTab: updatedMenuTab(store.getState().pauseMenu.currentCursoringList, store.getState().pauseMenu.showMenuTab, nextItem)
        });

    };

    var handleLeft = function() {
        moveMenuCursor({
            usePrev: true,
            destKeyName: "leftKeyDest",
            restrictToDirectionKeyName: "isHorizontalMovement"
        })
    };

    var handleRight = function() {
        moveMenuCursor({
            usePrev: false,
            destKeyName: "rightKeyDest",
            restrictToDirectionKeyName: "isHorizontalMovement"
        })
    };

    var handleUp = function() {
        moveMenuCursor({
            usePrev: true,
            destKeyName: "upKeyDest"
        })
    };

    var handleDown = function() {
        moveMenuCursor({
            usePrev: false,
            destKeyName: "downKeyDest"
        })
    };




    addKeyboardSinglePress(37, handleLeft, namespace);
    addKeyboardSinglePress(39, handleRight, namespace);
    addKeyboardSinglePress(65, handleLeft, namespace); //A
    addKeyboardSinglePress(68, handleRight, namespace); //D

    addKeyboardSinglePress(38, handleUp, namespace);
    addKeyboardSinglePress(40, handleDown, namespace);

    // /* Up/Down */
    // addKeyboardSinglePress(38, handleUp, namespace);
    // addKeyboardSinglePress(87, handleUp, namespace); //W
    // addKeyboardSinglePress(40, handleDown, namespace);
    // addKeyboardSinglePress(83, handleDown, namespace); //S


    /* OLD LEFT * RIGHT */
    // /* Right */
    // var handleRight = function() {
    //
    //     const currentCursoring = store.getState().pauseMenu.currentCursoringList;
    //
    //     /* Dive in to content area */
    //     if (currentCursoring == "pauseRoot") {
    //
    //         /* Find the selected node */
    //         const selectedNode = PauseMenuData.pauseRoot.filter(item => {
    //             return item.id == store.getState().pauseMenu.selectedMenuItem
    //         })[0];
    //
    //         /* Use the selected node's destination info */
    //         if (selectedNode.rightKeyDest) {
    //             sound_menuMove.play();
    //             setPauseMenuValue({
    //                 currentCursoringList: selectedNode.rightKeyDest[0], //needs to change based on current tab
    //                 selectedMenuItem: selectedNode.rightKeyDest[1] //needs to change based on current tab
    //             });
    //         }
    //     }
    //
    //     /* Increment stat point when leveling up */
    //     if (currentCursoring == "pauseLevelUpMenu") {
    //         const currentStatId = getCurrentlySelectedNode().statId;
    //         if (currentStatId) {
    //             incrementStatPoint(currentStatId, store.getState().playerData[currentStatId], 999);
    //             //999 is a sort-of placeholder for stat thresholding. (Not letting somebody get too high in one stat at level x)
    //         }
    //     }
    //
    // };
    // addKeyboardSinglePress(39, handleRight, namespace);
    // addKeyboardSinglePress(68, handleRight, namespace); //D
    //
    // /* Left */
    // const leftMap = {
    //     pauseStatsMenu:"pauseRoot-stats",
    //     //pauseLaptopMenu:"pauseRoot-laptop",
    //     pauseAttacksMenu:"pauseRoot-attacks",
    //     pauseItemsMenu:"pauseRoot-items"
    // };
    // var handleLeft = function() {
    //     const currentCursoring = store.getState().pauseMenu.currentCursoringList;
    //     if (currentCursoring != "pauseRoot" && currentCursoring != "pauseLevelUpMenu") {
    //         sound_menuMove.play();
    //         setPauseMenuValue({
    //             currentCursoringList: "pauseRoot",
    //             selectedMenuItem: leftMap[currentCursoring]
    //         });
    //     }
    //
    //     /* Decrement stat point when leveling up */
    //     if (currentCursoring == "pauseLevelUpMenu") {
    //         const currentStatId = getCurrentlySelectedNode().statId;
    //         if (currentStatId) {
    //             decrementStatPoint(currentStatId, store.getState().playerData[currentStatId], initialStatLevels[currentStatId]);
    //         }
    //     }
    //
    // };
    // addKeyboardSinglePress(37, handleLeft, namespace);
    // addKeyboardSinglePress(65, handleLeft, namespace); //A



    /* ENTER */
    var handleEnter = function() {

        const selectedMenuItem = store.getState().pauseMenu.selectedMenuItem;
        const currentCursoringList = store.getState().pauseMenu.currentCursoringList;

        /* Toggle an attack from the Attacks Menu */
        if (currentCursoringList == "pauseAttacksMenu") {
            togglePlayerAttack( selectedMenuItem );
        }

        /* Toggle an item from the Items Menu */
        if (currentCursoringList == "pauseItemsMenu") {
            togglePlayerItem( selectedMenuItem );
        }

        /* Enter the Level Up tab list */
        if (selectedMenuItem == "pauseRoot-levelup") {
            setPauseMenuValue({
                currentCursoringList: "pauseLevelUpMenu",
                selectedMenuItem: "pauseLevelUp-health"
            });
        }

        /* Apply an increment to a stat when in the Level Up tab list */
        if (currentCursoringList == "pauseLevelUpMenu" && selectedMenuItem != "pauseLevelUp-done") {
            const currentStatId = getCurrentlySelectedNode().statId;
            if (currentStatId) {
                incrementStatPoint(currentStatId, store.getState().playerData[currentStatId], 999);
            }

            /* If no skill points remaining, jump to the DONE button */
            if (skillPointsRemaining() == 0) {
                setPauseMenuValue({
                    selectedMenuItem: "pauseLevelUp-done"
                });
            }

        }

        /* Submit your level up! */
        if (selectedMenuItem == "pauseLevelUp-done") {
            sound_submit.play();

            submitLevelUp();

            setPauseMenuValue({
                showMenuTab: null // Sorta Hacky. Force an Unmount
            });

            /* Update the pause screen state. Get fresh copy of sidebar menu */
            const list = PauseMenuData.getCensoringList("pauseRoot");
            const postLevelUpSelectedId = list[0].id;
            const postLevelUpContent = (postLevelUpSelectedId == "pauseRoot-stats") ? "pauseRoot-stats" : "pauseRoot-levelup" ;
            setPauseMenuValue({
                currentCursoringList: "pauseRoot",
                selectedMenuItem: postLevelUpSelectedId,
                showMenuTab: postLevelUpContent
            });
        }
    };
    addKeyboardSinglePress(13, handleEnter, namespace);



    /* ESC */
    var handleEsc = function() {

        /* Cancel out of Level Up page */
        if (store.getState().pauseMenu.currentCursoringList == "pauseLevelUpMenu") {
            sound_crapout.play();
            resetStatPoints(initialStatLevels);
            setPauseMenuValue({
                currentCursoringList: "pauseRoot",
                selectedMenuItem: "pauseRoot-levelup"
            });
            return;
        }

        /* Exit back to game */
        store.dispatch({
            type: "SET_GAME_AREA",
            payload: {
                gameArea: "map"
            }
        });
    };
    addKeyboardSinglePress(27, handleEsc, namespace);


}