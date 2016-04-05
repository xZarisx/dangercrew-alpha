import React from 'react'
import { connect } from 'react-redux'

import TextMessageLine from '../messaging/text-message-line'
import convertText from '../messaging/convert-text'
import PagingPrompt from '../messaging/paging-prompt'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../../helpers/single-keypress-binding';

@connect((state, props) => {
    return {
        introMessage: state.battleUi.introMessage
    }
})

class IntroText extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false /* Short delay before showing the text */
        }
    }

    componentDidMount() {
        setTimeout( ()=> {
            this.setState({
                show: true
            })
        }, 900);
    }

    introDoneCallback() {
        this.props.dispatch({
            type: "SET_ROLLOUT_EVENT_STATION",
            payload: {
                rolloutEventStation: "introConfirmation"
            }
        });
        var self = this;
        var handleEnter = function() {
            /* Get rid of the intro message */
            self.props.dispatch({
                type: "SET_BATTLE_INTRO_MESSAGE",
                payload: {
                    introMessage: null
                }
            });
            /* Set to init for first messaging run */
            self.props.dispatch({
                type: "SET_ROLLOUT_EVENT_STATION",
                payload: {
                    rolloutEventStation: "init"
                }
            });
            removeKeyboardSinglePress('introMessage');
        };

        addKeyboardSinglePress(13, handleEnter, 'introMessage');

        /* Mobile tap */
        $('.message-board').on('click.messageBoardTap', function(e) {
            console.log('click', e.target);
            handleEnter();
        });
    }
    
    render() {

        if (!this.state.show || !this.props.introMessage) {
            return null
        }

        return (
            <div>
                <TextMessageLine onDone={::this.introDoneCallback} content={convertText(this.props.introMessage)} />
                <PagingPrompt />
            </div>
        )
    }
}

export default IntroText;