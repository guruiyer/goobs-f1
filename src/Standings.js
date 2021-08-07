import React, {useEffect, useState} from 'react';
import './App.less';
import axios from 'axios'
import { Spin, Table, Layout, Tabs} from 'antd';
import './index.css';
import { withRouter } from "react-router";
import { DriverProfile } from './DriverProfile';
import { TrophyOutlined, ToolOutlined } from '@ant-design/icons';

const standingsURL = "http://ergast.com/api/f1/current/driverStandings.json";
const constructorURL = "http://ergast.com/api/f1/current/constructorStandings.json";
const { TabPane } = Tabs;

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
    const [currentTeam, setcurrentTeam] = useState();

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    function showModal (row) {
        setcurrentDriver(row.driverCode)
        setcurrentTeam(row.team)
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

        const requestOne = axios.get(standingsURL);
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
                    team: result.Constructors[0].constructorId,
                    nationality: result.Driver.nationality,
                    countryCode: {__html: '<img src="https://www.countryflags.io/' + getCountry(result) + '/flat/24.png">'},
                    wins: result.wins
                })
            }))
            const responseTwo = responses[1]    
            setConstructorTable(responseTwo.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map((result) => {
                let constructorLogoObj = getConstructorLogo(result.Constructor.constructorId)
                let constructorLogo = constructorLogoObj.default
                return ({
                    points: result.points,
                    constructorId: result.Constructor.constructorId,
                    constructorName: result.Constructor.name,
                    constructorImage: {__html: `<img height=\"40\" src=${constructorLogo}/>`}, 
                    wins: result.wins
                })
            }))  
        })).catch(errors => {
            console.log("ERROR ", errors);
        })
    }, setIsLoading, setDriverTable, setRaces, setConstructorTable)

    return (
        <React.Fragment>         
            {isLoading && 
                <div className="example"><Spin size="large" /> </div>
                
            }
            <Tabs defaultActiveKey="1" onChange={callback}>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <TabPane tab={<span><TrophyOutlined/>Driver Standings</span>} key="1">
                    <div>
                            <Table pagination={{position: ['bottomLeft'], size: "small"}} columns={columns} dataSource={driverTable} 
                                onRow={(row) => ({
                                    onClick: () => {
                                        showModal(row)
                            }})}/>
                    </div>
                </TabPane>
                <TabPane tab={<span><ToolOutlined/>Constructor Standings</span>} key="2">
                    <div>
                        <Table pagination={{hideOnSinglePage: true}} columns={constructorColumns} dataSource={constructorTable}/>
                    </div>
                </TabPane>
            </Tabs>
            { isModalVisible ? <DriverProfile driver={currentDriver} team={currentTeam} modalVisible={isModalVisible}  onClose={e => {e.stopPropagation(); setIsModalVisible(false);}}/> : null }
        </React.Fragment>  
    );
}

export default withRouter(Standings);
