import React from 'react'
import { connect } from 'react-redux'
import { Howl } from 'howler'
import {makeSubmission} from '../../submissions/submitter'
import getSubmissionMenuData from '../../services/get-submission-menu-data'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../../helpers/single-keypress-binding';


var sound_menuMove = new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/menu-move.mp3']});
var sound_submit = new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/submit.mp3']});

@connect((state, props) => {
    return {
        terminalMenuKey: state.battleUi.terminalMenuKey,
        terminalMenuSelectedIndex: state.battleUi.terminalMenuSelectedIndex,
        playerId: state.battleUi.playerId,
        playerTargeting: state.battleUi.playerTargeting,
        combatant: state.combatants[state.battleUi.playerId]
    }
})

class SubmissionMenu extends React.Component {

    constructor(props) {
        super();
        this.terminalViewData = getSubmissionMenuData(props.playerId);
    }

    componentDidMount() {
        var self = this;
        var handleUp = function() {
            if (self.props.terminalMenuSelectedIndex > 0) {
                sound_menuMove.play();
                self.props.dispatch({
                    type: "SET_TERMINAL_MENU_INDEX",
                    payload: {
                        terminalMenuSelectedIndex: self.props.terminalMenuSelectedIndex - 1
                    }
                })
            }
        };
        var handleDown = function() {
            const itemIndexMax = self.terminalViewData[self.props.terminalMenuKey].items.length-1;
            if (self.props.terminalMenuSelectedIndex < itemIndexMax) {
                sound_menuMove.play();
                self.props.dispatch({
                    type: "SET_TERMINAL_MENU_INDEX",
                    payload: {
                        terminalMenuSelectedIndex: self.props.terminalMenuSelectedIndex + 1
                    }
                });
            }
        };

        var handleEnter = function() {
            const nextView = self.terminalViewData[self.props.terminalMenuKey].items[self.props.terminalMenuSelectedIndex].nextView || null;

            if (!nextView) {
                /* It probably/must have an action! */
                /* Submit the action! */
                const actionId = self.terminalViewData[self.props.terminalMenuKey].items[self.props.terminalMenuSelectedIndex].actionId;
                if (actionId) {
                    sound_submit.play();
                    makeSubmission(actionId, self.props.playerId, self.props.playerTargeting);
                } else {
                    console.warn('no actionId for enter key')
                }
                return;
            }

            self.props.dispatch({
                type: "SET_TERMINAL_MENU_KEY",
                payload: {
                    terminalMenuKey: nextView
                }
            });
            self.props.dispatch({
                type: "SET_TERMINAL_MENU_INDEX",
                payload: {
                    terminalMenuSelectedIndex: 0
                }
            });
        };

        var handleEsc = function() {
            /* Go back to root when hitting ESC */
          if (self.props.terminalMenuKey != "menuRoot") {

              const previousMenu = self.props.terminalMenuKey;

              self.props.dispatch({
                  type: "SET_TERMINAL_MENU_KEY",
                  payload: {
                      terminalMenuKey: "menuRoot"
                  }
              });
              self.props.dispatch({
                  type: "SET_TERMINAL_MENU_INDEX",
                  payload: {
                      terminalMenuSelectedIndex: (previousMenu == "menuItems") ? 1 : 0
                  }
              });
          }
        };

        addKeyboardSinglePress(13, handleEnter, 'submission-menu');
        addKeyboardSinglePress(38, handleUp, 'submission-menu');
        addKeyboardSinglePress(87, handleUp, 'submission-menu'); //W
        addKeyboardSinglePress(40, handleDown, 'submission-menu');
        addKeyboardSinglePress(83, handleDown, 'submission-menu'); //S
        addKeyboardSinglePress(27, handleEsc, 'submission-menu');
    }

    componentWillUnmount() {
        removeKeyboardSinglePress('submission-menu')
    }

    render() {
        const menuData = this.terminalViewData;

        const view = menuData[this.props.terminalMenuKey];
        const items = view.items.map((item, i) => {
            const activeClass = (i == this.props.terminalMenuSelectedIndex) ? "terminal-item-active" : null;
            const quantityIndicator = (item.quantity > 1) ? `(x${item.quantity})` : null;
            const ppCostIndicator = (typeof item.ppCost == "number") ? `${item.ppCost}` : null;
            return (
                <tr className={`terminal-item ${activeClass}`} key={i}>
                    <td className="command-title">{item.label}</td>
                    <td className="command-price-quantity">
                        {quantityIndicator}
                        {/*ppCostIndicator*/}
                    </td>
                    <td className="command-description">{item.description}</td>
                </tr>
            )
        });
        return (
            <div>
                <div>{view.title}</div>
                <table className="terminal-items-list">
                    <tbody>
                    {items}
                    </tbody>
                </table>
            </div>
        );
    }
}



SubmissionMenu.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

SubmissionMenu.defaultProps = {
}



export default SubmissionMenu;