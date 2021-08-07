import './App.less';
import React from 'react';
import { WeatherClient } from './WeatherClient';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

export const RaceDetail = (props) => {
    const b = props.match.url.length + 1
    const a = props.location.pathname.substring(b);
    const z = props.location.country

    return (     
        <React.Fragment>  
            <WeatherClient countrycode={a} country={z}/>
        </React.Fragment>
    );
}

