import './App.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import axios from 'axios'
import { Layout } from 'antd';
import { WiBarometer } from './styles/css/weather-icons.min.css';
import { Spin } from 'antd';
import { Card, Col, Row } from 'antd';
import { Statistic } from 'antd';
import austria from './Austria.png';

const { Header} = Layout;

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

export const WeatherClient = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const countrycode = props.countrycode
    const country = props.country
    const locationURL = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=fe503fefffde5b83dc8a448795afa977`;  
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
    };  

    useEffect(() => {
        const fetchdata = async () => {
            await axios.get(locationURL)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch(function(e) {
                console.log("ERROR ", e);
            })
        };
        fetchdata();
    }, [setData, setIsLoading]);

    return (  
        <React.Fragment>                     
            {isLoading && 
                <div className="spinner">
                    <Spin size="large"/>
                </div> 
            }
            <div className="site-card-wrapper">
                <Row>
                <Col span={12}>
                    <Card style={{}} cover={<img width={"10%"} src={austria}/>} title="Track Details" type="inner">
                        <p><strong>Practice 1</strong></p>
                        <p><strong>Practice 2</strong></p>
                        <p><strong>Qualifying</strong></p>
                        <p><strong>Race</strong></p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{}} title="Weekend Forecast" type="inner">
                    <i width={"10%"} class="wi wi-day-fog"></i>
                        {!isLoading && <p> {data.main.temp_min}/{data.main.temp_max} {data.main.humidity} {data.wind.speed}  {data.wind.deg}</p>}
                    </Card>
                </Col>
                </Row>
            </div>
        </React.Fragment>
    );


    
}

