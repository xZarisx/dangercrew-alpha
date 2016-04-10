import React from 'react';
import { connect } from 'react-redux'
import {doesHaveStoryPoint} from '../story-points/story-points'

@connect((state, props) => {

    return {
        storyPoints: state.storyPoints, /* Will receive storyPoint updates */
        vpWidth: state.map.viewportWidth
    }
})

class InteractiveEventMarker extends React.Component {

    getStyles() {
        var CELL = this.props.vpWidth / 11;
        return {
            left: this.props.x * CELL,
            top: this.props.y * CELL,

            width: CELL,
            height: CELL,

            ...this.getSkinImage()
        }
    }

    getSkinImage() {
        return {
            //backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/box.svg)`
            backgroundImage: this.props.skin ? `url(${this.props.skin})` : null
        }
    }

    pickedUpClass() {
        /* Example: You find a package, it should unrender */
        if (this.props.omitOnStoryPoint) {
            if (doesHaveStoryPoint(this.props.omitOnStoryPoint)) {
                return "picked-up";
            }
        }
        return "";
    }

    render() {

        return (
            <div className={`cell interactive js-no-dpad-on-touch ${this.pickedUpClass()}`} style={this.getStyles()}>

            </div>
        );
    }
}

export default InteractiveEventMarker;