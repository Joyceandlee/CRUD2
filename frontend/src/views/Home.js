import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { routes } from '../routes/index';
import RouterView from '../routes/RouterView';


export default class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <RouterView routes={routes}></RouterView>
            </BrowserRouter>
        )
    }
}
