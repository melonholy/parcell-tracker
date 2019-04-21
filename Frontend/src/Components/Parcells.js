import React from 'react';
import 'antd/dist/antd.css'
import { searchParcellsFromUser, deleteParcellsFromUser } from "../actions/usersRequests";
import { connect } from "react-redux";
import { Table, Tag } from 'antd';

class Parcells extends React.Component {
    state = {
        parcells: [],
        sortedInfo: null
    };

    deleteParcell = (key) => {
        const parcell = {
            user: this.props.user.id,
            key: key,
            page:"Parcells",
        }
        deleteParcellsFromUser(parcell).then(res => {
            searchParcellsFromUser(this.props.user.id).then(res => {
                this.setState({
                    parcells: res.parcells
                })
            })
        })
    }
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter,
        });
    }

    componentDidMount() {
        searchParcellsFromUser(this.props.user.id).then(res => {
            this.setState({
                parcells: res.parcells
            })
        })
    }
    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: 'Tracking number',
                dataIndex: 'trackingNumber',
                sorter: (a, b) => ((a.trackingNumber < b.trackingNumber) ? -1 : ((a.trackingNumber > b.trackingNumber) ? 1 : 0)),
                sortOrder: sortedInfo.columnKey === 'trackingNumber' && sortedInfo.order,
            }, {
                title: 'Status',
                dataIndex: 'status',
                sorter: (a, b) => ((a.status < b.status) ? -1 : ((a.status > b.status) ? 1 : 0)),
                sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
                render: status => (
                    <span>
                        <Tag color={status === 'InTransit' ? 'geekblue' : 'green'} key={status}>{status.toUpperCase()}</Tag>
                    </span>
                ),
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.deleteParcell(record._id)}>Delete</a>
                    </span>
                ),
            }];
        return (
            <section>
                <Table columns={columns} dataSource={this.state.parcells} onChange={this.handleChange} />
            </section >
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    null,
)(Parcells);