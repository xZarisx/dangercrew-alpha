import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        gameArea: state.game.gameArea
    }
})

class GameAreaSwitcher extends React.Component {


    componentDidMount() {
        /* Eliminate forms on the page */
        //var self = this;
        //window.setGameArea = function(area) {
        //    self.props.dispatch({
        //        type: "SET_GAME_AREA",
        //        payload: {
        //            gameArea: area
        //        }
        //    });
        //}
    }

    handleSwitch() {
        this.props.dispatch({
            type: "SET_GAME_AREA",
            payload: {
                gameArea: this.refs.select.value
            }
        });
    }

    render() {
        return (
            <div style={style}>
                <div>Game Area:</div>
                <select tabindex="0" ref="select" value={this.props.gameArea} onChange={::this.handleSwitch}>
                    <option value="map">Overworld</option>
                    <option value="battle">Battle</option>
                </select>
            </div>
        );
    }
}

const style = {
    background:'#111',
    position: 'fixed',
    padding:10,
    top: 0,
    left: 0,
    color: '#fff',
    zIndex: 9999,
}

export default GameAreaSwitcher;