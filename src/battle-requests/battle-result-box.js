import React from 'react'
import { connect } from 'react-redux'
import {Howl} from 'howler'
import LevelMap from '../level-up/level-map'

@connect((state, props) => {
    return {
        battleRequests: state.battleRequests,
        playerXp: state.playerData.xp,
        playerLevel: state.playerData.level,
        showLevelUp: false,
        xpGain: state.battleResultPrompt.xpGain,
    }
})

class BattleResultBox extends React.Component {

    constructor() {
        super();
        this.timeout = null;
        this.state = {
            showSelf: false,
            avatarToLeft: false,
            showResultText: false,
            showXpBar: false,
            showXpGain: false,
            showLevelUp: false
        }
    }

    componentDidMount() {

        this.initialXp = this.props.playerXp;

        this.timeout = setTimeout(() => {
           this.setState({
               showSelf: true
           }, () => {
               this.showAvatarToLeft();
           })
        }, 1000); /* Wait a second to show the result window */
    }


    showAvatarToLeft() {
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
                this.showXpBar();
            })
        }, 1300);
    }

    showXpBar() {
        this.timeout = setTimeout(() => {
            this.setState({
                showXpBar : true
            }, () => {
                this.showGain();
            })
        }, 1700);
    }



    showGain() {
        this.timeout = setTimeout(() => {
            this.setState({
                showXpGain : true
            }, () => {

                /* Commit XP to playerData */

                const updatedXp = this.props.playerXp + this.props.xpGain;
                this.props.dispatch({
                    type: "SET_PLAYERDATA_VALUE",
                    payload: {
                        changes: {
                            xp: updatedXp
                        }
                    }
                });

                if (updatedXp >= LevelMap[this.props.playerLevel+1]) {
                    this.showLevelUp();
                } else {
                    this.triggerUnmount(4000);
                }

            })
        }, 1000);
    }

    showLevelUp() {

        /* Prepare pause menu to be in the right spot */
        this.props.dispatch({
            type: "SET_PAUSEMENU_VALUE",
            payload: {
                changes: {
                    currentCursoringList: "pauseRoot",
                    selectedMenuItem: "pauseRoot-levelup",
                    showMenuTab: "pauseRoot-levelup"
                }
            }
        });
        this.props.dispatch({
            type: "SET_RESULT_PROMPT_VALUE",
            payload: {
                changes: {
                    safeToPause: true
                }
            }
        })

        this.timeout = setTimeout(() => {
            this.setState({
                showLevelUp : true
            }, () => {
                this.triggerUnmount(5000)
            })
        }, 1500);
    }

    triggerUnmount(ms=1) {
        setTimeout(() => {
            this.props.dispatch({
                type: "SET_RESULT_PROMPT_VALUE",
                payload: {
                    changes: {
                        showResult: false,
                        safeToPause: true
                    }
                }
            });
        }, ms);

    }


    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    renderLevelUp() {
        const text = {
            fontSize: '5.3vw',
            marginTop:'0.7vw',
            textAlign: 'center'
        };

        const supportingText = {
            textAlign: 'center',
            fontSize:'2vw',
            marginTop:'0.6vw'
        };

        return (
            <div style={text}>
                LEVEL UP
                <div style={supportingText}>Press ESC</div>
            </div>
        )
    }

    renderXpBar() {
        const xpBar = {
            position: 'absolute',
            left:'1vw',
            right:'1vw',
            bottom:'1vw',
            height: '2vw',
            background: '#585757'
            //overflowX: 'hidden'
        };

        //Difference between next level and last level.
        const total =  LevelMap[this.props.playerLevel+1] - LevelMap[this.props.playerLevel];
        const part = (this.initialXp - LevelMap[this.props.playerLevel]) + (this.state.showXpGain ? this.props.xpGain : 0 );
        var fillPercent = (part / total) * 100;
        fillPercent = (fillPercent < 100) ? fillPercent : 100;


        const fillBar = {
            position: 'absolute',
            left: 0, bottom: 0, top: 0,
            width: `${fillPercent}%`,
            transition: 'width 1s',
            background: 'linear-gradient(-180deg, #50E3C2 0%, #77F0D5 38%, #49CFB1 100%)'
        };
        const text = {
            color: '#fff',
            fontSize: '1.7vw',
            position:'absolute',
            top: '-2.4vw'
        };
        const oldLevel = {
            ...text,
            left:0
        };
        const newLevel = {
            ...text,
            right:0
        };
        const gainColor = {
            color: '#50E3C2'
        };
        const gainText = {
            fontSize: '3vw',
            position:'absolute',
            left: '47%',
            top: '33%',
            transform: "translate3d(-50%,0,0)"
        };

        return (
            <div>
                <div style={gainText}>
                    <span style={gainColor}>+{this.props.xpGain}</span> XP
                </div>
                <div style={xpBar}>
                    <div style={fillBar} />
                    <div style={oldLevel}>Level {this.props.playerLevel}</div>
                    <div style={newLevel}>Level {this.props.playerLevel+1}</div>
                </div>
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

    renderBody() {
        if (this.state.showLevelUp) {
            return this.renderLevelUp()
        }
        return (this.state.showXpBar) ? this.renderXpBar() : this.renderResult();
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
            color: '#fff',
            borderBottom: '0.8vw solid #222'
        };


        if (!this.state.showSelf) {
            return null;
        }

        return (
            <div style={style}>
                <div style={{textAlign: "center"}}>
                    Battle Results
                </div>
                {this.renderBody()}
            </div>
        );
    }
}


export default BattleResultBox;