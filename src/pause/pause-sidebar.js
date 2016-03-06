import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class PauseSidebar extends React.Component {
    render() {
        return (
           <div className="pause-sidebar">
               <div className="pause-sidebar-profile media-object">
                   <div className="_ibm">
                       <div className="pause-sidebar-avatar"></div>
                   </div>
                   <div className="_ibm">
                       <div>Jacob</div>
                       <div>Level XX</div>
                   </div>
               </div>
               <div className="pause-sidebar-status">
                   <div className="pause-sidebar-status-item">
                       <div>HP</div><div>XX/XX</div>
                   </div>
                   <div className="pause-sidebar-status-item">
                       <div>XP</div><div>XX</div>
                   </div>
                   <div className="pause-sidebar-status-item">
                       <div>NEXT LVL</div><div>XX</div>
                   </div>
                   <div className="pause-sidebar-status-item">
                       <div>COINS</div><div>XX</div>
                   </div>
               </div>
           </div>
        );
    }
}


export default PauseSidebar;