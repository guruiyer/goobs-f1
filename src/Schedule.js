import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Component } from 'react';
import axios from 'axios'
import { Layout } from 'antd';
import { Spin } from 'antd';
import { Card, Col, Row } from 'antd';
import {Link} from "react-router-dom";
import Main from "./Main";
import {LoadingOutlined, TrophyOutlined, VideoCameraOutlined, LineChartOutlined, AuditOutlined} from "@ant-design/icons";

const { Header} = Layout;

const URL = "http://ergast.com/api/f1/current.json";

const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };
  

export default class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            scheduleTable: [],
        }
    }

    componentDidMount() {
        var _this = this;

        axios.get(URL)
            .then(function(res){
                _this.setState({
                    isLoading: false,
                    scheduleTable: res.data.MRData.RaceTable.Races.map((Race) => {
                        return ({
                            RaceName: Race.raceName,
                            RaceTime: new Date(Race.date).toDateString(),
                            CircuitID: Race.Circuit.circuitId
                        })
                    })

                });
            })
            .catch(function(e) {
                console.log("ERROR ", e);
            })
    }

    render() {
        if (this.state.isLoading) 
        {
            return  <div className="spinner">
            <Spin size="large"/>
        </div> 
        }
        
        const columns = [
            {
                title: 'Race',
                dataIndex: 'RaceName',
                key: 'RaceName',
            },
            {
                title: 'Time',
                dataIndex: 'RaceTime',
                key: 'RaceTime',
            }
        ];
        return (    
            <div style={{ }}>
                <Header style={{ color: 'white',textAlign: "center"}}>2021 Race Schedule</Header>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}}>
                    {this.state.scheduleTable.map(race =>    
                        <Col className="gutter-row" span={6}>
                            <Link to={`/RaceDetails/${race.CircuitID}`}>
                                <Card.Grid style={gridStyle} title={race.CircuitID} bordered={false}>
                                    <p>{race.RaceName}</p>
                                    {race.RaceTime}
                                </Card.Grid>
                            </Link>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }

    
}

