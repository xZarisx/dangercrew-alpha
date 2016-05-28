import store from '../../init/store'
import Actions from '../actions/battle-actions'
import Combatant from '../combatants/combatant-model'
import {percentChance, getRandomInRange} from '../../helpers/numbers-helper'
import {getBestItems, getWorstItems, getRandomItems} from '../services/get-items'
import removeItemsFromArray from '../../helpers/remove-item-from-array'
import {addQueuedSubmissions} from '../submissions/queued-submissions'

export default function(submission, mock={}) {
    /* Take a submission and walk it through these steps */
    const caster = submission.caster_id ? new Combatant(store.getState().combatProcessor[submission.caster_id]) : null;
    const target = submission.target_id ? new Combatant(store.getState().combatProcessor[submission.target_id]) : null;
    const action = Actions[submission.action_id];

    //console.log('-------- EXECUTING --------', action.name)
    var trivia = { /* Do we need a schema here? maybe could clean up part of this file*/
        didUseItem: false,
        caster_id: submission.caster_id,
        target_id: submission.target_id,
        action_id: submission.action_id
    };

    var attackRoll = (typeof mock.attackRoll == "number") ? mock.attackRoll : caster.attackRoll; /* Hatch for unit testing */
    const defenseRoll = (typeof mock.defenseRoll == "number") ? mock.defenseRoll : (target ? target.defenseRoll : 0); /* Hatch for unit testing */

    /* Result #1: The turn does nothing to state tree */
    /* Dead */
    if (caster.isDead()) {
        //console.log('==== The Turn is -> caster is dead')
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                cancelAnimation: true,
                eventExit: "dead"
            }
        };
    }
    /* Tried to execute an action when lagging */
    if (caster.status == "lag" && !action.itemValue && !action.isNaturalStatusEvent) {
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                eventExit: "cancelled:lag",
                overrideAnimation: "lag-out" /* TODO: not being used yet. Need to use this instead of the attack's animation */
            }
        };
    }

    /* Would die by lagout, but enemy was just killed */
   // if (action.isNaturalStatusEvent) { /* TODO: These rules should apply for every move, right? Re-investigate if weird bugs come up */
        const combatants = store.getState().combatProcessor;
        const stillAlive = Object.keys(combatants).filter(c => {
            return combatants[c].hp > 0
        });
        if (stillAlive.length == 1 ) {
            return {
                processorActions: [],
                trivia: {
                    ...trivia,
                    eventExit: "cancelled:everybody-else-is-dead"
                }
            };
        }
    //}



    /* Natural event trying to expire a non-existing lag */
    if (caster.status != "lag" && !action.itemValue && action.isNaturalStatusEvent) {
        if (action.clearCasterStatuses.indexOf("lag") != -1) {
            return {
                processorActions: [],
                trivia: {
                    ...trivia,
                    cancelAnimation: true,
                    eventExit: "lagexpire::irrelevant"
                }
            };
        }
    }

    const accuracyRoll = mock.accuracyRoll || caster.accuracyRoll; /* Hatch for unit testing */
    trivia.accuracyRoll = accuracyRoll;

    if (percentChance(100 - accuracyRoll - action.accuracyModifier)) {
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                eventExit: "miss",
                accuracyRoll: accuracyRoll,
                cancelAnimation: true
            }
        };
    }

    if (target && action.targetResistanceNeeded > 0 && defenseRoll >= action.targetResistanceNeeded) {
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                cancelAnimation: true,
                eventExit: "resisted",
                defenseRoll: defenseRoll
            }
        };
    }

    if (target && target.status != "normal" && action.affectTargetStatus != "normal") {
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                cancelAnimation: true,
                eventExit: "resisted::irrelevant"
            }
        };
    }

    if (target && action.theftQuantity > 0 && target.items.length == 0) {
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                cancelAnimation: true,
                eventExit: "resisted::noitems"
            }
        };
    }

    //Calculate damage to see if attack was blocked
    const repetitions = action.repetitions.length
        ? getRandomInRange(action.repetitions[0],action.repetitions[1])
        : 1;
    var damage = 0;
    trivia.repetitions = repetitions;



    for (var i=1; i<=repetitions; i++) {
        /* Optionally neglect stat points and only use the action's number (Insult). Otherwise, do the calculation */
        const strike = action.neglectAttackStat ? action.affectTargetHpPoints : (action.affectTargetHpPoints + attackRoll - defenseRoll);
        damage = (strike > 0) ? damage + strike : damage;
    }

    if (action.affectTargetHpPoints > 0 && damage <= 0) {
        //console.log('The Turn is -> target blocked the attack');
        return {
            processorActions: [],
            trivia: {
                ...trivia,
                cancelAnimation: true,
                eventExit: "blocked"
            }
        };
    }

    /* Result #2: Changes on the state tree. At this point, EDIT: most occurrences should have payload change */
    var casterPayload = {};
    var targetPayload = {};

    if (action.ppCost > 0) {
        casterPayload.pp = caster.pp - action.ppCost;
    }


    if (action.affectTargetHpPoints > 0) {
        targetPayload.hp = (target.hp - damage > 0) ? (target.hp - damage) : 0;
        trivia.showTargetBlinking = true;
    }

    if (action.affectTargetStatus != "normal") {
        targetPayload.status = action.affectTargetStatus;
        trivia.causedStatus = action.affectTargetStatus;

        /* Insert into train to expire status conditions, if relevant */
        //
            if (action.statusTurnCount.length && trivia.causedStatus == "lag") {
                const turns = getRandomInRange(action.statusTurnCount[0], action.statusTurnCount[1]);
                const currentTrain = store.getState().battle.queuedSubmissions;
                const expirationSubmission = {
                    caster_id: submission.target_id, //Target will end up Casting the heal
                    target_id: null,
                    speedRoll: 9999,
                    action_id: "action_naturaleffect_lagExpire"
                };
                const newTrain = addQueuedSubmissions(currentTrain, expirationSubmission, turns);

                store.dispatch({
                    type: "SET_BATTLE_QUEUED_SUBMISSIONS",
                    payload: newTrain
                })
            }
        //
    }

    if (action.theftQuantity > 0) {
        //Identify the items
        const itemsToSteal = getRandomItems(target.items, action.theftQuantity);

        trivia.stolenItems = itemsToSteal;
        targetPayload.items = removeItemsFromArray(target.items, itemsToSteal);
        casterPayload.items = [ ...caster.items, ...itemsToSteal ];
    }


    /* Natural Status Effects */
    if (action.isNaturalStatusEvent) {
        /* Memory Leak */
        if (action.affectCasterHpPointsByPercent != 0) {
            const damageFromPercentHit = Math.ceil(caster.maxHp * action.affectCasterHpPointsByPercent);
            casterPayload.hp = (caster.hp + damageFromPercentHit > 0) ? (caster.hp + damageFromPercentHit) : 0;
            trivia.submittedByStatus = action.submittedByStatus;
            trivia.hpLost = (damageFromPercentHit < 0) ? (damageFromPercentHit * -1) : damageFromPercentHit;

            if (casterPayload.hp == 0 ) {
                console.warn(`${submission.caster_id} is dead by memory leak!`);
                //Need to submit a natural event here
            }
        }
        /* TODO: Test an example of recovering hp on every turn? Like a Blessing attack */

        if (action.clearCasterStatuses.length) {
            if (action.clearCasterStatuses.indexOf(caster.status) != -1) {
                casterPayload.status = "normal";
                trivia.submittedByStatus = caster.status;
            }
        }

    }


    //------- ITEMS -------
    if (action.itemValue) {
        trivia.didUseItem = true;
        /* this is an item, remove from my inventory */
        casterPayload.items = removeItemsFromArray(caster.items, [submission.action_id]);

        /* RECOVER HP UP TO MAX */
        if (action.affectCasterHpPoints > 0) {
            /* TODO: use efficiency */
            const sum = caster.hp + action.affectCasterHpPoints;
            const casterHp = sum < caster.maxHp ? sum : caster.maxHp;
            casterPayload.hp = casterHp;
            trivia.hpRecovered = casterHp - caster.hp;
        }

        /* RECOVER PP UP TO MAX */
        if (action.affectCasterPpPoints > 0) {
            const sum = caster.pp + action.affectCasterPpPoints;
            const casterPp = sum < caster.maxPp ? sum : caster.maxPp;
            casterPayload.pp = casterPp;
            trivia.ppRecovered = casterPp - caster.pp;
        }

        /* CHANGE A STATUS BACK TO NORMAL */
        if (action.clearCasterStatuses.length) {
            if (action.clearCasterStatuses.indexOf(caster.status) != -1) {
                casterPayload.status = "normal";
                trivia.statusWas = caster.status;
            } else {
                return {
                    processorActions: [
                        {
                            type: "MERGE_PROCESSED_COMBATANT",
                            payload: {
                                key: submission.caster_id,
                                changes: casterPayload
                            }
                        }
                    ],
                    trivia: {
                        ...trivia,
                        eventExit: "itemfail::wrongstatus",
                        defenseRoll: defenseRoll
                    }
                }
            }
        }


        /* INCREASE A STAT (Stickers, accuracy, etc) */
        var checkAndApplyIncreasedStat = function(actionPropertyName, casterModifier, statName) {
            if (action[actionPropertyName] > 0) {

                /* Boost with efficiency stat points if not improving Efficiency stat itself */
                const effBoost = actionPropertyName != "affectCasterEfficiencyPoints" ? caster.efficiencyRating : 0;
                casterPayload[casterModifier] = caster[casterModifier] + effBoost + action[actionPropertyName];

                var increases = {};
                increases.statName = statName;
                increases.increasedBy = effBoost + action[actionPropertyName];
                trivia.statIncreases = [increases]
            }
        };
        [
            {actionPropertyName: "affectCasterAccuracyPoints", casterModifier:"accuracyModifier", statName: "accuracy"},
            {actionPropertyName: "affectCasterAttackPoints", casterModifier:"attackModifier", statName: "attack"},
            {actionPropertyName: "affectCasterDefensePoints", casterModifier:"defenseModifier", statName: "defense"},
            {actionPropertyName: "affectCasterSpeedPoints", casterModifier:"speedModifier", statName: "speed"},
            {actionPropertyName: "affectCasterEfficiencyPoints", casterModifier:"efficiencyModifier", statName: "efficiency"},
        ].forEach(statConfig => {
           checkAndApplyIncreasedStat(statConfig.actionPropertyName, statConfig.casterModifier, statConfig.statName);
        });
    }


    var processorActions = [
        {
            type: "MERGE_PROCESSED_COMBATANT",
            payload: {
                key: submission.caster_id,
                changes: casterPayload
            }
        }
    ];
    if (submission.target_id) { /* This was merging a combatant as "null" */
        processorActions.push({
            type: "MERGE_PROCESSED_COMBATANT",
            payload: {
                key: submission.target_id,
                changes: targetPayload
            }
        })
    }


    return {
        processorActions:processorActions,
        trivia: {
            ...trivia
        }
    };

}