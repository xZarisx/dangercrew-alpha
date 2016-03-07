import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class PauseStatsContent extends React.Component {

    render() {

        const characterStats = [
            { id: "pauseStats-health", label: "Health", value: 3 },
            { id: "pauseStats-attack", label: "Attack", value: 2 },
            { id: "pauseStats-defense", label: "Defense", value: 4 },
            { id: "pauseStats-speed", label: "Speed", value: 3 },
            { id: "pauseStats-efficiency", label: "Efficiency", value: 2 }
        ].map(stat => {
            return (
                <div key={stat.id} className="_spreading-list-item pause-stat-item">
                    <div>{stat.label}</div>
                    <div className="pause-stat-value">{stat.value}</div>
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