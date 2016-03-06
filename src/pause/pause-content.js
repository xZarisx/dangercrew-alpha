import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class PauseContent extends React.Component {

    render() {
        return (
           <div className="pause-content">
               <div className="pause-content-title">TITLE</div> {/* Load these text blibs from a data object? */}
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