import React from 'react'
import { connect } from 'react-redux'
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'

import { Howl } from 'howler'
var sound_iterator = new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/iterator.mp3']});

@connect((state, props) => {
    return {
        playerId: state.battleUi.playerId
    }
})

class ForEach1 extends React.Component {

    constructor(props) {
        super(props);
        this.caster_id = this.props.event.caster_id || null;
    }

    componentDidMount() {
        var self = this;
        var repetitions = self.props.event.repetitions;

        function doIteration() {
            sound_iterator.play();
            repetitions -= 1;

            self.props.dispatch({
                type: "ADD_STYLE_TO_COMBATANT",
                payload: { key: self.caster_id,
                    style: { animation: "tada 0.5s infinite" }
                }
            });

            setTimeout(() => {
                //Lose the shaking part of the animation
                self.props.dispatch({
                    type: "ADD_STYLE_TO_COMBATANT",
                    payload: {
                        key: self.caster_id,
                        style: {}
                    }
                });

                if (repetitions > 0) {
                    doIteration()
                } else {
                    incrementRolloutStation2();
                }

            }, 500);
        }

        doIteration();

    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

export default ForEach1;