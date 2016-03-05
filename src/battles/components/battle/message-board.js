import React from 'react'
import { connect } from 'react-redux'
import SubmissionMenu from './submission-menu'
import RolloutMessenger from './rollout-messenger'
import IntroText from '../messaging/intro-text'

@connect((state, props) => {
    return {
        rollout: state.rollout,
        introMessage: state.battleUi.introMessage
    }
})

class MessageBoard extends React.Component {

    getTerminalContent() {

        if (this.props.introMessage) {
            return <IntroText />
        }

        if (this.props.rollout.length) {
            return <RolloutMessenger rollout={this.props.rollout} />
        } else {
            return <SubmissionMenu />
        }
    }

    render() {

        const terminalContent = this.getTerminalContent();

        return (
           <div className="message-board">
               <div className="terminal-header">
                   <div className="terminal-header-color-circle red"></div>
                   <div className="terminal-header-color-circle green"></div>
               </div>
               <div className="terminal-body">
                   {terminalContent}
               </div>
           </div>
        );
    }
}

MessageBoard.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

MessageBoard.defaultProps = {
}



export default MessageBoard;