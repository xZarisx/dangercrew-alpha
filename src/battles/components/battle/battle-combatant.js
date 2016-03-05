import React from 'react'
import { connect } from 'react-redux'
import {makeSubmission} from '../../battles/submissions/submitter' //AI
import randomFromArray from '../../helpers/random-from-array'

@connect((state, props) => {
    return {
        combatant: state.combatants[props.forId],
        submissions: state.battle.submissions,
        combatantStyles: state.battleUi.combatantStyles
    }
})

class BattleCombatant extends React.Component {

    submitRandomAttack() {
        /* Computer AI: target the player and susbmit a random attack */
        const myAction = randomFromArray(this.props.combatant.attacks);
        const myTarget = (this.props.forId == "a") ? "b" : "a"; //TODO: Hardcoded. make this not hardcoded
        makeSubmission(myAction, this.props.forId, myTarget);
    }

    componentDidMount() {
        /* Computer AI: submit first attack when battle starts */
        if (!this.props.isPlayer) { //autoplaying the first selection for now
            this.submitRandomAttack();
        }
    }

    componentWillUpdate(newProps) {
        /* Submit a new attack when Submissions are cleared */
        if (!this.props.isPlayer && newProps.submissions.length == 0) {
            this.submitRandomAttack();
        }
    }

    render() {
        const playerClass = this.props.isPlayer ? "battle-player" : "battle-enemy";
        const introClass = this.props.intro ? "is-introing" : "";

        const animationStyle = this.props.combatantStyles[this.props.forId] ? this.props.combatantStyles[this.props.forId] : null;

        const style = {
            backgroundImage: `url(${this.props.combatant.skin})`,
            ...animationStyle
        };

        return (
           <div style={style} className={`${playerClass} ${introClass}`}>

           </div>
        );
    }
}

BattleCombatant.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

BattleCombatant.defaultProps = {
}



export default BattleCombatant;