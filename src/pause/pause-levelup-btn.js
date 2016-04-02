import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: state.pauseMenu.selectedMenuItem == "pauseSidebarMenu-levelup"
    }
})

class LevelUpBtn extends React.Component {

    render() {

        const activeClass = this.props.isActive ? "active-pause-menu-button" : "";

        return (
            <div className={`pause-menu-button level-up-button ${activeClass}`}>
                LEVEL UP!
            </div>
        );
    }
}

export default LevelUpBtn;