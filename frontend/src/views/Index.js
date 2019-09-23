import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import RouterView from '../routes/RouterView'
import axios from 'axios';
import { Layout, Menu, Icon, Button, Modal } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            username: '',
            password: '',
            city: '',
            birthday: ''
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        axios.put('/addlist', { name: this.state.username, password: this.state.password, city: this.state.city, birthday: this.state.birthday},{
            headers:{
                token:window.localStorage.token
            }
        })
            .then(res => {
                if(res.data.code===1){
                    window.history.go(0)
                }
            })

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>

                            <Menu.Item key="1">
                                <NavLink to='/index/list'>
                                    <Icon type="user" />
                                    <span className="nav-text">用户列表</span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <NavLink to='/index/work'>
                                    <Icon type="video-camera" />
                                    <span className="nav-text">工作台</span>
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} >  <Button type="primary" onClick={this.showModal}>添加用户</Button></Header>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <RouterView routes={this.props.children}></RouterView>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>

                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel}
                    >
                        <div>
                            <label>
                                name:<input type="text" value={this.state.username} onChange={(e) => {
                                    this.setState({
                                        username: e.target.value
                                    })
                                }} /><br />
                                password:<input type="password" value={this.state.password} onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }} /><br />
                                city:<input type="text" value={this.state.city} onChange={(e) => {
                                    this.setState({
                                        city: e.target.value
                                    })
                                }} /><br />
                                birthday:<input type="text" value={this.state.birthday} onChange={(e) => {
                                    this.setState({
                                        birthday: e.target.value
                                    })
                                }} /><br />
                            </label>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
