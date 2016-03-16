import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class ScoreboardHealthbar extends React.Component {

    getFillColor() {
        const green = "linear-gradient(-180deg, #50E3C2 0%, #70F9DB 37%, #3ABD9F 100%)";
        const yellow = "linear-gradient(-180deg, #E5E200 0%, #EBE669 38%, #C7BC00 100%)";
        const red = "linear-gradient(-180deg, #E50000 0%, #EB6969 38%, #C70000 100%)";

        if (this.props.percent <= 20) { return red; }
        if (this.props.percent <= 50) { return yellow; }
        return green;
    }


    render() {
        //const borderHeight = 2;
        const barHeight = '1.1vw';
        const healthBarStyle = {
            width:'100%',
            marginTop: '0.8vw',
            marginBottom: '0.8vw',
            height:barHeight,
            //borderBottom: `${borderHeight}px solid #444`,
            background: '#555',
            position:'relative'
        };
        const healthFillStyle = {
            width: `${this.props.percent}%`,
            height:barHeight, //- borderHeight,
            position:'absolute',
            top: 0,
            bottom:0,
            background:this.getFillColor(),
            left: 0
        };
        return (
           <div style={healthBarStyle}>
               <div style={healthFillStyle}></div>
           </div>
        );
    }
}

ScoreboardHealthbar.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
    percent: React.PropTypes.number.isRequired,
}

ScoreboardHealthbar.defaultProps = {
}



export default ScoreboardHealthbar;