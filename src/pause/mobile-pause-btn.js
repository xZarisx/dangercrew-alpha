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
        console.log('MOBILE PAUSE MENU BUTTON');
        pauseTheGame();
    }

    render() {

        const style = {
            fontFamily: "'Source Code Pro', monospace",
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: 6,
            padding: '8px 20px',
            position: 'absolute',
            right: '5px',
            top: '5px'
        };

        return (
           <div style={style} onClick={::this.handleClick}>
               MENU
           </div>
        );
    }
}

export default MobilePauseBtn;