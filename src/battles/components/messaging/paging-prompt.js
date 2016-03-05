import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        rolloutEventStation: state.battleUi.rolloutEventStation
    }
})

class PagingPrompt extends React.Component {

    render() {

        if (/Confirmation/.test(this.props.rolloutEventStation) == false) {
            return null;
        }

        const style = {
            position: 'absolute',
            width: 10,
            height: 10,
            background: '#fff',
            right: 10,
            bottom: 10,
            animation: "blink 0.7s steps(2, start) infinite"
        };

        return (
           <div style={style} />
        );
    }
}

export default PagingPrompt;