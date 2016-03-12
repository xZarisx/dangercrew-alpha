import React from 'react'
import { connect } from 'react-redux'
import PauseSidebar from './pause-sidebar'
import PauseContent from './pause-content'
import initPauseMenuKeyboardControl from './init-pause-menu-keyboard-control'

@connect((state, props) => {
    return {
    }
})

class PauseMenu extends React.Component {

    componentDidMount() {
        initPauseMenuKeyboardControl('pauseMenuNamespace');



    }

    componentWillUnmount() {
        $(document).off('.pauseMenuNamespace');
    }

    render() {
        const style = {
            position: 'absolute',
            left: 0,
            top:0,
            right:0,
            bottom:0,
            fontFamily: `"Source Code Pro", monospace`
        };

        return (
           <div style={style}>
               <PauseSidebar />
               <PauseContent />
           </div>
        );
    }
}

export default PauseMenu;