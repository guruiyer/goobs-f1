import './App.less';
import { Component, React } from 'react';
import axios from 'axios'
import { Spin, Card, Col, Row } from 'antd';
import {Link} from "react-router-dom";
import red_bull_ring from './assets/images/circuits/red_bull_ring.webp';
import spain from './assets/images/circuits/spain.webp';
import imola from './assets/images/circuits/imola.webp';
import monaco from './assets/images/circuits/monaco.webp';
import azerbaijan from './assets/images/circuits/azerbaijan.webp';
import france from './assets/images/circuits/france.webp';
import britain from './assets/images/circuits/britain.webp';
import hungaroring from './assets/images/circuits/hungaroring.webp';
import default_image  from './assets/images/circuits/default.png';


const URL = "http://ergast.com/api/f1/current.json";
const images = [
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
            'image': britain,
            'isDefault': false},

            {'title' : 'hungaroring',
            'image': hungaroring,
            'isDefault': false},

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
    var imageObj = images.find(image => image.title === imageTitle)
    var image = imageObj?.image
    return {backgroundImage: `url(${image})`, width: '100%',
    textAlign: 'center',
    height: 500,
    backgroundSize: 'cover', color: 'white', fontSize: '16px', fontWeight: 'bold', width: 440, height: 600 }
}

function isDefaultImage(imageTitle) {
    var imageObj = images.find(image => image.title === imageTitle)
    var image = imageObj?.isDefault
    return image
}

function LBoxContent(props) {
    var defaultImageFlag = isDefaultImage(props.race.CircuitID)
    return <Card style={lContentStyle(props.race.CircuitID)} bordered={false} loading={props.state}>
    <br/>
    <br/>
    <br/>
    {props.race.CircuitID == "ricard" && <br/>}
    {defaultImageFlag && (props.race.RaceName)}
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

        return (   
            <div>
                <div> <br/> </div>
                    <Row gutter={[8, 40]}>
                        {this.state.scheduleTable.map(race =>      
                            <Col md={24} lg={12} xl={6} xxl={4}>
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

