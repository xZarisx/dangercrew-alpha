import React from 'react'
import { connect } from 'react-redux'
import PauseMenuData from './pause-menu-data'

import PauseStatsContent from './pause-stats-content'
import PauseLevelUpContent from './pause-levelup-content'
import PauseLaptopContent from './pause-laptop-content'
import PauseAttacksContent from './pause-attacks-content'
import PauseItemsContent from './pause-items-content'
import pauseInfoDescriptionMiddleware from './pause-info-middleware'
import TopLevelOption from './pause-toplevel-option'


@connect((state, props) => {

    const selectedNode = PauseMenuData[state.pauseMenu.currentCursoringList].filter(page => {
        return page.id == state.pauseMenu.selectedMenuItem
    })[0];

    return {
        selectedMenuItem: state.pauseMenu.selectedMenuItem,
        showMenuTab: state.pauseMenu.showMenuTab,
        newAttackBadge : state.pauseMenu.newAttackBadge,
        infoBoxTitle: pauseInfoDescriptionMiddleware(selectedNode)[0],
        infoBoxDescription: pauseInfoDescriptionMiddleware(selectedNode)[1],
    }
})

class PauseContent extends React.Component {

    renderBody() {
        /* This one is a little different */
        /* Check if on button, or if you've entered into the level up menu */
        if (this.props.selectedMenuItem == "pauseSidebarMenu-levelup" ||
            this.props.showMenuTab == "pauseSidebarMenu-levelup") {
            return <PauseLevelUpContent />
        }

        /* These are standard */
        if (this.props.showMenuTab == "pauseRoot-stats") {
            return <PauseStatsContent />
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
        const list = PauseMenuData['pauseRoot'];
        return list.map((item) => {
            const isActive = (item.id == this.props.selectedMenuItem);
            return (
                <TopLevelOption
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    isActive={isActive}
                    newAttackBadge={this.props.newAttackBadge}
                />
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