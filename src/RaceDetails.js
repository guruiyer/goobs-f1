import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Component } from 'react';
import axios from 'axios'
import { Layout } from 'antd';
import { Spin } from 'antd';
import { Card, Col, Row } from 'antd';
import { useParams, withRouter } from "react-router";

const { Header} = Layout;

const URL = "http://ergast.com/api/f1/current.json";

const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };
  

export const RaceDetails = (props) => {
        const params  = useParams()     
        console.log(params)   
        return ( 
            <div>
                asdasd
                {params.id}
            </div>
            
        );

}

export default withRouter(RaceDetails);

