import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'
//import store from '../init/store'
import {skillPointsRemaining} from '../level-up/levelup-utilities'

@connect((state, props) => {
    return {
        selectedMenuItem: state.pauseMenu.selectedMenuItem,

        healthStatPoints: state.playerData.healthStatPoints,
        attackStatPoints: state.playerData.attackStatPoints,
        defenseStatPoints: state.playerData.defenseStatPoints,
        speedStatPoints: state.playerData.speedStatPoints,
        efficiencyStatPoints: state.playerData.efficiencyStatPoints
    }
})

class PauseLevelUpContent extends React.Component {

    componentWillMount() {
        /* Set up initial StatPoints for remembering the minimums */
        this.initialStatPoints = {
            healthStatPoints: this.props.healthStatPoints,
            attackStatPoints: this.props.attackStatPoints,
            defenseStatPoints: this.props.defenseStatPoints,
            speedStatPoints: this.props.speedStatPoints,
            efficiencyStatPoints: this.props.efficiencyStatPoints
        }
    }

    renderPrompt() {
        const overlayStyle = {
            position:'absolute',
            left:0, right:0,top:0, bottom:0,
            background:'rgba(0,0,0,0.9)'
        };
        const overlayMessage = {
            position:'absolute',
            top: '50%', left: '50%',
            transform: 'translate3d(-50%,-50%,0)',
            background: '#444',
            padding: '2vw',
            width: '35vw',
            textAlign: 'center',
            borderBottom: '1vw solid #333'
        };
        return (
            <div style={overlayStyle}>
                <div style={overlayMessage}>Press ENTER to level up!</div>
            </div>
        )
    }

    render() {

        const characterStats = PauseMenuData["pauseLevelUpMenu"].map(stat => {

            /* Value of Individual Stat */
            const value = stat.statId ? this.props[stat.statId] : null;

            /* Styles per row */
            const activeClass = (stat.id == this.props.selectedMenuItem) ? "is-active" : "";
            const rowClass = stat.rowClass || "";

            const hideLeftArrowClass = (this.props[stat.statId] > this.initialStatPoints[stat.statId]) ? "" : "hide-arrow" ;
            const hideRightArrowClass = (skillPointsRemaining() > 0) ? "" : "hide-arrow" ;

            return (
                <div key={stat.id} className={`${activeClass} ${rowClass} _spreading-list-item pause-stat-item`}>
                    <div>{stat.label}</div>
                    <div className="pause-stat-value">
                        <div className={`_ibm pause-levelup-arrow arrow-left ${hideLeftArrowClass}`}></div>
                        <div className="_ibm pause-levelup-value">{value}</div>
                        <div className={`_ibm pause-levelup-arrow arrow-right ${hideRightArrowClass}`}></div>
                    </div>
                </div>
            )
        });

        const pressEnterPrompt = (this.props.selectedMenuItem == "pauseRoot-levelup") ? this.renderPrompt() : null;

        return (
            <div className="pause-levelup-content">
                {pressEnterPrompt}
                <div className="_spreading-list-item pause-stat-item">
                    <div>SKILL POINTS</div>
                    <div className="pause-stat-value">Remaining: {skillPointsRemaining()}</div>
                </div>
                {characterStats}
            </div>
        );
    }
}

export default PauseLevelUpContent;