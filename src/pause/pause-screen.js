import React from 'react';
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isGamePaused: state.game.isPaused
    }
})

class PauseScreen extends React.Component {

    render() {

        return (
           <div className="pause-screen">
               Game is Paused
           </div>
        );
    }
}




export default PauseScreen;