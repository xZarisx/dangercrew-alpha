import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

@connect((state, props) => {

    /* This text node might end up getting stored in a different place. Not sure */
    const pageNode = PauseMenuData.pauseRoot.filter(page => {
        return page.id == state.pauseMenu.showMenuTab
    })[0];
    return {
        title: pageNode.pageTitle || "unknown"
    }
})

class PauseContent extends React.Component {

    render() {
        return (
           <div className="pause-content">
               <div className="pause-content-title">{this.props.title}</div> {/* Load these text blibs from a data object? */}
               <div className="pause-content-body">
                   herro. the layout of this part will change depending on the tab
               </div>
               <div className="pause-content-textbox">
                   box
               </div>
           </div>
        );
    }
}

export default PauseContent;