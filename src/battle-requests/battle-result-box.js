import React from 'react'
import { connect } from 'react-redux'
import {Howl} from 'howler'

@connect((state, props) => {
    return {
        battleRequests: state.battleRequests
    }
})

class BattleResultBox extends React.Component {

    constructor() {
        super();
        this.timeout = null;
        this.state = {
            //time: 10
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const style = {
            position:'absolute',
            right: '1vw',
            top: '1vw',
            padding: '1vw',
            fontSize: '3vw',
            fontFamily: 'monospace',
            width:'34vw', //temp
            background: '#333',
            color: '#fff'
        };

        const avatar = {
            background: `url(${this.props.battleRequests.requesterSkin}), linear-gradient(-330deg, #58a, #ff0090)`,
            width: '6vw',
            height: '6vw',
            float: 'left',
            marginRight: '1vw',
            backgroundPosition: `300% 100%`,
            backgroundSize:'400%',
            borderRadius: '50%'
        };


        return (
            <div style={style}>
                <div style={{textAlign: "center"}}>
                    Battle Results
                </div>
                <div>
                    asdasd
                </div>
            </div>
        );
    }
}


export default BattleResultBox;