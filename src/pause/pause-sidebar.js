import React from 'react'
import { connect } from 'react-redux'
import {remainingXpUntilNextLevel, nextLevelXpGoal, isLevelupEligible} from '../level-up/levelup-utilities'
import SaveBtn from './pause-save-game-btn'
import LoadBtn from './pause-load-game-btn'
import LevelUpBtn from './pause-levelup-btn'

@connect((state, props) => {
    return {
        name: state.playerData.name,
        level: state.playerData.level,
        hp: state.playerData.hp,
        maxHp: state.playerData.maxHp,
        pp: state.playerData.pp,
        maxPp: state.playerData.maxPp,
        xp: state.playerData.xp,
        coins: state.playerData.coins,

        selectedMenuItem: state.pauseMenu.selectedMenuItem,
        newAttackBadge: state.pauseMenu.newAttackBadge
    }
})

class PauseSidebar extends React.Component {

    
    renderLevelUpButton() {
        const xpProgress = (remainingXpUntilNextLevel() > 0)
            ? `${this.props.xp}/${nextLevelXpGoal()}` : "--" ;

        if (isLevelupEligible()) {
            return (
                <LevelUpBtn />
            );
        }
        return (
            <div className="_spreading-list-item">
                <div>XP</div>
                <div>{xpProgress}</div>
            </div>
        );
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
                   <div className="_spreading-list-item">
                       <div>HP</div><div>{this.props.hp}/{this.props.maxHp}</div>
                   </div>
                   <div className="_spreading-list-item">
                       <div>PP</div><div>{this.props.pp}/{this.props.maxPp}</div>
                   </div>
                   {this.renderLevelUpButton()}
                   <div className="_spreading-list-item">
                       <div>COINS</div><div>{this.props.coins}</div>
                   </div>
               </div>
               <div className="pause-save-load-container pause-menu-button-group">
                   <SaveBtn />
                   <LoadBtn />
               </div>
           </div>
        );
    }
}


export default PauseSidebar;