import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-save",
        isDim: state.pauseMenu.currentCursoringList == "pauseLevelUpMenu"
    }
})

class SaveGameBtn extends React.Component {

    handleClick() {
        this.props.dispatch({
            type: "SET_PAUSEMENU_VALUE",
            payload: {
                changes: {
                    currentCursoringList: "pauseSidebarMenu",
                    selectedMenuItem: "pauseSidebarMenu-save",
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
                SAVE
            </div>
        );
    }
}

export default SaveGameBtn;