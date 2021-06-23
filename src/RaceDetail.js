import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Component } from 'react';
import axios from 'axios'
import { Layout } from 'antd';
import { Spin } from 'antd';
import { Space, Card, Col, Row } from 'antd';
import { WeatherClient } from './WeatherClient';
import { Statistic } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  
const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
const { Header } = Layout;

  
export const RaceDetail = (props) => {
    const b = props.match.url.length + 1
    const a = props.location.pathname.substring(b).toUpperCase();
    return (     
        <React.Fragment>  
            <Header style={{color: 'white', textAlign: "center"}}>{a}</Header>   
            <div>
                <WeatherClient countrycode={a}/>
            </div>       
        </React.Fragment>
    );


    
}

