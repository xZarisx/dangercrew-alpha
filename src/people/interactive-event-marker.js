import React from 'react';
import { connect } from 'react-redux'

@connect((state, props) => {
    //const node = state.people[props.id];
    //
    //if (!node) {
    //    return {}
    //}

    return {
        //x: node.x,
        //y: node.y,
        //dir: node.dir,
        //transitionProgress: node.transitionProgress,
        //moving: node.moving,
        //skin: node.skin,
        //useBehavior: node.useBehavior || null, /* null = player node */
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

    render() {

        return (
            <div className={`cell interactive js-no-dpad-on-touch`} style={this.getStyles()}>

            </div>
        );
    }
}

export default InteractiveEventMarker;