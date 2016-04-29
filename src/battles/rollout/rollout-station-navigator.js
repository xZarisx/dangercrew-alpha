import store from '../../init/store';
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../helpers/single-keypress-binding';
import {addBattleResult} from '../../redux-action-creators/story-points-actions'
import setPlayerDataValue from '../../redux-action-creators/set-player-data-value'

/* ACTION CREATORS */
function setStation(station) {
    if (!station) {
        console.warn('no value for setStation')
    }
    store.dispatch({
        type: "SET_ROLLOUT_EVENT_STATION",
        payload: {
            rolloutEventStation: station
        }
    })
}
function setTextMessage(message) {
    store.dispatch({
        type: "SET_TEXT_MESSAGE",
        payload: {
            textMessage: message
        }
    })
}
/* --------------------------------- */

function handleEndOfRound() {
    /* RESET ALL PIECES OF ROLLOUT STATE */
    setStation("init");

    /* CHECK DEATHS */
    const combatants = store.getState().combatants;
    const notAlive = Object.keys(combatants).filter(c => {
        return combatants[c].hp <= 0
    });

    if (notAlive.length == 0) {

        store.dispatch({
            type: "SET_ROLLOUT_INDEX",
            payload: { rolloutIndex: 0 }
        });
        store.dispatch({
            type: "SET_ROLLOUT",
            payload: { rollout: [] }
        });

        store.dispatch({type: "CLEAR_BATTLE_SUBMISSIONS"});

    } else {
        setStation("death");
        doDeathSequence(notAlive[0]);
    }
}

function doDeathSequence(id) {

    const station = store.getState().battleUi.rolloutEventStation;
    if (station == "death") {

        store.dispatch({
            type: "ADD_STYLE_TO_COMBATANT",
            payload: {
                key: id,
                style: {
                    animation: "die 2s forwards"
                }
            }
        });

        const dier = store.getState().combatants[id];

        /* SET TEXT DIALOG */
        setTextMessage(null);
        setTextMessage(`${dier.name} has run out of battery life!`);

        /* After Death */
        setStation("afterDeath");
    }
}




function gotoNextEvent() {
    setTextMessage(null); /* Reset event text */
    const index = store.getState().battleUi.rolloutIndex;

    /* If no more events, set Index back to 0, clear rollout and return false */
    if (typeof store.getState().rollout[index+1] == "undefined" ) {
        handleEndOfRound();
        return false;
    }


    /* There is another event. Go to it */
    store.dispatch({
        type: "SET_ROLLOUT_INDEX",
        payload: {
            rolloutIndex: index + 1
        }
    });
    setStation("init");
    incrementRolloutStation2();
}


function handleBattleOver() {
    const combatants = (store.getState().combatants);
    const winner_id = Object.keys(combatants).filter(c => {
        return combatants[c].hp > 0
    })[0];
    const winner = combatants[winner_id];

    if (!winner) {console.warn('no winner found')}

    store.dispatch({
        type: "ADD_STYLE_TO_COMBATANT",
        payload: {
            key: winner_id,
            style: {
                animation: "celebrate 2s infinite"
            }
        }
    });

    const opponentPersonId = store.getState().battleRequests.requesterId;

    if (winner_id == store.getState().battleUi.playerId) {
        console.log('PLAYER WON! HAPPY MUSIC');

        /* Record win as a story point */
        addBattleResult(opponentPersonId, "win");

        /*
            TODO:
            Think carefully about how to persist items.
            Are your battle items just your top 3? next battle would use your next 3?
        */

        /* Update playerData so HP, PP will be persisted */
        setPlayerDataValue({
            hp: combatants[winner_id].hp,
            pp: combatants[winner_id].pp,
            //ITEMS?
        });

    } else {
        console.log('PLAYER LOST! SAD MUSIC')

        /* Record loss as a story point */
        addBattleResult(opponentPersonId, "loss");
    }

    setStation("battleOver");

    setTextMessage(null);
    setTextMessage(`[FAST]${winner.name} is the winner!`);

}

/* awesome name, until I understand the role of this guy */
export function incrementRolloutStation2() {

    const station = store.getState().battleUi.rolloutEventStation;

    if (station == "battleOver") {
        /* DO TRANSITION-OUT-OF-BATTLE stuff here*/
        const handleExitBattleEnter = function() {
            //console.log('ENTER PRESSED! TRANSITION OUT OF BATTLE and unbind');

            /* Back to map gameArea */
            store.dispatch({
                type: "SET_GAME_AREA",
                payload: {
                    gameArea: "map"
                }
            });

            removeKeyboardSinglePress('exitBattle');

            /* Set up the Results window to fire */
            const combatants = (store.getState().combatants); /* TODO. This is copied from above. Refactor as a reusable function */
            const winner_id = Object.keys(combatants).filter(c => { //
                return combatants[c].hp > 0 //
            })[0]; //
            if (winner_id == store.getState().battleUi.playerId) {
                store.dispatch({
                    type: "SET_RESULT_PROMPT_VALUE",
                    payload: {
                        changes: {
                            showResult: true,
                            safeToPause: false
                        }
                    }
                });
            }




        };

        //bind key to exit battle
        addKeyboardSinglePress(13, handleExitBattleEnter, 'exitBattle');


        /* Mobile Tap */
        $('.message-board').on('click.exitBattle', function() {
            handleExitBattleEnter();
        });

        return;
    }

    if (station == "afterDeath") {
        setTimeout(()=> {
            handleBattleOver();
        }, 1000);
        return;
    }

    const rolloutEvent = store.getState().rollout[ store.getState().battleUi.rolloutIndex ];
    if (!rolloutEvent.messages) {
        /* The original caster might be dead, or the turn was cancelled*/
        console.warn('The original caster might be dead, or the turn was cancelled');

        /* warp to next turn in queue */
        gotoNextEvent();

        return;
    }


    if (station == "init") {
        if (rolloutEvent.messages.before) {
            setStation("before");
            setTextMessage(rolloutEvent.messages.before);
            return;
        } else {
            setStation("animation"); /* animation will auto recall RolloutStation when done */
            return;
        }
    }

    if (station == "before") {
        if (store.getState().battleUi.textMessageDoneRolling) {
            /* bind the keyboard event now. listen for it, then move on to animation */
            setStation("beforeConfirmation");

            const handleEnter = function() {
                removeKeyboardSinglePress('beforeConfirmation');
                incrementRolloutStation2();
            };

            addKeyboardSinglePress(13, handleEnter, 'beforeConfirmation');

            /* Mobile Tap */
            $('.message-board').on('click.beforeConfirmation', function() {
                handleEnter();
            });
            return;
        }
    }

    if (station == "beforeConfirmation") {

        if (rolloutEvent.cancelAnimation) {
            setStation("actions");
            incrementRolloutStation2();
            return;
        } else {
            setStation("animation"); /* animation will auto recall RolloutStation when done */
            return;
        }
    }

    if (station == "animation") {

        /* The animation is done */
        setStation("actions");
        incrementRolloutStation2();
        return;
    }

    if (station == "actions") {

        /* Dispatch the actions */
        dispatchRolloutActions(rolloutEvent.combatantActions);

        if (rolloutEvent.showTargetBlinking) {
            setStation("blinking");
            return;
        }

        setTextMessage(null); /* This is enough to make the TextMessage component re-render */
        setTextMessage(rolloutEvent.messages.after);

        if (rolloutEvent.messages.after) {
            setStation("after");
            setTextMessage(rolloutEvent.messages.after);
            incrementRolloutStation2();
        } else {
            gotoNextEvent();
        }
    }

    if (station == "blinking") {
        /* Copy the same stuff from actions step. TODO: This is obvious candidate for extraction */
        setTextMessage(null); /* This is enough to make the TextMessage component re-render */
        setTextMessage(rolloutEvent.messages.after);

        if (rolloutEvent.messages.after) {
            setStation("after");
            setTextMessage(rolloutEvent.messages.after);
            incrementRolloutStation2();
        } else {
            gotoNextEvent();
        }
    }


    if (station == "after") {
        if (store.getState().battleUi.textMessageDoneRolling) {
            /* bind the keyboard event now for confirming after message. listen for it, then move on to animation */
            setStation("afterConfirmation");

            const handleEnter = function() {
                removeKeyboardSinglePress('afterConfirmation');
                incrementRolloutStation2();
            };

            addKeyboardSinglePress(13, handleEnter, 'afterConfirmation');
            /* Mobile Tap */
            $('.message-board').on('click.afterConfirmation', function() {
                handleEnter();
            });
            return;
        }
    }

    if (station == "afterConfirmation") {
        gotoNextEvent();
    }

}


export function incrementRolloutStation() {
    console.warn('old incrementrolloutstation being fired')
}



function dispatchRolloutActions(actions=[]) {
    actions.forEach(action => {
        store.dispatch(action);
    })
}
