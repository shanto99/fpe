import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Authentication from "../../API/Authentication";

import swal from "sweetalert";

import './login.css';
import Utility from "../../Utility";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: Authentication.isAuthenticated()
        }
        this.makeLogin = this.makeLogin.bind(this);
        this.getRedirection = this.getRedirection.bind(this);
    }

    componentDidMount() {
        this.props.navSidebarToggler();
    }

    getRedirection() {
        let privileges = Authentication.getUserPrivileges();
        if(privileges.includes(1)) {
            return '/';
        } else if(privileges.includes(2)){
            return '/product';
        } else if(privileges.includes(3)) {
            return '/market';
        } else {
            return '/market-data-entry';
        }
    }

    makeLogin(event) {
        event.preventDefault();
        let staffId = document.getElementById("staff_id").value;
        let password = document.getElementById("password").value;

        let fields = {
            staff_id: {
                isRequired: true,
                type: 'text',
                value: staffId
            },
            password: {
                isRequired: true,
                type: 'text',
                value: password
            }
        };

        let errors = Utility.validateForm(fields);
        if(Object.keys(errors).length > 0) {
            let firstField = Object.keys(errors)[0];
            let firstErrorMsg = errors[firstField][0];
            swal(firstErrorMsg);
        } else {
            Authentication.login(staffId, password).then((result) => {
                this.setState({
                    isLoggedIn: true
                })
            }).catch((err) => {
                console.log("Error occured while login: ", err);
            })
        }
    }
    render = () => {
        let isLoggedIn = this.state.isLoggedIn;
        return(
            !isLoggedIn
             ? <div className="auth-bg">
                        <div className="auth">
                            <div className="auth-header">
                                <h1>Market data</h1>
                                <h6>Welcome! Sign in to access the market data collection panel</h6>
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4 offset-md-4">
                                        <form>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input required={true} type="text" className="form-control" id="staff_id"
                                                           placeholder="Staff ID"/>
                                                    <div className="input-group-addon"><i className="ti-user"/></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input required={true} type="password" className="form-control" id="password"
                                                           placeholder="Password"/>
                                                    <div className="input-group-addon"><i className="ti-key"/></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button onClick={this.makeLogin} type="submit" className="btn btn-danger btn-block">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Redirect to={this.getRedirection()}/>

        )
    }
}

export default Login;