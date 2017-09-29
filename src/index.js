import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router/lib';
import App from './components/App';
import Search from './components/Search';
import CityWeather from './components/CityWeather';
import './styles/scss/index.css';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search}/>
            <Route path="location/:city" component={CityWeather}/>
        </Route>
    </Router>
);
ReactDOM.render(routes, document.getElementById('root'));
