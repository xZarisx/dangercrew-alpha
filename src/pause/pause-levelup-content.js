import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'
import store from '../init/store'
import {incrementStatPoint, decrementStatPoint, skillPointsRemaining} from '../level-up/levelup-utilities'

@connect((state, props) => {
    return {
        level: state.playerData.level,
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

    // componentWillUpdate(newProps) {
    //     if (newProps.level > this.props.level) {
    //
    //         this.initialStatPoints = {
    //             healthStatPoints: newProps.healthStatPoints,
    //             attackStatPoints: newProps.attackStatPoints,
    //             defenseStatPoints: newProps.defenseStatPoints,
    //             speedStatPoints: newProps.speedStatPoints,
    //             efficiencyStatPoints: newProps.efficiencyStatPoints
    //         }
    //     }
    // }


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
            const isActive = stat.id == this.props.selectedMenuItem;
            const rowClass = stat.rowClass || "";

            const hideLeftArrow = this.props[stat.statId] <= this.initialStatPoints[stat.statId];
            const hideRightArrow = skillPointsRemaining() <= 0;

            return (
                <PauseLevelUpStatRow
                    key={stat.id}
                    id={stat.statId}
                    menuItemId={stat.id}
                    label={stat.label}
                    hideLeftArrow={hideLeftArrow}
                    hideRightArrow={hideRightArrow}
                    minimum={this.initialStatPoints[stat.statId]}
                    rowClass={rowClass}
                    isActive={isActive}
                    value={value}
                />
            )
        });

        const pressEnterPrompt = (this.props.selectedMenuItem == "pauseSidebarMenu-levelup") ? this.renderPrompt() : null;

        /* Remaining Points indicator */
        const pointsRemaining = skillPointsRemaining();
        const remainingStyle = (pointsRemaining > 0) ? {opacity: 1} : {opacity:0.25};


        return (
            <div className="pause-levelup-content">
                {pressEnterPrompt}
                <div className="_spreading-list-item pause-stat-item">
                    <div>SKILL POINTS</div>
                    <div className="pause-stat-value" style={remainingStyle}>Remaining: {pointsRemaining}</div>
                </div>
                {characterStats}
            </div>
        );
    }
}



class PauseLevelUpStatRow extends React.Component {

    handleDecrementClick () {
        decrementStatPoint(this.props.id, store.getState().playerData[this.props.id], this.props.minimum);
    }

    handleIncrementClick () {
        incrementStatPoint(this.props.id, store.getState().playerData[this.props.id], 999);
    }

    handleSelectionClick() {
        store.dispatch({
            type: "SET_PAUSEMENU_VALUE",
            payload: {
                changes: {
                    selectedMenuItem: this.props.menuItemId
                }
            }
        });
    }

    render() {

        const activeClass = (this.props.isActive) ? "is-active" : "";
        const hideLeftArrowClass = (this.props.hideLeftArrow) ? "hide-arrow" : "";
        const hideRightArrowClass = (this.props.hideRightArrow) ? "hide-arrow" : "";

        return (
            <div className={`${activeClass} ${this.props.rowClass} _spreading-list-item pause-stat-item`}>
                <div onClick={::this.handleSelectionClick}>{this.props.label}</div>
                <div className="pause-stat-value">
                    <div onClick={::this.handleDecrementClick} className={`_ibm pause-levelup-arrow arrow-left ${hideLeftArrowClass}`}></div>
                    <div className="_ibm pause-levelup-value">{this.props.value}</div>
                    <div onClick={::this.handleIncrementClick} className={`_ibm pause-levelup-arrow arrow-right ${hideRightArrowClass}`}></div>
                </div>
            </div>
        )
    }
}


export default PauseLevelUpContent;