import './App.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import axios from 'axios'
import { Layout } from 'antd';
import { Spin } from 'antd';
import { Card, Col, Row } from 'antd';
import { Statistic } from 'antd';
import austria from './austria.jpeg';

const { Header} = Layout;

const weatherURL = "http://api.weatherstack.com/current?access_key=f38b84e8148e7f1581aee4aaf9f2bed3";  
const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

export const WeatherClient = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const countrycode = props.countrycode
    const locationURL= weatherURL + `&query=${countrycode}`

    const gridStyle = {
        width: '100%',
        textAlign: 'center',
    };  

    useEffect(() => {
        const fetchdata = async () => {
            await axios.get(locationURL)
            .then(res => {
                setIsLoading(false)
                setData(res.data.current)
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

            <Card title="Race Details">
                <Card type="inner">
            

                        <p>{data.temperature} C</p>
                        {data.weather_descriptions}
                </Card>
            </Card>
            <div>     
            </div>
        </React.Fragment>
        
    );


    
}

