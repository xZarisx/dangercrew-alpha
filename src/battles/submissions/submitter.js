import store from '../../store'
import randomFromArray from '../../helpers/random-from-array'
import getOtherCombatants from '../services/get-other-combatants'
import Combatant from '../combatants/combatant-model'
import Actions from '../actions/battle-actions'
import initTurn from '../turns/init-turn'
import seedCombatants from '../combatants/seed-simulant-combatants'

var resetCombatants = function() {
    const resets = {
        hp: 50,
        pp: 50,
        status:"normal",
        accuracyModifier: 0,
        attackModifier: 0,
        defenseModifier: 0,
        speedModifier: 0,
        efficiencyModifier: 0,
        items: [
            "action_item_hp_001",
            "action_item_accuracy_001",
            "action_item_sticker_attack_001",
            "action_item_sticker_defense_001",
            "action_item_sticker_speed_001",
            "action_item_sticker_efficiency_001",

            "action_item_clearStatus_lag_001",
            "action_item_clearStatus_memoryLeak_001"
        ]
    };
    seedCombatants(resets);

    store.dispatch({
        type: "SET_ROLLOUT",
        payload: {
            rollout: []
        }
    });
};

export function startBattleSeries() {

    store.dispatch({
        type: "SET_SERIES_WINNER_COUNT",
        payload: {
            seriesWinnerCount: 0
        }
    });
    var currentValue = [];

    var unsubscribe = store.subscribe(() => {
        var previousValue = currentValue;
        currentValue = store.getState().battle.winners;

        if (previousValue.length < currentValue.length) {
            console.warn('winners has gone up!', currentValue);

            store.dispatch({
                type: "SET_SERIES_WINNER_COUNT",
                payload: {
                    seriesWinnerCount: store.getState().battle.seriesWinnerCount + 1
                }
            });


            if (store.getState().battle.seriesWinnerCount < store.getState().battle.seriesBattleLength) {
                console.log('starting new battle')
                startNewBattle();
            } else {
                console.log('unsubscribing')
                unsubscribe();
            }


        }
    });

    startNewBattle();
}

function startNewBattle() {
    store.dispatch({
        type: "SET_BATTLE_QUEUED_SUBMISSIONS",
        payload: []
    });

    resetCombatants();

    console.log('reset')
    autoSubmitTurns();
    console.log('autoSubmitNewTurns')
}


export function autoSubmitTurns() {
    const combatants = store.getState().combatants;

    if (!Object.keys(combatants).length) {
        console.warn('No combatants')
        return;
    }

    for (var c in combatants) {

        const availableActions = [...combatants[c].attacks, ...combatants[c].items];
        const action_id = randomFromArray(availableActions);

        const target_id = /item_/.test(action_id) ? null : randomFromArray(getOtherCombatants(c));
        makeSubmission(action_id, c, target_id);
    }
}


export function makeSubmission(action_id, caster_id=null, target_id=null) {


    const caster = new Combatant(store.getState().combatants[caster_id]);
    const actionSpeed = Actions[action_id].speedModifier;

    const submission = {
        action_id,
        caster_id,
        target_id,
        speedRoll: caster.getSpeedRoll(actionSpeed),
        casterPostTurnAddSubmission: (caster.status == "memoryLeak") ? "memoryLeak" : null,
        isFromQueue: false
    };

    /* Dispatch a Submitted Turn */
    store.dispatch({
        type: "ADD_BATTLE_SUBMISSION",
        payload: submission
    });

    /* Init a new turn when all submissions are in */
    const state = store.getState();
    if (state.battle.submissions.length == Object.keys(state.combatants).length) {
        initTurn();
    }
}