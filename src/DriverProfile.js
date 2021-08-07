import React, {useEffect, useState} from 'react';
import './App.less';
import axios from 'axios'
import './index.css';
import { Modal, Statistic, Row, Col, Skeleton, Tabs } from 'antd';
import { Scatter } from './Scatter';
const { TabPane } = Tabs;
const URL = "http://ergast.com/api/f1/drivers/";
const seasonURL = "http://ergast.com/api/f1/2021/drivers/";
const driverInfoURL = "http://localhost:3000/driverinfo";

export const DriverProfile = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pointsTable, setPointsTable] = useState();
    const [driverInfo, setdriverInfo] = useState();
    const api = URL + props.driver + ".json";
    const url = seasonURL + props.driver + "/results.json";
    const specURL = driverInfoURL + `/${props.driver}`
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

    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
      }
      

    const requestOne = axios.get(api);
    const requestTwo = axios.get(url);
    const requestThree = axios.get(specURL);
    
    useEffect(() => {
        axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
            
            const responseOne = responses[0]
            setData(responseOne.data.MRData.DriverTable.Drivers[0])
            const responseTwo = responses[1]    
            const responseThree = responses[2]
            setPointsTable(responseTwo.data.MRData.RaceTable.Races.map((result) => {
                return {    
                    a: result.round,
                    b: result.Results[0].points
                }
            }))  
            setdriverInfo(responseThree.data[0])
            console.log(driverInfo)
            setIsLoading(false)
        })).catch(errors => {
            console.log("ERROR ", errors);
        })
    }, [setIsLoading, setData, setPointsTable])

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
                                    <Statistic title="Career Points" value={driverInfo.careerpoints} precision={0} />  
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Grand Prix's" value={driverInfo.totalgrandprix} precision={0} />
                                </Col>
                            </Row>
                            <br/>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title="Date of Birth" value={convertDate(data.dateOfBirth)} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Nationality" value={data.nationality} precision={0} />  
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Podiums" value={driverInfo.podiums} precision={0} />
                                </Col>
                            </Row></div>}
                        </div>

                    </div><br/>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Season Form" key="1">
                    { !isLoading  && <Scatter seasonPointsTable={pointsTable}/>}
                    </TabPane>
                    <TabPane tab="About" key="2">
                    { !isLoading  && `${driverInfo.driverinfotext}`}
                    </TabPane>
                </Tabs>
                </Modal>)}       
        </React.Fragment>
    );

}