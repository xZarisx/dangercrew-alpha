import React from 'react'
import { connect } from 'react-redux'
import pauseTheGame from './pause-the-game'


@connect((state, props) => {
    return {
        gameArea: state.game.gameArea
    }
})

class MobilePauseBtn extends React.Component {

    handleClick() {

        if (this.props.gameArea == "pause") {
            this.props.dispatch({
                type: "SET_GAME_AREA",
                payload: {
                    gameArea: "map"
                }
            });
            return;
        }

        pauseTheGame();
    }

    render() {

        const style = {
            fontFamily: "'Source Code Pro', monospace",
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: 6,
            padding: '8px 0',
            width: 84,
            textAlign: 'center',
            position: 'absolute',
            left: '5px',
            bottom: '5px'
        };

        const text = this.props.gameArea == "pause" ? "CLOSE" : "MENU";

        return (
           <div style={style} className="js-no-dpad-on-touch" onClick={::this.handleClick}>
               {text}
           </div>
        );
    }
}

export default MobilePauseBtn;