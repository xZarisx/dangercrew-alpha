import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

@connect((state, props) => {
    return {
        playerAttacks: state.playerData.attacks,
        playerLevel: state.playerData.level,
        selectedMenuItem: state.pauseMenu.selectedMenuItem
    }
})

class PauseAttacksContent extends React.Component {

    render() {
        const attackItems = PauseMenuData["pauseAttacksMenu"].map(attack => {

            const checked = (this.props.playerAttacks.indexOf(attack.attackId) != -1);
            const isMystery = (attack.levelRequirement > this.props.playerLevel);
            const isCursored = (attack.id == this.props.selectedMenuItem);
            return <AttackListing id={attack.id} isCursored={isCursored} checked={checked} isMystery={isMystery} label={attack.name} />
        });

        return (
            <div className="pause-attack-content-container">
                <div>{attackItems}</div>
                <div>Using 2 of 3 attack slots</div>
            </div>
        );
    }
}

class AttackListing extends React.Component {
    render() {
        const bulletStyle = {
            width:'2vw',
            height:'2vw',
            marginRight: '1vw',
            background: (this.props.checked) ? '#5FA4DE' : '#393939'
        };
        const label = (this.props.isMystery) ? '??????' : this.props.label;
        const activeClass = (this.props.isCursored) ? "is-active" : "";
        return (
            <div className={`pause-attack-item ${activeClass}`}>
                <div className="_ibm" style={bulletStyle}></div>
                <div className="_ibm">{label}</div>
            </div>
        );
    }
}




export default PauseAttacksContent;