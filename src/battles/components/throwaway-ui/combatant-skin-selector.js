import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        skin: state.combatants[props.forId].skin
    }
})

class CombatantSkinSelector extends React.Component {

    handleChange() {
        this.props.dispatch({
            type: "MERGE_COMBATANT",
            payload: {
                key: this.props.forId,
                changes: {
                    skin: this.refs.select.value
                }
            }
        })
    }


    render() {
        return (
           <select value={this.props.skin} ref="select" onChange={::this.handleChange}>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg">
                   Jacob</option>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg">
                   Drew</option>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg">
                   Drew (Blonde)</option>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg">
                   Drew (Pink)</option>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg">
                   Drew (Orange)</option>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg">
                   Jessie</option>
               <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg">
                   Jessie (Blue)</option>
           </select>
        );
    }
}

CombatantSkinSelector.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

CombatantSkinSelector.defaultProps = {
}



export default CombatantSkinSelector;