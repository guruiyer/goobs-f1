import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios'
import AppBar from './AppBar.js'
import { Table, Tag, Space } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    TrophyOutlined,
    BankOutlined,
    BorderLeftOutlined,
    CarTwoTone
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const URL = "http://ergast.com/api/f1/current/driverStandings.json";

function createMarkup() {
    return {__html: 'First &middot; Second'};
}

function MyComponent() {
    return <div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />;
}

var test = text => <a>{text}</a>;


export default class App extends Component {

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
                  countryCode: {__html: '<img src="https://www.countryflags.io/' + getCountry(result) + '/flat/24.png">'}// '<img src="https://www.countryflags.io/' + getCountry(result) + '/flat/64.png"/>'
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
          return <div>Loading...</div>
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
              title: 'Points',
              dataIndex: 'points',
              key: 'points',
          }
      ];
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo"><a href=""><CarTwoTone style={{ fontSize: '250%'}}/></a> <a style={{ color: 'white'}}>Goobs F1</a></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<TrophyOutlined />}>
                        Season Standings
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        Race Schedule
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BankOutlined />}>
                        The Vault
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Header style={{ color: 'white', textAlign: "center"}}>{this.state.Races[0].season} Formula 1 World Championship Standings</Header>
                    <Table columns={columns} dataSource={this.state.driverTable}/>
                </Content>
            </Layout>
        </Layout>
    );
}


}