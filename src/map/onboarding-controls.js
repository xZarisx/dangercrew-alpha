import React from 'react'
import { connect } from 'react-redux'
import {Howl} from 'howler'

var bellDown = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/bell_down.ogg'],
    volume: 0.4
});

@connect((state, props) => {
    return {
        showOnboardingPopup: state.game.showOnboardingPopup
    }
})

class OnboardingControls extends React.Component {

    constructor() {
        super();
        this.state = {
            isShowing: false
        }
    }

    componentDidMount() {

        if (!this.props.showOnboardingPopup) {
            return;
        }

        setTimeout(()=> {
            bellDown.play();

            this.setState({
                isShowing: true
            }, ()=> {

                setTimeout(()=> {
                    this.props.dispatch({
                        type: "SET_ONBOARDING_POPUP",
                        payload: {
                            showOnboardingPopup: false
                        }
                    })
                }, 5000); /* Show for 5 seconds */

            });



        }, 3000)
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: "SET_ONBOARDING_POPUP",
            payload: {
                showOnboardingPopup: false
            }
        })
    }

    render() {

        if (!this.state.isShowing) {
            return null;
        }

        if (!this.props.showOnboardingPopup) {
            return null;
        }


        return (
           <div className="onboarding-controls-box">
               <div className="box-title">CONTROLS</div>
               <div className="control-group">
                    <div className="control-title">WALK</div>
                    <div className="control-key">Arrow keys</div>
               </div>
               <div className="control-group">
                    <div className="control-title">TALK</div>
                    <div className="control-key">Spacebar</div>
               </div>
               <div className="control-group">
                    <div className="control-title">ACTION</div>
                    <div className="control-key">Enter</div>
               </div>
               <div className="control-group">
                   <div className="control-title">PAUSE</div>
                   <div className="control-key">Esc key</div>
               </div>
           </div>
        );
    }
}


export default OnboardingControls;