import React from 'react';
import { connect } from 'react-redux';
import CombatantStatTicker from './combatant-stat-ticker'
import CombatantSkinSelector from './combatant-skin-selector'

class CombatantStatForm extends React.Component {
    render() {

        if (!this.props.combatant) {
            return null;
        }

        const colorAvatar = {
            display: "inline-block",
            verticalAlign: "middle",
            width:20, height:20,
            marginRight:10,
            borderRadius: 3,
            background: this.props.color
        };
        const nameLabel = {
            display: "inline-block",
            verticalAlign: "middle"
        };

        const winsCount = this.props.winners.filter(w => {return w == this.props.id }).length;

        return (
            <div>
                <div>
                    <span style={colorAvatar}></span>
                    {this.props.combatant.name}
                </div>
                <CombatantStatTicker forId={this.props.id} displayName="Attack" statName="attackStatPoints" />
                <CombatantStatTicker forId={this.props.id} displayName="Defense" statName="defenseStatPoints" />
                <CombatantStatTicker forId={this.props.id} displayName="Speed" statName="speedStatPoints" />
                <CombatantStatTicker forId={this.props.id} displayName="Efficiency" statName="efficiencyStatPoints" />
                <div>
                    Skin: <CombatantSkinSelector forId={this.props.id} />
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        combatant: state.combatants[props.id],
        winners: state.battle.winners
    }
})(CombatantStatForm)