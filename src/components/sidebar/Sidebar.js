import React from "react";
import {Link} from 'react-router-dom';
import Authentication from "../../API/Authentication";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.privileges = {};
        this.state = {
            visible: this.props.visible
        }

        this.sideBarRef = React.createRef();
        this.settingRef = React.createRef();
        this.marketRef = React.createRef();
        this.productRef = React.createRef();
        this.reportTitleRef = React.createRef();
        this.reportRef = React.createRef();
        this.viewDataRef = React.createRef();
        this.reportRef = React.createRef();

        this.calculatePrivileges = this.calculatePrivileges.bind(this);
        this.hideOrShowMenus = this.hideOrShowMenus.bind(this);

        this.calculatePrivileges();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.calculatePrivileges();
        if(!nextProps.visible) {
            this.sideBarRef.current.style = 'display: none';
        } else {
            this.sideBarRef.current.removeAttribute('style');
            this.hideOrShowMenus();
        }
    }

    componentDidMount() {
        if(!Authentication.isAuthenticated()) {
            this.sideBarRef.current.style = 'display: none';
        }
    }

    hideOrShowMenus() {
        let settingMenu = this.checkPrivileges(['market', 'product']);
        if(!settingMenu) {
            this.settingRef.current.style = 'display: none';
        } else {
            this.settingRef.current.removeAttribute('style');
            this.settingRef.current.querySelector("#settings-count").textContent = settingMenu.count;
            let productMenu = this.checkPrivileges('product');
            if(productMenu) {
                this.productRef.current.removeAttribute('style');
            } else {
                this.productRef.current.style = 'display: none';
            }
            let marketMenu = this.checkPrivileges('market');
            if(marketMenu) {
                this.marketRef.current.removeAttribute('style');
            } else {
                this.marketRef.current.style = 'display: none';
            }

            let reportMenu = this.checkPrivileges(['report', 'tableReport']);
            if(!reportMenu) {
                this.reportRef.current.style = 'display: none';
                this.reportTitleRef.current.style = 'display: none';
            } else {
                this.reportRef.current.removeAttribute('style');
                this.reportTitleRef.current.removeAttribute('style');
                this.reportRef.current.querySelector("#reports-count").textContent = reportMenu.count;
            }
        }
    }

    checkPrivileges(privileges) {
        // let isMultiple = Array.isArray(privileges);
        // if(isMultiple) {
        //     let privilegeCount = 0;
        //     privileges.forEach(privilege => {
        //         if(this.privileges[privilege]) privilegeCount++;
        //     })
        //     if(privilegeCount === 0) return false;
        //     else return {count: privilegeCount};
        // } else {
        //     return !!this.privileges[privileges];
        // }

        return true;
    }

    calculatePrivileges() {
        let productMenu = Authentication.hasPrivilege([2,5]);
        let marketMenu = Authentication.hasPrivilege([3, 1, 5]);
        let reportMenu = Authentication.hasPrivilege([5]);
        let tableReport = Authentication.hasPrivilege([5]);
        this.privileges = {
            product: productMenu,
            market: marketMenu,
            report: reportMenu,
            tableReport: tableReport
        }

    }

    render() {
        return(
            <div ref={this.sideBarRef}>
                <div className="site-sidebar-overlay"/>
                <div className="site-sidebar">
                    <Link className="logo" to="/">
                        <span className="l-text">Market Data</span>
                        <span className="l-icon"/>
                    </Link>
                    <div className="custom-scroll custom-scroll-light">
                        <ul className="sidebar-menu">
                            <li className="menu-title m-t-0-5">Navigation</li>
                            <li className="with-sub" ref={this.settingRef}>
                                <a href="#" className="waves-effect  waves-light">
                                    <span className="s-caret"><i className="fa fa-angle-down"/></span>
                                    <span id="settings-count" className="tag tag-warning">0</span>
                                    <span className="s-icon"><i className="ti-dashboard"/></span>
                                    <span className="s-text">Settings</span>
                                </a>
                                <ul>
                                    <li ref={this.productRef}><Link to="/cost">Costs</Link></li>
                                    <li ref={this.marketRef}><Link to="/programs">Programs</Link></li>
                                </ul>
                            </li>
                            <li className="with-sub">
                                <a href="#" className="waves-effect  waves-light">
                                    <span className="s-caret"><i className="fa fa-angle-down"/></span>
                                    <span className="tag tag-danger">1</span>
                                    <span className="s-icon"><i className="ti-package"/></span>
                                    <span className="s-text">Activity</span>
                                </a>
                                <ul>
                                    <li><Link to="/market-data-entry">Market Data Entry</Link></li>
                                </ul>
                            </li>
                            <li className="menu-title" ref={this.reportTitleRef}>Report</li>
                            <li className="with-sub" ref={this.reportRef}>
                                <a href="#" className="waves-effect  waves-light">
                                    <span className="s-caret"><i className="fa fa-angle-down"/></span>
                                    <span id="reports-count" className="tag tag-purple">{0}</span>
                                    <span className="s-icon"><i className="ti-paint-bucket"/></span>
                                    <span className="s-text">Report</span>
                                </a>
                                <ul>
                                    <li ref={this.viewDataRef}><Link to="/">View Data</Link></li>
                                    <li ref={this.reportRef}><Link to="/report">Report</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;