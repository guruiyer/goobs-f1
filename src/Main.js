import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from './Schedule';
import Standings from './Standings';
import Scatter from './Scatter';
import {RaceDetails} from './RaceDetails';
import {RaceDetail} from './RaceDetail';
import {NewsRoom} from './components/NewsRoom';

const Main = () => {
    return (
        <Switch> {}
            <Route exact path='/' component={Standings}></Route>
            <Route exact path='/Schedule' component={Schedule}></Route>
            <Route exact path='/scatter' component={Scatter} />
            <Route path="/RaceDetails" component={RaceDetails}>
                <Route path="/:raceName" component={RaceDetail}/>
            </Route>
            <Route exact path='/news' component={NewsRoom} />
        </Switch>
    );
}

export default Main;