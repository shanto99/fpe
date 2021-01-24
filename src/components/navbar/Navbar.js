import React from "react";
import {Redirect} from 'react-router-dom';

import './navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('market-data-user');
        this.setState({
            loggedIn: false
        }, this.props.onLogout())
    }
    isVisible() {
        if(this.props.visible) return {};
        else return {display: 'none'};
    }
    render() {
               return (<div style={this.isVisible()} className="site-header">
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li className="nav-item m-r-1 hidden-lg-up">
                                <a className="nav-link collapse-button" href="#">
                                    <i className="ti-menu"/>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav pull-xs-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" data-toggle="dropdown" aria-expanded="false">
                                    <div className="avatar box-32">
                                        {/*<img src="img/avatars/1.jpg" alt="User"/>*/}
                                        <span className="user-avatar"><i className="fa fa-user"/></span>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right animated flipInY">
                                    <div className="dropdown-divider"/>
                                    <a onClick={this.logout} className="dropdown-item" href="#"><i className="ti-power-off m-r-0-5"></i> Sign out</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>)

    }
}
export default Navbar;