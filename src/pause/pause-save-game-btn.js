import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-save"
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
        return (
            <div onClick={::this.handleClick} className={`pause-menu-button ${activeClass}`}>
                SAVE
            </div>
        );
    }
}

export default SaveGameBtn;