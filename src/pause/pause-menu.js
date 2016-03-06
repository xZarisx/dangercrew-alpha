import React from 'react'
import { connect } from 'react-redux'
import PauseSidebar from './pause-sidebar'

@connect((state, props) => {
    return {
    }
})

class PauseMenu extends React.Component {

    render() {

        const style = {
            position: 'absolute',
            left: 0,
            top:0,
            right:0,
            bottom:0
        };

        return (
           <div style={style}>
               <PauseSidebar />
               <div>HELLO</div>
           </div>
        );
    }
}

export default PauseMenu;