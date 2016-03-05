import React from 'react'
import store from '../../../init/store'
import { connect } from 'react-redux'
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'

//Messaging
import TextMessageLine from '../messaging/text-message-line'
import convertText from '../messaging/convert-text'
import PagingPrompt from '../messaging/paging-prompt'

@connect((state, props) => {
    return {
        textMessage: state.battleUi.textMessage
    }
})

class RolloutMessenger extends React.Component {

    componentDidMount() {
        const event = store.getState().rollout[ store.getState().battleUi.rolloutIndex ];
        incrementRolloutStation2( event );
    }

    render() {
        const displayMsg = this.props.textMessage;
        var msg = Array.isArray(displayMsg) ? displayMsg : [displayMsg]; /* TODO: this is a patch until you update all unit tests and action messages to []*/
        const content = displayMsg ? <TextMessageLine content={convertText(msg)} /> : null;

        return (
           <div>
               {content}
               <PagingPrompt />
           </div>
        );
    }
}

RolloutMessenger.propTypes = {
    rollout: React.PropTypes.array.isRequired
};

export default RolloutMessenger;