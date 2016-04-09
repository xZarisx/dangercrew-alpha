import React from 'react';
import { connect } from 'react-redux'

//DEV TESTING ONLY
import {addBattleResult} from '../redux-action-creators/story-points-actions'

@connect((state, props) => {
    return {
        reduxState: {...state}
    }
})

class ReduxStateDisplayer extends React.Component {

    componentWillMount() {
        var self = this;
        window.showState = function() {
            console.log(self.props.reduxState);
            return;
        };

        //addBattleResult("drewber", "win");
    }

    render() {
        //return null;
         return (
            <pre style={style}>
                STATE<br />
                { JSON.stringify(this.props.reduxState.storyPoints, null, 2) }
            </pre>
         );
    }
}

const style = {
    position: "absolute",
    left: 0,
    maxWidth: 300,
    maxHeight: 300,
    overflow: "scroll",
    bottom: 0,
    background: "#111",
    padding: 5,
    color: "lime"
};



export default ReduxStateDisplayer;