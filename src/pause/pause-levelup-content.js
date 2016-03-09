import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'
import store from '../init/store'
import {skillPointsRemaining} from '../level-up/levelup-utilities'

@connect((state, props) => {
    return {
        selectedMenuItem: state.pauseMenu.selectedMenuItem
    }
})

class PauseLevelUpContent extends React.Component {

    render() {

        const characterStats = PauseMenuData["pauseLevelUpMenu"].map(stat => {

            /* Value of Individual Stat */
            const value = stat.statId ? store.getState().playerData[stat.statId] : null;

            /* Styles per row */
            const activeClass = (stat.id == this.props.selectedMenuItem) ? "is-active" : "";
            const rowClass = stat.rowClass || "";

            return (
                <div key={stat.id} className={`${activeClass} ${rowClass} _spreading-list-item pause-stat-item`}>
                    <div>{stat.label}</div>
                    <div className="pause-stat-value">
                        <div className="_ibm pause-levelup-arrow arrow-left"></div>
                        <div className="_ibm pause-levelup-value">{value}</div>
                        <div className="_ibm pause-levelup-arrow arrow-right"></div>
                    </div>
                </div>
            )
        });

        const pressEnterPrompt = (this.props.selectedMenuItem == "pauseRoot-levelup") ? <div>PRESS ENTER TO LEVEL UP</div> : null;

        return (
            <div>
                {/*pressEnterPrompt*/}
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