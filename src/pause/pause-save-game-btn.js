import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-save"
    }
})

class SaveGameBtn extends React.Component {

    render() {

        const activeClass = this.props.isActive ? "active-pause-menu-button" : "";

        return (
            <div className={`pause-menu-button ${activeClass}`}>
                SAVE
            </div>
        );
    }
}

export default SaveGameBtn;