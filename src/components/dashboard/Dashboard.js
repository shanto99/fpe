import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Cost from "../cost/Cost";

import Authentication from "../../API/Authentication";

import './dashboard.css';

class Dashboard extends Component{
    componentDidMount() {
        this.props.navSidebarToggler();
    }

    render() {
        return (
             <div className="site-content">
                 <Switch>
                     <Route exact={true} path="/cost" component={Cost}/>
                 </Switch>
                {/*<Switch>*/}
                {/*    <Route exact={true} path="/business" component={Business}/>*/}
                {/*    {Authentication.checkPrivilege('1') ? <Route exact={true} path="/market-data-entry" component={MarketDataEntry}/> : null}*/}
                {/*    <Route exact={true} path="/market" component={Market}/>*/}
                {/*    <Route exact={true} path="/product" component={Product}/>*/}
                {/*    <Route exact={true} path="/report" component={Report}/>*/}
                {/*    {Authentication.checkPrivilege('5') ? <Route exact={true} path="/" component={ViewData}/> : null}*/}
                {/*</Switch>*/}
             </div>
        )
    }
}

export default Dashboard;