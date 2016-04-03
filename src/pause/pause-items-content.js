import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'
import togglePlayerItem from './toggle-player-item'

@connect((state, props) => {
    return {
        playerItems: state.playerData.items,
        selectedMenuItem: state.pauseMenu.selectedMenuItem
    }
})

class PauseItemsContent extends React.Component {

    render() {
        const items = PauseMenuData["pauseItemsMenu"].map(item => {

            const checked = (this.props.playerItems.indexOf(item.itemId) != -1);
            const isCursored = (item.id == this.props.selectedMenuItem);
            return <ItemListing id={item.id} isCursored={isCursored} checked={checked} label={item.name} />
        });

        return (
            <div className="pause-attack-content-container">
                <div>{items}</div>
                <div>Using {this.props.playerItems.length} of 3 item slots</div>
            </div>
        );
    }
}

class ItemListing extends React.Component {

    handleClick() {
        /* Mobile tap */
        togglePlayerItem(this.props.id)
    }

    render() {
        const bulletStyle = {
            width:'2vw',
            height:'2vw',
            marginRight: '1vw',
            background: (this.props.checked) ? '#50E3C2' : '#393939'
        };

        const activeClass = (this.props.isCursored) ? "is-active" : "";
        return (
            <div onClick={::this.handleClick} className={`pause-attack-item ${activeClass}`}>
                <div className="_ibm" style={bulletStyle}></div>
                <div className="_ibm">{this.props.label}</div>
            </div>
        );
    }
}




export default PauseItemsContent;