import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from './Schedule';
import Standings from './Standings';
import Scatter from './Scatter';
import App from './App';
import {RaceDetails} from './RaceDetails';
import {RaceDetail} from './RaceDetail';

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Standings}></Route>
            <Route exact path='/Schedule' component={Schedule}></Route>
            <Route exact path='/scatter' component={Scatter} />
            <Route path="/RaceDetails" component={RaceDetails}>
                <Route path="/:raceid" component={RaceDetail}/>
            </Route>
        </Switch>
    );
}

export default Main;