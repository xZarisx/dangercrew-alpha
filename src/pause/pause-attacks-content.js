import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

@connect((state, props) => {
    return {
        playerAttacks: state.playerData.attacks,
        playerLevel: state.playerData.level
    }
})

    //<div>{attack.name}, {attack.levelRequirement}</div>
class PauseAttacksContent extends React.Component {

    render() {
        const attackItems = PauseMenuData["pauseAttacksMenu"].map(attack => {

            const checked = (this.props.playerAttacks.indexOf(attack.attackId) != -1);
            const isMystery = (attack.levelRequirement > this.props.playerLevel);
            return <AttackListing id={attack.id} checked={checked} isMystery={isMystery} label={attack.name} />
        });
        console.log(attackItems)
        return (
            <div>
                {attackItems}
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
            background: (this.props.checked) ? '#fff' : '#393939'
        };
        const label = (this.props.isMystery) ? '??????' : this.props.label
        return (
            <div>
                <div className="_ibm" style={bulletStyle}></div>
                <div className="_ibm">{label}</div>
            </div>
        );
    }
}




export default PauseAttacksContent;