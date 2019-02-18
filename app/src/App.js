import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';
import thunkMiddleWare from 'redux-thunk';

import { createStore, applyMiddleware, combineReducers } from 'redux';

const reducers = combineReducers({ timeline, notificacao })
const store = createStore(reducers, applyMiddleware(thunkMiddleWare));
    
class App extends Component {
  render() {
    return (
      <div id="root">
        <div data-reactroot="" className="main">
          <Header store={store} />
          <Timeline login={this.props.match.params.id} store={store} />
        </div>
      </div>
    )
  }
}

export default App;