import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class TopLevelOption extends React.Component {

    handleClick() {
        this.props.dispatch({
            type: "SET_PAUSEMENU_VALUE",
            payload: {
                changes: {
                    currentCursoringList: "pauseRoot",
                    showMenuTab: this.props.id,
                    selectedMenuItem: this.props.id,
                }
            }
        });
    }

    renderNewAttackBadge(id) {
        if (this.props.id == "pauseRoot-attacks" && this.props.newAttackBadge) {
            return <div className="pause-new-attacks-badge">NEW!</div>
        }
        return null;
    }

    render() {
        const activeClass = (this.props.isActive) ? "is-active" : "";

        return (
            <div onClick={::this.handleClick} className={`top-level-item ${activeClass}`}>
                {this.props.label}
                {this.renderNewAttackBadge()}
            </div>
        );
    }
}

export default TopLevelOption;