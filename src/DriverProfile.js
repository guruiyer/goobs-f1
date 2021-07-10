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

const { TabPane } = Tabs;
const URL = "http://ergast.com/api/f1/current/driverStandings.json";

export const DriverProfile = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [Races, setRaces] = useState([]);
    const [driverTable, setDriverTable] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDriver, setcurrentDriver] = useState();
    
    let test = props.modalVisible
    function callback(key) {
        console.log(key);
    }
    console.log(props.driver)
    function updateTest() {
        test = false
    }
    
    useEffect(() => { 
        
    }, setIsLoading, setDriverTable, setRaces)


    return (  
        <React.Fragment>          
            <Modal title="Max Verstappen" visible={test} footer={null} width={1200} onCancel={props.onClose} onOk={props.onClose}>
                <div className="productsContainer">
                    <img className="driverphoto" src={max}/>
                    <img className="drivernumber" src={max_no}/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <div className="products">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Statistic title="Team" value={"Red Bull Racing"} />
                        </Col>
                        <Col span={8}>
                            <Statistic title="Career Points" value={2390} precision={0} />  
                        </Col>
                        <Col span={8}>
                            <Statistic title="Grand Prix's" value={128} precision={0} />
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Statistic title="Date of Birth" value={"01/10/1992"} />
                        </Col>
                        <Col span={8}>
                            <Statistic title="Country" value={"Netherlands"} precision={0} />  
                        </Col>
                        <Col span={8}>
                            <Statistic title="Podiums" value={50} precision={0} />
                        </Col>
                        
                    </Row>
                    </div>

                </div><br/>
                <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Season Form" key="1">
                    <Scatter/>
                </TabPane>
                <TabPane tab="About" key="2">
                Max Emilian Verstappen (born 30 September 1997) is a Belgian-Dutch racing driver currently competing in Formula One, under the Dutch flag, with Red Bull Racing. At the 2015 Australian Grand Prix, when he was aged 17 years, 166 days, he became the youngest driver to compete in Formula One. He holds several other "firsts" in Formula One.<br/><br/>
                After spending the 2015 season with Scuderia Toro Rosso, he started his 2016 campaign with the Italian team before being promoted to parent team Red Bull Racing after four races as a replacement for Daniil Kvyat. At the age of 18, he won the 2016 Spanish Grand Prix on his debut for Red Bull Racing, becoming the youngest-ever driver and the first Dutch driver to win a Formula One Grand Prix.<br/><br/>
                Over the course of the next five seasons he achieved several more race victories, including the first for a Honda-powered driver since 2006. He finished the 2019 and 2020 championships in third place. Verstappen is due to remain at Red Bull until the end of the 2023 season after signing a contract extension.<br/><br/>
                He is the son of former Formula One driver Jos Verstappen. 
                </TabPane>
            </Tabs>
            </Modal>
        </React.Fragment>
    );

}