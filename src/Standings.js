import React, {Component , useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import { Space, Modal, Button, Statistic, Row, Col } from 'antd';
import { useParams, withRouter } from "react-router";
import max from './max.png';
import max_no from './max_no.png';
import { Tabs } from 'antd';
import { Scatter } from './Scatter';
import { DriverProfile } from './DriverProfile';
import  alpine  from './assets/images/constructors/alpine.png';
import  aston_martin  from './assets/images/constructors/aston_martin.png';
import  ferrari  from './assets/images/constructors/ferrari.png';
import  haas  from './assets/images/constructors/haas.png';
import  mclaren  from './assets/images/constructors/mclaren.png';
import  mercedes  from './assets/images/constructors/mercedes.png';
import  red_bull  from './assets/images/constructors/red_bull.png';
import  williams  from './assets/images/constructors/williams.png';

const { Header } = Layout;
const URL = "http://ergast.com/api/f1/current/driverStandings.json";
const constructorURL = "http://ergast.com/api/f1/current/constructorStandings.json";
const { TabPane } = Tabs;
const constructorLogo = {
    height: '10%',
    width: '10%'
};

const images = [
    { id: 'alfa', src: './assets/images/constructors/alfa.png', title: 'foo', description: 'bar' },
    { id: 'alphatauri', src: './assets/images/constructors/alphatauri.png', title: 'foo', description: 'bar' },
    { id: 'alpine', src: './assets/images/constructors/alpine.png', title: 'foo', description: 'bar' },
    { id: 'aston_martin', src: './assets/images/constructors/aston_martin.png', title: 'foo', description: 'bar' },
    { id: 'ferrari', src: './assets/images/constructors/ferrari.png', title: 'foo', description: 'bar' },
    { id: 'haas', src: './assets/images/constructors/haas.png', title: 'foo', description: 'bar' },
    { id: 'mclaren', src: './assets/images/constructors/mclaren.png', title: 'foo', description: 'bar' },
    { id: 'mercedes', src: './assets/images/constructors/mercedes.png', title: 'foo', description: 'bar' },
    { id: 'red_bull', src: './assets/images/constructors/red_bull.png', title: 'foo', description: 'bar' },
    { id: 'williams', src: './assets/images/constructors/williams.png', title: 'foo', description: 'bar' }
  ];

const columns = [
    {
        title: '',
        dataIndex: 'countryCode',
        key: 'countryCode',
        width: '10%',
        render: (text, row) => <div dangerouslySetInnerHTML={row.countryCode} />
    },
    {
        title: 'Driver',
        dataIndex: 'driverName',
        key: 'driverName',
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        key: 'wins',
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
    }
];

const constructorColumns = [
    {
        title: '',
        dataIndex: 'constructorImage',
        key: 'constructorImage',
        width: '10%',
        render: (text, row) => <div dangerouslySetInnerHTML={row.constructorImage}/>
    },
    {
        title: 'Constructor',
        dataIndex: 'constructorName',
        key: 'constructorName',
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        key: 'wins',
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
    }
]



export const Standings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [Races, setRaces] = useState([]);
    const [driverTable, setDriverTable] = useState([]);
    const [constructorTable, setConstructorTable] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDriver, setcurrentDriver] = useState();
    function showModal (r) {
        setcurrentDriver(r.driverCode)
        setIsModalVisible(true);
    };
    
    function callback(key) {
        console.log(key);
    }

    function getConstructorLogo(constructorId) {
        return require(`./assets/images/constructors/${constructorId}.png`)
    }

    const getImage = (image) => {
        return <img src={require(`./assets/images/constructors/${image}.png`)} />
     }
      
    useEffect(() => {
        let tableData = [
            {'nationality': 'Australian', 'countryCode': 'AU'},
            {'nationality': 'British', 'countryCode': 'GB'},
            {'nationality': 'Dutch', 'countryCode': 'NL'},
            {'nationality': 'Finnish', 'countryCode': 'FI'},
            {'nationality': 'Monegasque', 'countryCode': 'MC'},
            {'nationality': 'Mexican', 'countryCode': 'MX'},
            {'nationality': 'Spanish', 'countryCode': 'ES'},
            {'nationality': 'French', 'countryCode': 'FR'},
            {'nationality': 'Japanese', 'countryCode': 'JP'},
            {'nationality': 'German', 'countryCode': 'DE'},
            {'nationality': 'Russian', 'countryCode': 'RU'},
            {'nationality': 'Italian', 'countryCode': 'IT'},
            {'nationality': 'Canadian', 'countryCode': 'CA'}
        ]
        
        function getCountry(result) {
            let country = tableData.find(country => country.nationality === result.Driver.nationality)
            console.log(country.countryCode)
            return country.countryCode
        }
        const requestOne = axios.get(URL);
        const requestTwo = axios.get(constructorURL);
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            setIsLoading(false)
            const responseOne = responses[0]
            setRaces(responseOne.data.MRData.StandingsTable.StandingsLists)
            setDriverTable(responseOne.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((result) => {
                return ({
                    points: result.points,
                    driverName: `${result.Driver.givenName} ${result.Driver.familyName}`,
                    driverCode: result.Driver.driverId,
                    nationality: result.Driver.nationality,
                    countryCode: {__html: '<img src="https://www.countryflags.io/' + getCountry(result) + '/flat/24.png">'},
                    wins: result.wins
                })
            }))
            const responseTwo = responses[1]    
            setConstructorTable(responseTwo.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map((result) => {
                let testres = getConstructorLogo(result.Constructor.constructorId)
                let u = testres.default
                return ({
                    points: result.points,
                    constructorId: result.Constructor.constructorId,
                    constructorName: result.Constructor.name,
                    constructorImage: {__html: `<img height=\"40\" src=${u}/>`}, 
                    wins: result.wins
                })
            }))
            console.log(constructorTable)    
        })).catch(errors => {
            console.log("ERROR ", errors);
        })
            
    }, setIsLoading, setDriverTable, setRaces, setConstructorTable)

    return (
        <React.Fragment>         
        {isLoading && 
                <div className="spinner">
                    <Spin size="large"/>
                </div> 
        }
    <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab=" Driver Standings" key="1">
            <div>
                <Header style={{color: 'white', textAlign: "center"}}>{Races.season} Formula 1 World Championship Driver Standings</Header>
                    <Table columns={columns} dataSource={driverTable} 
                        onRow={(r) => ({
                            onClick: () => {
                                showModal(r)
                    }})}/>
            </div>
        </TabPane>
        <TabPane tab="Constructor Standings" key="2">
        <div>
                <Header style={{color: 'white', textAlign: "center"}}>{Races.season} Formula 1 World Championship Constructor Standings</Header>
                    <Table columns={constructorColumns} dataSource={constructorTable} 
                        onRow={(r) => ({
                            onClick: () => {
                                showModal(r)
                    }})}/>
            </div>
        </TabPane>
    </Tabs>
        { isModalVisible ? <DriverProfile driver={currentDriver} modalVisible={isModalVisible}  onClose={e => {
            e.stopPropagation();
            setIsModalVisible(false);
          }}/> : null }
    </React.Fragment>  
    );
}

export default withRouter(Standings);
