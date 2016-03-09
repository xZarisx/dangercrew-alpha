import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'
import store from '../init/store'

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

            const activeClass = (stat.id == this.props.selectedMenuItem) ? "is-active" : "";

            return (
                <div key={stat.id} className={`${activeClass} _spreading-list-item pause-stat-item`}>
                    <div>{stat.label}</div>
                    <div className="pause-stat-value">{value}</div>
                </div>
            )
        });

        const pressEnterPrompt = (this.props.selectedMenuItem == "pauseRoot-levelup") ? <div>PRESS ENTER TO LEVEL UP</div> : null;

        return (
            <div>
                {pressEnterPrompt}
                {characterStats}
            </div>
        );
    }
}

export default PauseLevelUpContent;