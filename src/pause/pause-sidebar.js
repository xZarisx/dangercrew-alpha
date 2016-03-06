import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        name: state.playerData.name,
        level: state.playerData.level,
        hp: state.playerData.hp,
        maxHp: state.playerData.maxHp,
        xp: state.playerData.xp,
        coins: state.playerData.coins
    }
})

class PauseSidebar extends React.Component {

    renderTabs() {
        return (
            <div>
                <div>STATS</div>
                <div>LAPTOP</div>
                <div>ATTACKS</div>
                <div>ITEMS</div>
                {/* MAP */}
                {/* SAVE GAME */}
            </div>
        )
    }

    render() {
        return (
           <div className="pause-sidebar">
               <div className="pause-sidebar-profile media-object">
                   <div className="_ibm">
                       <div className="pause-sidebar-avatar"></div>
                   </div>
                   <div className="_ibm">
                       <div>{this.props.name}</div>
                       <div>Level {this.props.level}</div>
                   </div>
               </div>
               <div className="pause-sidebar-status">
                   <div className="pause-sidebar-status-item">
                       <div>HP</div><div>{this.props.hp}/{this.props.maxHp}</div>
                   </div>
                   <div className="pause-sidebar-status-item">
                       <div>XP</div><div>{this.props.xp}</div>
                   </div>
                   <div className="pause-sidebar-status-item">
                       <div>NEXT LVL</div><div>XX</div>
                   </div>
                   <div className="pause-sidebar-status-item">
                       <div>COINS</div><div>{this.props.coins}</div>
                   </div>
               </div>
               <div className="pause-sidebar-tabs">
                   {this.renderTabs()}
               </div>
           </div>
        );
    }
}


export default PauseSidebar;