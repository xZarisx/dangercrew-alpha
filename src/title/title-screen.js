import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class TitleScreen extends React.Component {

    render() {

        const containerStyle = {
            width: '100%',
            color: '#fff',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center'
        };

        const imageStyle = {
            width: '60vw',
            animation: 'fade-in 1s',
            display: 'block',
            margin: '0 auto 0 auto'
        };

        const enterText = {
            fontFamily: '"Source Code Pro", monospace',
            textAlign: 'center',
            fontSize: '3vw',
            position: 'relative',
            top: '-1vw',
            animation: 'blink 1s steps(2, start) infinite'
        };

        return (
           <div style={containerStyle}>
               <div>
                    <img style={imageStyle} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/logo.svg" />
                    <div style={enterText}>Press ENTER</div>
               </div>
           </div>
        );
    }
}

TitleScreen.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

TitleScreen.defaultProps = {
}



export default TitleScreen;