import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        gameArea: state.game.gameArea
    }
})

class GameAreaSwitcher extends React.Component {

    handleSwitch() {
        this.props.dispatch({
            type: "SET_GAME_AREA",
            payload: {
                gameArea: this.refs.select.value
            }
        })
    }

    render() {
        return (
            <div>
                Game Area:
                <select ref="select" value={this.props.gameArea} onChange={::this.handleSwitch}>
                    <option value="map">Overworld</option>
                    <option value="battle">Battle</option>
                </select>
            </div>
        );
    }
}

export default GameAreaSwitcher;