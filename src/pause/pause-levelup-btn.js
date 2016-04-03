import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-levelup"
    }
})

class LevelUpBtn extends React.Component {

    handleClick() {
        this.props.dispatch({
            type: "SET_PAUSEMENU_VALUE",
            payload: {
                changes: {
                    currentCursoringList: "pauseSidebarMenu",
                    selectedMenuItem: "pauseSidebarMenu-levelup",
                }
            }
        });
        /* probably the actual action here */
    }

    render() {

        const activeClass = this.props.isActive ? "active-pause-menu-button" : "";

        return (
            <div onClick={::this.handleClick} className={`pause-menu-button level-up-button ${activeClass}`}>
                LEVEL UP!
            </div>
        );
    }
}

export default LevelUpBtn;