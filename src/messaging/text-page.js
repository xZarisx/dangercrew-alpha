import React from 'react';
import { connect } from 'react-redux'

@connect((state, props) => {
    return {

        isOpen: state.message.messaging,
        activePage: state.message.activePage,
        characterIndex: state.message.characterIndex
    }
})



class TextPage extends React.Component {

    render() {
        var spans = this.props.content.map((d,i) => {

            const style = {
                visibility: (this.props.start+(i+1) <= this.props.characterIndex && this.props.isOpen) ? "visible" : "hidden"
            };

            return <span style={style} key={i}>{d.content}</span>
        });


        const doneClass = (this.props.activePage > this.props.page) ? "done" : "";

        return (
            <div className={`textbox-page ${doneClass}`}>
                <div className="textpage-content">
                    {spans}
                </div>
            </div>
        )
    }
}

export default TextPage;