import {Navbar} from "./Navbar";
import Main from "./Main";
import 'antd/dist/antd.css';
import './index.css';
import {Layout, Table} from "antd";
import React from "react";
import {CarTwoTone, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import logo from './f1_logo.png';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
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
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '282c34' }}>
                <Button type="primary" className="login"><LoginOutlined />Login</Button>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '36px 56px'
                    }}
                >
                    <Main />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
