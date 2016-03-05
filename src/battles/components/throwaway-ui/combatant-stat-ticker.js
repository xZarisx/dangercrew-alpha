import React from 'react';
import { connect } from 'react-redux';

class CombatantStatTicker extends React.Component {

    handleTick(amt=0) {

        var changes = {};
        changes[this.props.statName] = this.props.value + amt

        this.props.dispatch({
            type: "MERGE_COMBATANT",
            payload: {
                key: this.props.forId,
                changes: changes
            }
        })
    }


    render() {
        return (
            <div>
                <span style={{display:"inline-block", width:70}}>
                    {this.props.displayName}
                </span>

                <button onClick={::this.handleTick.bind(this, -1)}>-</button>
                <span style={{display:"inline-block", width:30, textAlign:"center"}}>
                    {this.props.value}
                </span>
                <button onClick={::this.handleTick.bind(this, 1)}>+</button>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        value: state.combatants[props.forId][props.statName]
    }
})(CombatantStatTicker)