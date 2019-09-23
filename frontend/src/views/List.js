import React, { Component } from 'react'
import axios from 'axios';
import { Table, Divider, Modal } from 'antd';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            record: {},
            username: '',
            password: '',
            city: '',
            birthday: '',
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    id: 'name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: 'City',
                    dataIndex: 'city',
                    id: 'city',
                },
                {
                    title: 'Birthday',
                    dataIndex: 'birthday',
                    id: 'birthday',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <a onClick={() => {
                                this.setState({
                                    record: record,
                                    visible: true
                                })

                            }}>更新</a>
                            <Divider type="vertical" />
                            <a onClick={() => {
                                axios.delete(`/delete?id=${record.id}`, {
                                    headers: {
                                        token: window.localStorage.token
                                    }
                                })
                                    .then(res => {
                                        if (res.data.code === 1) {
                                            window.history.go(0)
                                        }
                                    })
                            }}>删除</a>
                        </span>
                    )
                },
            ]
        };
    }


    handleOk = e => {
        this.setState({
            visible: false
        })
        axios.patch('/update', { id: this.state.record.id, name: this.state.username, password: this.state.password, city: this.state.city, birthday: this.state.birthday }, {
            headers: {
                token: window.localStorage.token
            }
        }).then(res => {
            if (res.data.code === 1) {
                window.history.go(0)
            }
        })
    };

    handleCancel = e => {
        this.setState({
            visible: false
        })
    };
    state = {
        data: []
    }
    componentDidMount() {
        axios.get('/getlist', {
            headers: {
                token: window.localStorage.token
            }
        })
            .then(res => {
                if (res.data.code === 1) {
                    res.data.data.map((item, index) => {
                        item.key = item.id
                    })
                    this.setState({
                        data: res.data.data
                    })
                }
            })
    }
    render() {
        return (
            <div>
                <Table columns={this.state.columns} dataSource={this.state.data} />

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
        )
    }

}
