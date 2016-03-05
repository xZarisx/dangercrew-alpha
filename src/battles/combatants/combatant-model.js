import {baseRoll, coinToss} from '../../helpers/numbers-helper'

export default function(combatant={}) {
    if (typeof combatant != "object") {
        console.warn('Combatant model defined incorrectly. Expected object, got', typeof combatant)
    }

    return {
        ...combatant,

        accuracyRoll: (
            90 + combatant.accuracyModifier /* should be 0 to 100 after modifiers */
        ),
        attackRoll: (
            baseRoll() + combatant.attackStatPoints + combatant.attackModifier
        ),
        defenseRoll: (
            baseRoll() + combatant.defenseStatPoints + combatant.defenseModifier
        ),

        efficiencyRating: (
            combatant.efficiencyStatPoints + combatant.efficiencyModifier
        ),


        getSpeedRoll(externalModifier=0) {
            return baseRoll() + combatant.speedStatPoints + combatant.speedModifier + externalModifier
        },

        isDead() {
            return combatant.hp <= 0
        },
        isAlive() {
            return combatant.hp > 0
        }

    }
}