import React from 'react';
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        reduxState: {...state}
    }
})

class ReduxStateDisplayer extends React.Component {

    componentDidMount() {
        var self = this;
        window.showState = function() {
            console.log(self.props.reduxState);
            return
        }
    }

    render() {
        return (
            <pre style={style}>
                { JSON.stringify(this.props.reduxState, null, 2) }
            </pre>
        );
    }
}

const style = {}



export default ReduxStateDisplayer;