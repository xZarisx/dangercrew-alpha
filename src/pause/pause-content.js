import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

import PauseStatsContent from './pause-stats-content'
import PauseLevelUpContent from './pause-levelup-content'
import PauseLaptopContent from './pause-laptop-content'
import PauseAttacksContent from './pause-attacks-content'
import PauseItemsContent from './pause-items-content'
import pauseInfoDescriptionMiddleware from './pause-info-middleware'

@connect((state, props) => {

    /* This text node might end up getting stored in a different place. Not sure */
    const pageNode = PauseMenuData.pauseRoot.filter(page => {
        return page.id == state.pauseMenu.showMenuTab
    })[0];

    const selectedNode = PauseMenuData[state.pauseMenu.currentCursoringList].filter(page => {
        return page.id == state.pauseMenu.selectedMenuItem
    })[0];

    return {
        selectedMenuItem: state.pauseMenu.selectedMenuItem,
        showMenuTab: state.pauseMenu.showMenuTab,
        infoBoxTitle: pauseInfoDescriptionMiddleware(selectedNode)[0],
        infoBoxDescription: pauseInfoDescriptionMiddleware(selectedNode)[1]
    }
})

class PauseContent extends React.Component {

    renderBody() {
        if (this.props.showMenuTab == "pauseRoot-stats") {
            return <PauseStatsContent />
        }
        if (this.props.showMenuTab == "pauseRoot-levelup") {
            return <PauseLevelUpContent />
        }
        if (this.props.showMenuTab == "pauseRoot-laptop") {
            return <PauseLaptopContent />
        }
        if (this.props.showMenuTab == "pauseRoot-attacks") {
            return <PauseAttacksContent />
        }
        if (this.props.showMenuTab == "pauseRoot-items") {
            return <PauseItemsContent />
        }
    }

    renderTopLevelOptions() {
        const list = PauseMenuData.getCensoringList('pauseRoot');
        return list.map((item) => {
            const activeClass = (item.id == this.props.selectedMenuItem) ? "is-active" : "";
            //const newBadge = this.renderNewAttackBadge(item.id);

            return (
                <div key={item.id} className={`top-level-item ${activeClass}`}>
                    {item.label}
                    {/*newBadge*/}
                </div>
            )
        });
    }


    render() {
        return (
           <div className="pause-content">
               <div className="pause-top-menu">
                   {this.renderTopLevelOptions()}
               </div>
               <div className="pause-content-body">
                   {this.renderBody()}
               </div>
               <div className="pause-content-textbox">
                   <div className="pause-content-textbox-title">{this.props.infoBoxTitle}</div>
                   <div className="pause-content-textbox-description">{this.props.infoBoxDescription}</div>
               </div>
           </div>
        );
    }
}

export default PauseContent;