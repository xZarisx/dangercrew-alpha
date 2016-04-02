import React from 'react';
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        reduxState: {...state}
    }
})

class ReduxStateDisplayer extends React.Component {

    constructor() {
        super();

        var self = this;
        window.showState = function() {
            console.log(self.props.reduxState);
            return
        }


    }

    render() {
        //return null;
        return (
           <pre style={style}>
               { JSON.stringify(this.props.reduxState.pauseMenu, null, 2) }
           </pre>
        );
    }
}

const style = {}



export default ReduxStateDisplayer;