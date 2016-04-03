import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'
import togglePlayerAttack from './toggle-player-attack'


@connect((state, props) => {
    return {
        playerAttacks: state.playerData.attacks,
        playerLevel: state.playerData.level,
        selectedMenuItem: state.pauseMenu.selectedMenuItem,
        currentCursoringList: state.pauseMenu.currentCursoringList
    }
})

class PauseAttacksContent extends React.Component {

    componentWillUpdate(newProps) {
        /* Reset the badge when newly cursoring into Attack menu */
        if (newProps.currentCursoringList == "pauseAttacksMenu" && this.props.currentCursoringList != "pauseAttacksMenu") {
            this.props.dispatch({
                type: "SET_PAUSEMENU_VALUE",
                payload: {
                    changes: {
                        newAttackBadge: false
                    }
                }
            })
        }
    }


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
                <div>Using {this.props.playerAttacks.length} of 3 attack slots</div>
            </div>
        );
    }
}

class AttackListing extends React.Component {

    handleClick() {
        /* Mobile tap */
        togglePlayerAttack(this.props.id)
    }

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
            <div onClick={::this.handleClick} className={`pause-attack-item ${activeClass}`}>
                <div className="_ibm" style={bulletStyle}></div>
                <div className="_ibm">{label}</div>
            </div>
        );
    }
}




export default PauseAttacksContent;