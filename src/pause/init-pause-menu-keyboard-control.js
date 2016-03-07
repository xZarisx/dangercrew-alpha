import store from '../init/store'
import {addKeyboardSinglePress} from '../helpers/single-keypress-binding'
import PauseMenuData from './pause-menu-data'
/*
 37 "left"
 39 "right"
 38 "up"
 40 "down"
 */

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


export default function(namespace="") {

    var handleUp = function() {
        const prev = getPreviousInList( store.getState().pauseMenu.selectedMenuItem, PauseMenuData[store.getState().pauseMenu.currentCursoringList]);
        setPauseMenuValue({
            selectedMenuItem: prev,
            showMenuTab: updatedMenuTab(store.getState().pauseMenu.currentCursoringList, store.getState().pauseMenu.showMenuTab, prev)
        });

    };
    var handleDown = function() {
        const next = getNextInList( store.getState().pauseMenu.selectedMenuItem, PauseMenuData[store.getState().pauseMenu.currentCursoringList]);
        setPauseMenuValue({
            selectedMenuItem: next,
            showMenuTab: updatedMenuTab(store.getState().pauseMenu.currentCursoringList, store.getState().pauseMenu.showMenuTab, next)
        });
    };

    /* Up/Down */
    addKeyboardSinglePress(38, handleUp, namespace);
    addKeyboardSinglePress(40, handleDown, namespace);


    /* Right */
    var handleRight = function() {
        if (store.getState().pauseMenu.currentCursoringList == "pauseRoot") {
            //if ("")
            setPauseMenuValue({
                currentCursoringList: "pauseStatsMenu",
                selectedMenuItem: "pauseStats-health"
            });
        }
    }
    addKeyboardSinglePress(39, handleRight, namespace);



}