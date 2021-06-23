import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;
const URL = "http://ergast.com/api/f1/current/driverStandings.json";

export default class Standings extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            Races: [],
            Drivers: [],
            Points: [],
            driverTable: [],
        }
    }

    componentDidMount() {
        var _this = this;
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

        axios.get(URL)
            .then(function(res){
                _this.setState({
                    isLoading: false,
                    Races: res.data.MRData.StandingsTable.StandingsLists,
                    driverTable: res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((result) => {
                        return ({
                            points: result.points,
                            driverName: `${result.Driver.givenName} ${result.Driver.familyName}`,
                            nationality: result.Driver.nationality,
                            countryCode: {__html: '<img src="https://www.countryflags.io/' + getCountry(result) + '/flat/24.png">'},
                            wins: result.wins
                        })
                    })

                });
            })
            .catch(function(e) {
                console.log("ERROR ", e);
            })
    }

    render() {
        if(this.state.isLoading){
            return <div className="spinner">
                <Spin size="large"/>
            </div>
        }
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
        return (
            <div>
                <Header style={{ color: 'white', textAlign: "center"}}>{this.state.Races[0].season} Formula 1 World Championship Standings</Header>
                <Table columns={columns} dataSource={this.state.driverTable}/>
            </div>
        );
    }


}