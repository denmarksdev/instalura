import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './store/TimelineStore';

const timelineStore = new TimelineStore([]);

class App extends Component {
  render() {
    return (
      <div id="root">
        <div data-reactroot="" className="main">
            <Header />
            <Timeline login={this.props.match.params.id} store={timelineStore}  />
        </div>
      </div>
    )
  }
}

export default App;