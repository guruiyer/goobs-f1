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
import red_bull_ring from './red_bull_ring.webp';
import spain from './spain.webp';
import bahrain from './bahrain.jpg';
import imola from './imola.webp';
import portugal from './default.png';
import monaco from './monaco.webp';
import azerbaijan from './azerbaijan.webp';
import france from './france.webp';
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
import istanbul from './istanbul.jpeg';
import default_image  from './default.png';
import { PresetColorTypes } from 'antd/lib/_util/colors';

const { Header} = Layout;

const URL = "http://ergast.com/api/f1/current.json";

const images = 
        [
            {'title' : 'red_bull_ring',
            'image' : red_bull_ring,
            'isDefault': false},

            {'title' : 'catalunya',
            'image' : spain,
            'isDefault': false},
            
            {'title' : 'bahrain',
            'image': default_image,
            'isDefault': true},

            {'title' : 'imola',
            'image': imola,
            'isDefault': false},

            {'title' : 'portimao',
            'image': default_image,
            'isDefault': true},

            {'title' : 'monaco',
            'image': monaco,
            'isDefault': false},

            {'title' : 'BAK',
            'image': azerbaijan,
            'isDefault': false},

            {'title' : 'ricard',
            'image': france,
            'isDefault': false},

            {'title' : 'silverstone',
            'image': default_image,
            'isDefault': true},

            {'title' : 'hungaroring',
            'image': default_image,
            'isDefault': true},

            {'title' : 'spa',
            'image': default_image,
            'isDefault': true},

            {'title' : 'zandvoort',
            'image': default_image,
            'isDefault': true},

            {'title' : 'monza',
            'image': default_image,
            'isDefault': true},
            
            {'title' : 'sochi',
            'image': default_image,
            'isDefault': true},

            {'title' : 'marina_bay',
            'image': default_image,
            'isDefault': true},

            {'title' : 'suzuka',
            'image': default_image,
            'isDefault': true},

            {'title' : 'americas',
            'image': default_image,
            'isDefault': true},

            {'title' : 'rodriguez',
            'image': default_image,
            'isDefault': true},

            {'title' : 'interlagos',
            'image': default_image,
            'isDefault': true},

            {'title' : 'albert_park',
            'image': default_image,
            'isDefault': true},

            {'title' : 'jeddah',
            'image': default_image,
            'isDefault': true},

            {'title' : 'yas_marina',
            'image': default_image,
            'isDefault': true},

            {'title' : 'istanbul',
            'image': default_image,
            'isDefault': true}
        ]     

function lContentStyle(imageTitle) {
    var image = images.find(image => image.title === imageTitle)
    var x = image?.image
    return {backgroundImage: `url(${x})`, width: '100%',
    textAlign: 'center',

    height: 500,
    backgroundSize: 'cover', color: 'white', fontSize: '16px', fontWeight: 'bold', width: 440, height: 600 }
}

function isDefaultImage(imageTitle) {
    var image = images.find(image => image.title === imageTitle)
    var x = image?.isDefault
    console.log("image" + x)
    return x
}

function LBoxContent(props) {
    var x = isDefaultImage(props.race.CircuitID)
    return <Card style={lContentStyle(props.race.CircuitID)}  bordered={false} loading={props.state}>
    <br/>
    <br/>
    <br/>
    {props.race.CircuitID == "ricard" && 
                <br/>
            }
    {x && (props.race.RaceName)}
    <br/>
    <p>{props.race.RaceTime}</p>
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
                            <Col className="gutter-row" span={4}>
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

