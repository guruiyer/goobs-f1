import {Navbar} from "./Navbar";
import Main from "./Main";
import 'antd/dist/antd.css';
import './index.css';
import {Layout, Table} from "antd";
import React from "react";
import {CarTwoTone, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import logo from './assets/images/f1_logo.png';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import './Countdown.scss';
import RaceCountdown from './RaceCountdown';

const { Header, Sider, Content } = Layout;

function App() {
    return (
        
        <Layout style={{height:"220vh"}}>
            <Sider>
                <div className="App">
                    <div className="logo"><img width={110} src={logo} /></div>
                    <Navbar/>
                </div>
            </Sider>
            <Layout className="site-layout" > 
            
               
                <div><RaceCountdown/></div>
                
   
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '25px 40px'
                    }}
                >
                    
                    <Main />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
