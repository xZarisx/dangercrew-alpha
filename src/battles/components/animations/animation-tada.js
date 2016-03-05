import React from 'react'
import { connect } from 'react-redux'
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'

@connect((state, props) => {
    return {
        playerId: state.battleUi.playerId
    }
})

class AnimationTada extends React.Component {

    constructor(props) {
        super(props);

        this.caster_id = this.props.event.caster_id || null;
        //this.state = {
        //    isDone: false
        //}
    }

    componentDidMount() {

        this.props.dispatch({
            type: "ADD_STYLE_TO_COMBATANT",
            payload: {
                key: this.caster_id,
                style: {
                    animation: "tada 1s infinite"
                }
            }
        });

        setTimeout(() => {

            //Lose the shaking part of the animation
            this.props.dispatch({
                type: "ADD_STYLE_TO_COMBATANT",
                payload: {
                    key: this.caster_id,
                    style: {}
                }
            });

            setTimeout(function() {
                incrementRolloutStation2();
            }, 200); /* Pause for a bit when animation ends */

        }, 1002);
    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationTada.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
};

AnimationTada.defaultProps = {
};

export default AnimationTada;