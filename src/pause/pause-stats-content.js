import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'


@connect((state, props) => {
    return {
        selectedMenuItem: state.pauseMenu.selectedMenuItem
    }
})

class PauseStatsContent extends React.Component {

    render() {

        const characterStats = PauseMenuData["pauseStatsMenu"].map(stat => {

            const value = 2; /* Look this up from state */
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