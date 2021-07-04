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
import red_bull_ring from './red_bull_ring.jpeg';
import spain from './spain.jpeg';
import bahrain from './bahrain.jpeg';
import imola from './imola.jpeg';
import portugal from './portugal.jpeg';
import monaco from './monaco.jpeg';
import azerbaijan from './azerbaijan.jpeg';
import france from './france.jpeg';
import britain from './britain.jpeg';
import hungaroring from './hungaroring.jpeg';
import spa from './spa.jpeg';
import zandvoort from './zandvoort.jpeg';
import monza from './monza.jpeg';
import sochi from './sochi.jpeg';
import marina_bay from './marina_bay.jpeg';
import japan from './japan.jpeg';
import americas from './americas.jpeg';
import rodriguez from './rodriguez.jpeg';
import interlagos from './interlagos.jpeg';
import albert_park from './australia.jpeg';
import jeddah from './saudi_arabia.jpeg';
import yas_marina from './yas_marina.jpeg';

const { Header} = Layout;

const URL = "http://ergast.com/api/f1/current.json";

const images = 
        [
            {'title' : 'red_bull_ring',
            'image' : red_bull_ring},

            {'title' : 'catalunya',
            'image' : spain},
            
            {'title' : 'bahrain',
            'image': bahrain},

            {'title' : 'imola',
            'image': imola},

            {'title' : 'portimao',
            'image': portugal},

            {'title' : 'monaco',
            'image': monaco},

            {'title' : 'BAK',
            'image': azerbaijan},

            {'title' : 'ricard',
            'image': france},

            {'title' : 'silverstone',
            'image': britain},

            {'title' : 'hungaroring',
            'image': hungaroring},

            {'title' : 'spa',
            'image': spa},

            {'title' : 'zandvoort',
            'image': zandvoort},

            {'title' : 'monza',
            'image': monza},
            
            {'title' : 'sochi',
            'image': sochi},

            {'title' : 'marina_bay',
            'image': marina_bay},

            {'title' : 'suzuka',
            'image': japan},

            {'title' : 'americas',
            'image': americas},

            {'title' : 'rodriguez',
            'image': rodriguez},

            {'title' : 'interlagos',
            'image': interlagos},

            {'title' : 'albert_park',
            'image': albert_park},

            {'title' : 'jeddah',
            'image': jeddah},

            {'title' : 'yas_marina',
            'image': yas_marina}
        ]     

function lContentStyle(imageTitle) {
    var image = images.find(image => image.title === imageTitle)
    var x = image?.image
    return {backgroundImage: `url(${x})`, width: '100%',
    textAlign: 'center',
    backgroundSize: 'cover', color: 'white', fontSize: '18px', fontWeight: 'bold'}
}

function LBoxContent(props) {
    return <Card style={lContentStyle(props.race.CircuitID)} title={props.race.RaceTime} bordered={false} loading={props.state}>
        <br/>
        <br/>
    </Card>
}

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
                            CircuitID: Race.Circuit.circuitId,
                            Country: Race.Circuit.Location.country
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
                <div> <br/> </div>
                    <Row gutter={[8, 40]}>
                        {this.state.scheduleTable.map(race =>      
                            <Col className="gutter-row" span={6}>
                                <Link to={{
                                    pathname: `/RaceDetails/${race.RaceName}`, 
                                    country: `${race.Country}`
                                }}>
                                <LBoxContent race={race} state={this.state.isLoading}/>  
                                </Link>
                            </Col>
                        )}
                    </Row>
                <div> <br/> </div>    
            </div>
        );
    }

    
}

