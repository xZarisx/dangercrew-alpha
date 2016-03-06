import React from 'react'
import { connect } from 'react-redux'
import kickoffBattleCombatants from '../combatants/kickoff-battle-combatants'
import resetBattleState from '../services/reset-battle-state'
import CombatantStatForm from './throwaway-ui/combatant-stat-form'
import {incrementRolloutStation} from '../rollout/rollout-station-navigator'


/* Battle components */
import BattleCombatant from '../components/battle/battle-combatant'
import BattleCombatantScoreboard from '../components/battle/battle-combatant-scoreboard'
import MessageBoard from '../components/battle/message-board'
import Animations from '../components/battle/animations'
import getIntroMessage from '../components/messaging/get-intro-message'

/* DEV COMPONENTS */
//import AudioPlayer from '../audio-player'


@connect((state, props) => {
    return {
        playerId: state.battleUi.playerId,
        rollout: state.rollout,
        combatants: state.combatants,
        rolloutIndex: state.battleUi.rolloutIndex,
        rolloutEventStation: state.battleUi.rolloutEventStation
    }
})

class Arena extends React.Component {

    componentWillMount() {
        resetBattleState();
        kickoffBattleCombatants();
    }

    constructor() {
        super();
        this.state = {
            intro: true
        }
    }

    componentDidMount() {

        /* Set the intro message */
        this.props.dispatch({
            type: "SET_BATTLE_INTRO_MESSAGE",
            payload: {
                introMessage: [getIntroMessage()]
            }
        });

        setTimeout(() => {
           this.setState({
               intro: false
           });
        }, 200);
    }

    renderCurrentAnimation() {
        const currentAction = this.props.rollout[this.props.rolloutIndex];

        if (!currentAction) {
            /* Don't show anything if there is no Rollout action available (first Render) */
            return null;
        }

        const rolloutEvent = this.props.rollout[this.props.rolloutIndex];

        if (this.props.rolloutEventStation == "animation") { /* The second step */
            /* Get Animation React Component and return it on the page */
            return Animations[currentAction.animation].call(this, rolloutEvent); /* give copy of Event to the animation */
        }
        return null;
    }

    render() {

        return (
            <main className="battle-frame">

                    <div className="battle-container">
                        <div className="battle-arena">


                            <BattleCombatant forId="a" isPlayer={true} intro={this.state.intro} />
                            <BattleCombatantScoreboard forId="a" isPlayer={true} intro={this.state.intro} />

                            <BattleCombatant forId="b" isPlayer={false} intro={this.state.intro} />
                            <BattleCombatantScoreboard forId="b" isPlayer={false} intro={this.state.intro} />


                            {this.renderCurrentAnimation()}
                        </div>
                        <MessageBoard />
                    </div>


                {/*<AudioPlayer />*/}
                {/*
                <div>
                    <CombatantStatForm id="a" color="#9b59b6" />
                    <CombatantStatForm id="b" color="#3498db" />
                </div>
                */}
            </main>
        );
    }
}

Arena.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
};

Arena.defaultProps = {
};

const containerStyle = {
    display: "flex",
    justifyContent: "space-between"
};

export default Arena;