import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

@connect((state, props) => {
    return {
        name: state.playerData.name,
        level: state.playerData.level,
        hp: state.playerData.hp,
        maxHp: state.playerData.maxHp,
        xp: state.playerData.xp,
        coins: state.playerData.coins,

        selectedMenuItem: state.pauseMenu.selectedMenuItem
    }
})

class PauseSidebar extends React.Component {

    renderTabs() {
        return PauseMenuData.pauseRoot.map(item => {
            const activeClass = (item.id == this.props.selectedMenuItem) ? "is-active" : "";
            return (
                <div key={item.id} className={`${activeClass} tab-item`}>
                    {item.label}
                </div>
            )
        });
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