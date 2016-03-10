import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

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

class PauseStatsContent extends React.Component {

    render() {

        const characterStats = PauseMenuData["pauseStatsMenu"].map(stat => {

            /* Value of Individual Stat */
            const value = stat.statId ? this.props[stat.statId] : null;
            const activeClass = (stat.id == this.props.selectedMenuItem) ? "is-active" : "";

            return (
                <div key={stat.id} className={`${activeClass} _spreading-list-item pause-stat-item`}>
                    <div>{stat.label}</div>
                    <div className="pause-stat-value">{value}</div>
                </div>
            )
        });

        return (
           <div>
               {characterStats}
           </div>
        );
    }
}

export default PauseStatsContent;