import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

@connect((state, props) => {
    return {
    }
})

class PauseAttacksContent extends React.Component {

    render() {
        const attackItems = PauseMenuData["pauseAttacksMenu"].map(attack => {
            return (
                <div>{attack.name}, {attack.levelRequirement}</div>
            )


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
        return (
            <div>
                {this.props.label}
            </div>
        );
    }
}




export default PauseAttacksContent;