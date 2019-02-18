import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { ReactReduxContext } from 'react-redux'

class App extends Component {
  render() {

    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          return <div id="root">
            <div data-reactroot="" className="main">
              <Header store={store} />
              <Timeline login={this.props.match.params.id} store={store} />
            </div>
          </div>
        }}
      </ReactReduxContext.Consumer>
    )
  }
}

App.prototypes = {
  store: PropTypes.object.isRequired
}

export default App;