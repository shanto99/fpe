import React from 'react';
import swal from "sweetalert";
import Pagination from "../pagination/Pagination";
import Modal from "../modal/Modal";
import CostModal from "./costModal/CostModal";
import API from "../../API/API";

import './cost.css';

class Cost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          openModal: false,
          totalPage: 0,
          currentPage: 0,
          costs: []
        };

        this.newCost = this.newCost.bind(this);
        this.doActionOnCost = this.doActionOnCost.bind(this);
        this.generateCosts = this.generateCosts.bind(this);
        this.changePage = this.changePage.bind(this);
        this.getAllCosts();
    }
    componentDidMount() {
        this.getAllCosts();
    }

    getAllCosts() {
        API.getCosts().then(res => {
            let costs = res.cost_type;
            this.setState({
                costs: costs
            });
        }, () => {
            swal("Could not fetch Cost types");
        });
    }
    newCost() {

    }
    doActionOnCost() {

    }
    generateCosts() {
        let costs = this.state.costs;
        return costs.map(cost => {
            return (
                <tr key={cost.CostID}>
                    <td>{cost.CostName}</td>
                    <td>{cost.Active === 'Y' ? 'Active' : 'Inactive'}</td>
                    <td className="action-cell">
                        <span className="text-center">
                            <i data-action="edit" className="fa fa-edit"/>
                        </span>
                        <span className="text-center">
                            <i data-action="delete" className="fa fa-trash"/>
                        </span>
                    </td>
                </tr>
            )
        })
    }
    changePage() {

    }
    closeModal() {

    }
    render() {
        return(
            <div className="content-area p-y-1">
                <div className="container-fluid">
                    <div className="card card-block">
                        <div className="row">
                            <div className="col-md-8 col-sm-12 col-12">
                                <div className="product-section-header">
                                    <h5>Markets</h5>
                                    <button onClick={this.newCost} className="btn btn-primary add-new"><span><i className="fa fa-plus-circle"/></span>&nbsp; Add new</button>
                                </div>

                                <table className="table m-md-b-0">
                                    <thead className="thead-inverse">
                                    <tr>
                                        <th>Cost name</th>
                                        <th>Active</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody onClick={this.doActionOnCost}>
                                    {this.generateCosts()}
                                    </tbody>
                                </table>
                                <Pagination key={this.state.totalPage}
                                            pageCount={this.state.totalPage}
                                            currentPage={this.state.currentPage}
                                            changePage={this.changePage}
                                />
                            </div>
                            {this.state.openModal
                                ? <Modal title={this.title} isOpen={this.state.openModal} closeCb={this.closeModal}>
                                    <CostModal closeCb={this.closeModal}/>
                                </Modal> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cost;