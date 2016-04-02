import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-load"
    }
})

class SaveLoadBtn extends React.Component {

    render() {

        const activeClass = this.props.isActive ? "active-pause-menu-button" : "";

        return (
            <div className={`pause-menu-button ${activeClass}`}>
                LOAD
            </div>
        );
    }
}

export default SaveLoadBtn;