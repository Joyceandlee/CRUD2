import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'


class RouterView extends Component {
    render() {
        let { routes } = this.props;
        let route1 = routes.filter(item => !item.redirect)
        let route2 = routes.filter(item => item.redirect)
        return (
            <Switch>
                {
                    route1.map((item, index) => {
                        return (
                            <Route key={index} path={item.path} render={(props) => {
                                return <item.component children={item.children} {...props} />
                            }}></Route>
                        )
                    })
                }
                {
                    route2.map((item, index) => {
                        return (
                            <Redirect key={index} from="/" to={item.redirect}></Redirect>
                        )
                    })
                }
            </Switch>
        );
    }
}

export default RouterView;