import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { timeline } from './reducers/timeline';
import thunkMiddleWare from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';

const store = createStore(timeline, applyMiddleware(thunkMiddleWare));

class App extends Component {
  render() {
    return (
      <div id="root">
        <div data-reactroot="" className="main">
          <Header />
          <Timeline login={this.props.match.params.id} store={store} />
        </div>
      </div>
    )
  }
}

export default App;