import React, {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios'
import 'antd/dist/antd.css';
import './index.css';
import { Modal, Statistic, Row, Col, Skeleton, Tabs } from 'antd';
import { Scatter } from './Scatter';
const { TabPane } = Tabs;
const URL = "http://ergast.com/api/f1/drivers/";

export const DriverProfile = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const api = URL + props.driver + ".json"
    let modalVisible = props.modalVisible

    function callback(key) {
        console.log(key);
    }
    
    function getDriverImage(driver) {
        return require(`./assets/images/drivers/${driver}.png`)
    }

    function getTeamImage(team) {
        return require(`./assets/images/teams/${team}.jpg`)
    }

    function getDriverNumberImage(driver) {
        return require(`./assets/images/numbers/${driver}.png`)
    }

    useEffect(() => {
        const fetchdata = async () => {
            await axios.get(api)
            .then(res => {
                setData(res.data.MRData.DriverTable.Drivers[0])
                setIsLoading(false)
            })
            .catch(function(e) {
                console.log("ERROR ", e);
            })
        };
        fetchdata();
    }, [setData, setIsLoading]);

    console.log(props.team)

    return (  
        
        <React.Fragment>  
        {isLoading && <Modal>
            <Skeleton active /> 
        </Modal> }    
        {(<Modal title={isLoading ? <Skeleton.Input style={{ width: 150, height: 20 }} active={true} /> : <div>{<img className="drivernumber" src={getDriverNumberImage(props.driver).default}/>} {(data.givenName + " " + data.familyName) + " " + "(" + data.code + ")"}</div>  } visible={modalVisible} footer={null} width={1200} onCancel={props.onClose} onOk={props.onClose}>
                    <div className="productsContainer">
                        <img className="driverphoto" src={getDriverImage(props.driver).default}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        
                        <div className="products">
                            {isLoading && <Skeleton active />}
                            {!isLoading && <div><Row gutter={16}>
                                <Col span={8}>
                                    <img className="teamphoto" src={getTeamImage(props.team).default}/>
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Career Points" value={0} precision={0} />  
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Grand Prix's" value={9} precision={0} />
                                </Col>
                            </Row>
                            <br/>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title="Date of Birth" value={data.dateOfBirth} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Nationality" value={data.nationality} precision={0} />  
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Podiums" value={0} precision={0} />
                                </Col>
                                
                            </Row></div>}
                        </div>

                    </div><br/>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Season Form" key="1">
                    { !isLoading  && <Scatter/>}
                    </TabPane>
                    <TabPane tab="About" key="2">
                    Max Emilian Verstappen (born 30 September 1997) is a Belgian-Dutch racing driver currently competing in Formula One, under the Dutch flag, with Red Bull Racing. At the 2015 Australian Grand Prix, when he was aged 17 years, 166 days, he became the youngest driver to compete in Formula One. He holds several other "firsts" in Formula One.<br/><br/>
                    After spending the 2015 season with Scuderia Toro Rosso, he started his 2016 campaign with the Italian team before being promoted to parent team Red Bull Racing after four races as a replacement for Daniil Kvyat. At the age of 18, he won the 2016 Spanish Grand Prix on his debut for Red Bull Racing, becoming the youngest-ever driver and the first Dutch driver to win a Formula One Grand Prix.<br/><br/>
                    Over the course of the next five seasons he achieved several more race victories, including the first for a Honda-powered driver since 2006. He finished the 2019 and 2020 championships in third place. Verstappen is due to remain at Red Bull until the end of the 2023 season after signing a contract extension.<br/><br/>
                    He is the son of former Formula One driver Jos Verstappen. 
                    </TabPane>
                </Tabs>
                </Modal>)}       
        </React.Fragment>
    );

}