import './App.less';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Layout } from 'antd';
import { WiBarometer } from './styles/css/weather-icons.min.css';
import { Spin } from 'antd';
import { Card, Col, Row } from 'antd';
import { Statistic } from 'antd';
import austria from './assets/images/circuitdetails/hungaroring.png';

const { Header} = Layout;
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

export const WeatherClient = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const country = props.country
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const locationURL = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}`;  

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
                <Col span={8}>
                    <Card style={{}} title="Track Details" type="inner">
                        <img className="racephoto" src={austria}/><br/><br/>
                        <strong>Practice 1</strong><br/><br/>
                        <strong>Practice 2</strong><br/><br/>
                        <strong>Qualifying</strong><br/><br/>
                        <strong>Race</strong>
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

