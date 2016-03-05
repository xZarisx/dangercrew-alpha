import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import initBrowser from './init/init-browser'
import store from './init/store';
import Game from './game'

//import './dpad-demo.css';
//import './game.css';
//import './person.css';

var RootComponent = React.createClass({

    componentWillMount() {
        initBrowser();
    },
    render() {
        return (
            <Provider store={ this.props.store }>
                <Game />
            </Provider>
        );
    }
});


render(<RootComponent store={store} />, document.getElementById('app-root'));