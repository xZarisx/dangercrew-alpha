import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-load",
        isDim: state.pauseMenu.currentCursoringList == "pauseLevelUpMenu"
    }
})

class SaveLoadBtn extends React.Component {

    handleClick() {
        this.props.dispatch({
            type: "SET_PAUSEMENU_VALUE",
            payload: {
                changes: {
                    currentCursoringList: "pauseSidebarMenu",
                    selectedMenuItem: "pauseSidebarMenu-load",
                }
            }
        });
        /* probably the actual action here */
    }


    render() {

        const activeClass = this.props.isActive ? "active-pause-menu-button" : "";
        const dimClass = this.props.isDim ? "dim-pause-menu-button" : "";

        return (
            <div onClick={::this.handleClick} className={`pause-menu-button ${activeClass} ${dimClass}`}>
                LOAD
            </div>
        );
    }
}

export default SaveLoadBtn;