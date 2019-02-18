import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/login.css';
import './css/reset.css';
import './css/timeline.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login, { PrivateRoute } from './componentes/Login';
import Logout from './componentes/Logout';

ReactDOM.render(
    (<Router  >
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/timeline/:id?" component={App} />
                <Route logout path="/logout" component={Logout} />
            </Switch>
    </Router>)
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
