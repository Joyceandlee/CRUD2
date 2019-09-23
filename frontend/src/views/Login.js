import React, { Component } from 'react'
import { message } from 'antd';
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', password: ''
        }
    }
    render() {
        return (
            <div>
                <label>
                    name:<input type="text" value={this.state.name} onChange={(e) => {
                        this.setState({
                            name: e.target.value
                        })
                    }} />
                </label>
                <label>
                    password:<input type="password" value={this.state.password} onChange={(e) => {
                        this.setState({
                            password: e.target.value
                        })
                    }} />
                </label>
                <input type="submit" onClick={this.submit.bind(this)} value="登录" />
            </div>
        )
    }

    submit() {
        let { name, password } = this.state;

        if (name && password) {
            axios.post('/login', { data: this.state })
                .then(res => {
                    if (res.data.code === 1) {
                        //将token保存到本地
                        window.localStorage.token = res.data.token;
                        this.props.history.push('/index/list')
                    }
                })
        } else {
            message.warning('用户名或密码不能为空！！');
        }
    }
}
