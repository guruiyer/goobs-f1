import ReactDOM from 'react-dom';
import React, {Component, useState} from 'react';
import {Menu} from "antd";
import {BankOutlined, TrophyOutlined, VideoCameraOutlined, LineChartOutlined, AuditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="/" icon={<TrophyOutlined />}>
                <Link to='/'>Season Standings</Link>
            </Menu.Item>
            <Menu.Item key="" icon={<AuditOutlined />}>
                <Link to='/newsroom'>The Newsroom</Link>
            </Menu.Item>
            <Menu.Item key="/SeasonVisualiser" icon={<LineChartOutlined />}>
                <Link to='/scatter'>Season Visualiser</Link>
            </Menu.Item>
            <Menu.Item key="/Schedule" icon={<VideoCameraOutlined />}>
                <Link to='/Schedule'>Race Schedule</Link>
            </Menu.Item>
            <Menu.Item key="/Vault" icon={<BankOutlined />}>
                <Link to='/Vault'>The Vault</Link>
            </Menu.Item>       
        </Menu>
    )
}
