import React from 'react'
import { connect } from 'react-redux'
import {easeOutQuad} from '../../../helpers/easing-helpers'
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'
import ScorboardHealthbar from './battle-combatant-scoreboard-healthbar'

/* I don't love that this is right here, but this is the general "I've lost HP" sound */
import { Howl } from 'howler'
var sound_baBuhm = new Howl({ urls: ['/dist/assets/sfx/baBuhm.mp3']});

@connect((state, props) => {
    return {
        combatant: state.combatants[props.forId]
    }
})

class BattleCombatantScoreboard extends React.Component {

    constructor(props) {
        super();
        this.state = {
            displayHp: props.combatant.hp, /* initial value */
            isVisible: false
        }
    }

    componentWillUpdate(newProps) {


        if (newProps.intro != this.props.intro && !newProps.intro) {
            /* intro is now False. Time to show this component */
            setTimeout(() => {
                this.setState({isVisible: true});
            }, 1100); /* TODO: make this wait for DONE flag */

        }

        if (newProps.combatant.hp != this.props.combatant.hp) {
            /* launch initHPChange Sequence when hp changes */
            const diff = this.props.combatant.hp - newProps.combatant.hp;

            /* If diff is a decrease in HP, play the boom */
            if (diff > 0) {
                /* TODO: This could be broken out into percentage brackets for ineffective moves... if < 5% of maxHp, make a weak sound*/
                sound_baBuhm.play();
            }

            this.initHPChangeSequence(diff, this.props.combatant.hp);
        }
    }

    setStyleOnCombatant(style={}) {
        this.props.dispatch({
            type: "ADD_STYLE_TO_COMBATANT",
            payload: {
                key: this.props.forId,
                style: {
                    ...style
                }
            }
        });
    }

    initHPChangeSequence(change, initialValue) {
        var self = this;
        var totalIterations = 100, iteration = 0;

        var step = function() {
            if (iteration < totalIterations) {
                iteration += 1;
                self.setState({
                    displayHp: easeOutQuad(iteration, initialValue, -change, totalIterations)
                });

                window.requestAnimationFrame(step);
            } else {
                self.handleCompleteSequence();
            }
        };

        /* Initially, set myself to blinking */
        //console.warn('set to blinking');
        self.setStyleOnCombatant({animation: "blink 0.3s steps(2, start) infinite"});

        /* Kick off the sequence */
        window.requestAnimationFrame(step);
    }

    handleCompleteSequence() {
        /* Remove my blinking */
        //console.warn('remove blinking');
        this.setStyleOnCombatant({});
        incrementRolloutStation2();
    }

    renderPlayerSpecificUi() {
        return (
            <div className="player-scoreboard-stats">
                <div className="_ibm player-scoreboard-stat">HP {Math.round(this.state.displayHp)}/{this.props.combatant.maxHp}</div>
                <div className="_ibm player-scoreboard-stat">PP {this.props.combatant.pp}/{this.props.combatant.maxPp}</div>
                <div className="_ibm player-scoreboard-stat">Items: {this.props.combatant.items.length}</div>
            </div>
        )
    }

    renderStatusBadge() {
        if (this.props.combatant.status == "normal") {
            return null;
        }

        const battleStatus = (this.props.combatant.status == "memoryLeak") ? "MEMORY LEAK" : "LAGGING";
        return (
            <div className="_ibb scoreboard-status">({battleStatus})</div>
        )
    }

    render() {

        const positionClass = this.props.isPlayer ? "battle-scoreboard-player" : "battle-scoreboard-enemy"
        const hpPercent =  (Math.round(this.state.displayHp) / this.props.combatant.maxHp) * 100;
        const style = {
            transition: 'opacity 0.3s',
            opacity: this.state.isVisible ? 1 : 0
        };
        const playerSpecificUi = this.props.isPlayer ? this.renderPlayerSpecificUi() : null;

        return (
           <div className={positionClass} style={style}>
               <div className="_ibb scoreboard-name">{this.props.combatant.name}</div>
               <div className="_ibb scoreboard-level">LVL {this.props.combatant.level}</div>
               {this.renderStatusBadge()}
               <ScorboardHealthbar percent={hpPercent} />
               {playerSpecificUi}
           </div>
        );
    }

}

export default BattleCombatantScoreboard;