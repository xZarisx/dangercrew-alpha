import React from 'react'
import { connect } from 'react-redux'
import { Howl } from 'howler'
import {makeSubmission} from '../../submissions/submitter'
import getSubmissionMenuData from '../../services/get-submission-menu-data'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../../helpers/single-keypress-binding';


var sound_menuMove = new Howl({ urls: ['/dist/assets/sfx/menu-move.mp3']});
var sound_submit = new Howl({ urls: ['/dist/assets/sfx/submit.mp3']});

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
            self.handleMenuSubmit();
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

        /* Left * Right work too, because why not? */
        addKeyboardSinglePress(37, handleUp, 'submission-menu'); //Left
        addKeyboardSinglePress(65, handleUp, 'submission-menu'); //A
        addKeyboardSinglePress(39, handleDown, 'submission-menu'); //Right
        addKeyboardSinglePress(68, handleDown, 'submission-menu'); //D

        addKeyboardSinglePress(27, handleEsc, 'submission-menu');
    }

    componentWillUnmount() {
        removeKeyboardSinglePress('submission-menu')
    }

    handleMenuSubmit() {
        /* What happens when you press Enter or tap an option */

        var self = this;
        const nextView = self.terminalViewData[self.props.terminalMenuKey].items[self.props.terminalMenuSelectedIndex].nextView || null;

        if (!nextView) {
            /* It probably/must have an action! */
            /* Submit the action! */
            const action = self.terminalViewData[self.props.terminalMenuKey].items[self.props.terminalMenuSelectedIndex];

            if (action.ppCost > self.props.combatant.pp) {
                console.log('NOPE - NOT ENOUGH PP');
                /* play sound? */
                return;
            }


            const actionId = action.actionId;
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
    }


    handleMobileTap(arrayIndex) {

        console.log('MOBILE TAB');

        this.props.dispatch({
            type: "SET_TERMINAL_MENU_INDEX",
            payload: {
                terminalMenuSelectedIndex: arrayIndex
            }
        });

        setTimeout(()=> {
            this.handleMenuSubmit();
        }, 60)
    }

    renderAttackMenu() {

        const attacks = this.terminalViewData.menuAttacks.items.map((item, i) => {
            const activeClass = (i == this.props.terminalMenuSelectedIndex) ? "terminal-item-active" : "";
            const deficientClass = (item.hasEnoughPp) ? "" : "terminal-item-deficient";
            return (
               <div key={i} className={`battle-menu-option ${activeClass} ${deficientClass}`} onClick={this.handleMobileTap.bind(this,i)}>
                   {item.label}  - {item.ppCost}
               </div>
            )
        });

        return (
            <div className="battle-menu-list-window medium-window">
                <header className="terminal-window-header">
                    <div className="header-bubble header-bubble-blue"></div>
                    <div>Attacks</div>
                </header>
                <div className="battle-menu-list-options">
                    {attacks}
                </div>
            </div>
        )
    }
    renderItemsMenu() {

        const items = this.terminalViewData.menuItems.items.map((item, i) => {
            const activeClass = (i == this.props.terminalMenuSelectedIndex) ? "terminal-item-active" : null;
            return (
                <div key={i} className={`battle-menu-option ${activeClass}`} onClick={this.handleMobileTap.bind(this,i)}>
                    {item.label}
                </div>
            )
        });

        return (
            <div className="battle-menu-list-window medium-window">
                <header className="terminal-window-header">
                    <div className="header-bubble header-bubble-green"></div>
                    <div>Items</div>
                </header>
                <div className="battle-menu-list-options">
                    {items}
                </div>
            </div>
        )
    }

    renderPopupMenu() {
        if (this.props.terminalMenuKey == "menuAttacks") {
            return this.renderAttackMenu();
        }
        if (this.props.terminalMenuKey == "menuItems") {
            return this.renderItemsMenu();
        }
        return null;
    }

    render() {
        const content = this.renderPopupMenu();
        const rootItems = this.terminalViewData.menuRoot.items.map((item, i) => {
            const activeClass = (i == this.props.terminalMenuSelectedIndex) ? "terminal-item-active" : null;
            return (
                <div key={i} className={`battle-menu-root-option ${activeClass}`}
                     onClick={this.handleMobileTap.bind(this,i)}>
                    {item.label}
                </div>
            )
        });

        return (
            <div className="battle-menu-container">
                <div>Commands</div>
                <div className="battle-menu-root-items">
                    {rootItems}
                </div>
                {content}
            </div>
        );
    }

}



export default SubmissionMenu;