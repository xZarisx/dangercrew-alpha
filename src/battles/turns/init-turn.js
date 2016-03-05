import store from '../../init/store'
import orderSubmissions from '../submissions/order-submissions'
import {extractQueuedSubmissions, removeQueueSlot} from '../submissions/queued-submissions'
import executeSubmission from '../submissions/execute-submission'
import RolloutEvent from '../rollout/rollout-event'
import makeId from '../../helpers/make-id'
import {autoSubmitTurns} from '../submissions/submitter'

export default function() {

    /* Sync processor to current real state */
    const copiedRealState = {...store.getState().combatants}
    store.dispatch({
        type: "SET_PROCESSING_COMBATANTS",
        payload: copiedRealState
    });

    /* Get waiting queued submissions + submitted */
    /* Give a unique ID to each submission */
    const submissions = [
        ...extractQueuedSubmissions(store.getState().battle.queuedSubmissions),
        ...store.getState().battle.submissions
    ].map(sub => {
        return {
            ...sub,
            id: makeId('submission') /* The ID lets us find the right spot to place a Natural */
        };
    });

    /* Move the submissions queue train forward */
    store.dispatch({
        type: "SET_BATTLE_QUEUED_SUBMISSIONS",
        payload: removeQueueSlot(store.getState().battle.queuedSubmissions)
    });

    /* Order the submissions */
    const ordered = orderSubmissions(submissions);

    /* Add Natural Submissions Loop: Check to see if we need to add additional submissions */
    var submissionTrain = [...ordered]; //Will be submitted into

    /* TODO: Find a way to unit test this Natural adding process */
    ordered.forEach( (o) => {
       if (o.casterPostTurnAddSubmission) {

           /* Find the submission that we need to insert after */
           /* TODO: by nature, we won't know about stuff applied during THIS turn. */
           /* TODO: (because we only append turns at the initial processing) */
           /* TODO: maybe this should happen after each individual turn is executed */
           const index = submissionTrain.map((trainSub) => {
               return trainSub.id;
           }).indexOf(o.id);

           /* Add an additional submission right behind the ordered one */
           submissionTrain.splice(index + 1, 0, {
               id: makeId('submission_natural'),
               action_id: "action_naturaleffect_memoryLeak_001",
               caster_id: o.caster_id,
               casterPostTurnAddSubmission: null,
               isFromQueue: false
           });
       }
    });


    /* Execute each submission, in order */
    /* Only Master player would do this */
    var rollout = [];
    submissionTrain.forEach((submission) => {
        const executed = executeSubmission(submission);

        /* Apply the changes to processor state */
        executed.processorActions.forEach(action => {
            store.dispatch(action);
        }); /* Now the turn processing is over */

        /* Create a new Rollout Event (messages and combatant state tree actions) */
        rollout.push( new RolloutEvent(executed) );
    });

    /* Set the constructed Rollout */
    store.dispatch({
        type: "SET_ROLLOUT",
        payload: {
            rollout: rollout
        }
    });

    /* Reset Battle UI to the root */
    store.dispatch({
        type: "SET_TERMINAL_MENU_KEY",
        payload: {
            terminalMenuKey: "menuRoot"
        }
    });
    store.dispatch({
        type: "SET_TERMINAL_MENU_INDEX",
        payload: {
            terminalMenuSelectedIndex: 0
        }
    });

    /* Normally we would click through these */
    /* if isAutoplay is true, lets rapid fire through these messages, animations, and store dispatches */
    if (store.getState().battle.isAutoplayMode) {
        rollout.forEach((r)=> {

            if (r.messages && r.messages.before) {
                console.log(r.messages.before)
            }

            r.combatantActions.forEach(action => {
                store.dispatch(action);
            });

            if (r.messages && r.messages.after) {
                console.log(r.messages.after)
            }

            console.log('-------------------------------------------')
        });
    }

    if (store.getState().battle.isAutoplayMode) {
        /* Clear the old submissions. We're ready for a new turn */
        store.dispatch({
            type: "CLEAR_BATTLE_SUBMISSIONS"
        });
    }


    //CHECK WHO IS ALIVE
    const combatants = store.getState().combatants;
    const stillAlive = Object.keys(combatants).filter(c => {
       return combatants[c].hp > 0
    });
    const notAlive = Object.keys(combatants).filter(c => {
        return combatants[c].hp <= 0
    });

   // if (!store.getState().battle.isAutoplayMode) {
        /* This will need to get re-worked for more than 1v1 */
        //console.log('stillAlive', stillAlive);
        //if (stillAlive.length == 1) {
        //    console.log('DEATH SEQUENCE')
        //    showDeathSequence(notAlive[0]);
        //}
    //}

    /* AUTOPLAY: KEEP SUBMITTING TURNS */
    if (store.getState().battle.isAutoplayMode) {

        if (stillAlive.length > 1) {
            setTimeout(function () {
                store.dispatch({
                    type: "SET_ROLLOUT",
                    payload: {
                        rollout: []
                    }
                });
                autoSubmitTurns();
            }, 4);

        } else {
            store.dispatch({
                type: "ADD_BATTLE_WINNER",
                payload: stillAlive[0] || null
            });
            console.warn('WINNER IS', stillAlive)
        }
    }




}