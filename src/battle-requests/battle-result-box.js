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
            avatarToLeft: false,
            showResultText: false,
            showXpBar: true,
        }
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
           this.setState({
               avatarToLeft: true
           }, () => {
               this.showText();
           })
        }, 1000);
    }

    showText() {
        this.timeout = setTimeout(() => {
            this.setState({
                showResultText : true
            }, () => {
                //this.showText();
            })
        }, 1000);
    }


    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    renderXpBar() {
        const xpBar = {
            position: 'absolute',
            left:'1vw',
            right:'1vw',
            bottom:'1vw',
            height: '2vw',
            background: '#585757'
        };
        const fillBar = {
            position: 'absolute',
            left: 0, bottom: 0, top: 0,
            width: '44%',
            background: '#50E3C2'
        };
        const text = {
            color: '#fff',
            fontSize: '1.9vw',
            position:'absolute',
            top: '-2.6vw'
        };
        const oldLevel = {
            ...text,
            left:0
        };
        const newLevel = {
            ...text,
            right:0
        };
        return (
            <div style={xpBar}>
                <div style={fillBar} />
                <div style={oldLevel}>1</div>
                <div style={newLevel}>2</div>
            </div>
        )
    }


    renderResult() {
        const avatar = {
            background: `url(${this.props.battleRequests.requesterSkin}), linear-gradient(-330deg, #58a, #ff0090)`,
            width: '6vw',
            height: '6vw',
            marginRight: '1vw',
            backgroundPosition: `300% 100%`,
            position:'absolute',
            transition: 'left 0.8s',
            left: this.state.avatarToLeft ? '17%' : '50%',
            top: '55%',
            backgroundSize:'400%',
            borderRadius: '50%',
            transform: "translate3d(-50%,-50%,0)"
        };

        const victory = {
            fontSize: '4.9vw',
            color: '#fff',
            position:'absolute',
            left: '30%',
            top: '53%',
            transform: "translate3d(0,-50%,0)",
            visibility: this.state.showResultText ? 'visible' : 'hidden'
        };
        return (
            <div>
                <div style={avatar}></div>
                <div style={victory}>VICTORY</div>
            </div>
        )
    }

    render() {
        const style = {
            position:'absolute',
            right: '1vw',
            top: '1vw',
            padding: '1vw',
            fontSize: '2.6vw',
            fontFamily: 'monospace',
            width:'34vw', //temp
            height: '14vw',
            background: '#333',
            color: '#fff'
        };

        const body = (this.state.showXpBar) ? this.renderXpBar() : this.renderResult();

        return (
            <div style={style}>
                <div style={{textAlign: "center"}}>
                    Battle Results
                </div>
                {body}
            </div>
        );
    }
}


export default BattleResultBox;