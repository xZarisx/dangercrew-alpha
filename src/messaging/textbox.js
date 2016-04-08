import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import TextPage from './text-page'
import store from '../init/store'
import { Howl } from 'howler'

var typeBlip = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/Blip_0.mp3'],
    volume: 0.5
});

var bellDown = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/bell_down.mp3']
});
var bellUp = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/bell_up.mp3']
});
var blipHi = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/blip_hi.mp3']
});
var blipLo = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/blip_lo.mp3']
});
var exclaimDown = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/exclaim_down.mp3']
});
var exclaimUp = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/exclaim_up.mp3']
});
var podClose = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/pod_close.mp3'],
    volume: 0.1
});
var podOpen = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/pod_open.mp3'],
    volume: 0.1
});

@connect((state, props) => {
    return {
        pagingIcon: state.message.pagingIcon,
        isOpen: state.message.messaging,
        activePage: state.message.activePage,
        characterIndex: state.message.characterIndex,
        currentMessage: state.message.currentMessage,
        endOfPage: state.message.endOfPage
    }
})

class Textbox extends React.Component {

    constructor(props) {
        super(props);

        console.log('-----------CONSTRUCTOR')

        this.characterBank = 0; //keeps track of previous pages' characters
        this.totalCharacters = this.props.currentMessage.reduce((a, b) => a.length + b.length);

        //this.handleNextPageButton = this.handleNextPageButton.bind(this);

        const actionKey = 32; //THIS SHOULD BE LOADED IN FROM A SETTING?
        this.btnSafe = true;
        this.btnLock = true;

        setTimeout(() => {
            this.btnLock = false;
        }, 500)

        $(document).on('keydown.textboxButton', (e) => {
            if (e.which == actionKey && this.btnSafe && !this.btnLock) {
                this.btnSafe = false;
                this.handleNextPageButton();
            }
        }).on('keyup', (e) => {
            if (e.which == actionKey && !this.btnLock) {
                this.btnSafe = true;
            }
        });



    }

    componentDidMount() {
        /* KICKED OFF WHEN COMPONENT MOUNTS */
        podOpen.play();
        setTimeout(() => {
            this.props.dispatch({ type: "START_MESSAGING" })
            setTimeout( ()=> {
                this.increaseIndex();
            }, 100)
        }, 100)
    }

    componentWillUnmount() {
        $(document).off('keydown.textboxButton');
    }

    componentWillReceiveProps(newProps) {
        if (newProps.activePage > this.props.activePage) {

            this.btnLock = true;
            setTimeout(() => {
                this.increaseIndex(newProps.activePage);
                this.btnLock = false;
            }, 500)
        }
    }

    increaseIndex(page_index = 0) {

        //console.log(this.characterBank)
        if (store.getState().message.characterIndex > this.totalCharacters) {
        //    /* insurance if increaseIndex gets called by spam keys */
            //console.log('FAIL SAFE')
            this.props.dispatch({
                type: "STOP_MESSAGING"
            })
           // setTimeout(() => {
                this.props.dispatch({
                    type: "REMOVE_TEXTBOX"
                });
            //}, 1)
            podClose.play();
            return false;
        }

        //Check if end of page (char bank + current page's chars)
        if (this.props.characterIndex >= this.props.currentMessage[page_index].length + this.characterBank) {

            this.characterBank += this.props.currentMessage[page_index].length;


            this.props.dispatch({
                type: "END_OF_PAGE"
            });


            //console.log('END OF PAGE')

            //update to the appropriate paging icon. Arrow = more pages to come, Square = the textbox will go away now
            this.props.dispatch({
                type: "SET_PAGING_ICON",
                payload: (typeof this.props.currentMessage[page_index + 1] == "undefined") ? "done" : "arrow"
            });
            return;
        }


        this.props.dispatch({
            type: "INCREASE_CHARACTER_INDEX"
        });

        typeBlip.play();

        //Find the character we are about to display. Display it after its `delayBefore` timeout
        const node = this.props.currentMessage[page_index][this.props.characterIndex-this.characterBank] || {delayBefore: 0};
        setTimeout(() => { this.increaseIndex(page_index) }, node.delayBefore);
    }

    handleNextPageButton() {



        if (this.props.endOfPage) {

            var activePage = store.getState().message.activePage;
            var currentMessageLength = store.getState().message.currentMessage.length;

            if (activePage < currentMessageLength-1) {
                this.props.dispatch({
                    type: "NEXT_MESSAGE_PAGE"
                })
            } else {
                this.btnLock = true;
                this.props.dispatch({
                    type: "STOP_MESSAGING"
                })
                setTimeout(() => {
                    this.props.dispatch({
                        type: "REMOVE_TEXTBOX"
                    });
                }, 500)
                podClose.play();
            }

        } else {
            /* Hitting the button before the page is done typing: */
            /* Directly jump the character index to the length of this page (plus previous pages) to warp to the end */

            this.props.dispatch({
                type: "SET_CHARACTER_INDEX",
                payload: this.characterBank + this.props.currentMessage[this.props.activePage].length
            });
        }
    }

    renderPagingIcon() {
        /* dont show if is closing */
        if (!this.props.isOpen) {
            return null
        }

        if (this.props.pagingIcon == "arrow") {
            return <div className="paging-icon paging-icon-arrow"></div>
        }
        if (this.props.pagingIcon == "done") {
            return <div className="paging-icon paging-icon-square"></div>
        }
    }

    render() {
        const msg = this.props.currentMessage;
        var starts = [];
        var counter = 0;
        for (var i=0; i<= msg.length-1; i++) {
            counter +=  (i > 0) ? msg[i-1].length : 0;
            starts.push(counter);
        }
        var pages = this.props.currentMessage.map((page, page_i) => {
            var start = starts[page_i];
            /* Start = which place marker in all characters of message */
            return (
                <TextPage start={start} content={page} key={page_i} page={page_i} />
            )
        });

        const openClass = (this.props.isOpen) ? "open" : "";
        return (
            <div>
                <div className={`textbox ${openClass}`} onClick={::this.handleNextPageButton}>
                    {pages}
                    {this.renderPagingIcon()}
                </div>
            </div>
        );
    }
}




export default Textbox;