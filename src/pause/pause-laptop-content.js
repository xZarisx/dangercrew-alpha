import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class PauseLaptopContent extends React.Component {
    /* TODO */
    render() {
        return (
           <div>
               <div className="pause-laptop-container">
                   <div className="pause-laptop-block"></div>
                   <div className="pause-laptop-block"></div>
                   <div className="pause-laptop-block"></div>
                   <div className="pause-laptop-block"></div>
               </div>
               <div className="pause-laptop-helper-text">
                   You haven't acquired any laptop parts yet!
               </div>
           </div>
        );
    }
}

export default PauseLaptopContent;