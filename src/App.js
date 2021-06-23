import {Navbar} from "./Navbar";
import Main from "./Main";
import 'antd/dist/antd.css';
import './index.css';
import {Layout, Table} from "antd";
import React from "react";
import {CarTwoTone, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import logo from './f1_logo.png';

const { Header, Sider, Content } = Layout;

function App() {
    return (
        <Layout style={{height:"100vh"}}>
            <Sider>
                <div className="App">
                    <div className="logo"><img width={150} src={logo} /></div>
                    <Navbar/>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Main />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
