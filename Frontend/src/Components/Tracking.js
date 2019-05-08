import React from 'react';
import 'antd/dist/antd.css'
import axios from "axios";
import { Input, Timeline, Spin, Button, message } from 'antd';
import Validator from 'validate.js'
import moment from "moment"
import { addParcellToUser, searchParcellsFromUser, deleteParcellsFromUser } from '../actions/usersRequests'

const Search = Input.Search;

class Tracking extends React.Component {
    state = {
        checkpoints: [],
        found: false,
        trackingNumber: '',
        status: '',
        loading: false,
        parcells: [],
        fav: false
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            searchParcellsFromUser(this.props.auth.user.id).then(res => {
                this.setState({
                    parcells: res.parcells
                })
            })
        }
    }
    addParcell = () => {
        const parcell = {
            user: this.props.auth.user.id,
            trackingNumber: this.state.trackingNumber,
            status: this.state.status
        }
        addParcellToUser(parcell).then(() =>
            searchParcellsFromUser(this.props.auth.user.id).then(res => {
                this.setState({
                    parcells: res.parcells,
                    fav: true
                })
                message.success('Successfully added')
            })
        )
    }

    deleteParcell = () => {
        const parcell = {
            user: this.props.auth.user.id,
            trackingNumber: this.state.trackingNumber,
            page: "Tracking",
        }
        deleteParcellsFromUser(parcell).then(res => {
            searchParcellsFromUser(this.props.auth.user.id).then(res => {
                this.setState({
                    parcells: res.parcells,
                    fav: false
                })
                message.success('Successfully removed')
            })
        })
    }
    Search = (value) => {
        this.setState({
            trackingNumber: value
        })
        this.state.parcells.forEach(item => {
            if (item.trackingNumber === value)
                this.setState({
                    fav: true
                })
        })
        let exist = false;
        axios.defaults.headers.common["aftership-api-key"] = 'c077d13d-c4cb-4a24-81bd-ac7e6bede95f';
        axios.defaults.headers.common["Content-Type"] = 'application/json';
        delete axios.defaults.headers.common["Authorization"];
        
        let body = {
            'tracking': {
                'tracking_number': value,
            }
        };
        if (!Validator.isEmpty(value)) {
            this.setState({
                loading: true,
            })
            axios.get(`https://api.aftership.com/v4/trackings/`).then(result => {
                result.data.data.trackings.forEach(item => {
                    if (item.tracking_number === value) {
                        this.setState({
                            checkpoints: item.checkpoints,
                            found: true,
                            status: item.tag,
                            loading: false,
                        })
                        exist = true
                    }
                })
                if (!exist) {
                    this.setState({
                        loading: true,
                    })
                    axios.post(`https://api.aftership.com/v4/trackings`, body).then(res => {
                        setTimeout(() => {
                            axios.get(`https://api.aftership.com/v4/trackings/${res.data.data.tracking.id}`).then(result => {
                                this.setState({
                                    checkpoints: result.data.data.tracking.checkpoints,
                                    found: true,
                                    status: result.data.data.tracking.tag,
                                    loading: false,
                                })

                            })
                        }, 10000)
                    })
                }
            })
        }
    }
    render() {
        return (
            <section style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }} >
                <Search
                    placeholder="Input your track number"
                    onSearch={value => this.Search(value)}
                    enterButton
                >
                </Search>
                {this.state.loading &&
                    <div style={{
                        textAlign: 'center',
                        width: '100%',
                        background: 'rgba(0,0,0,0.05)',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        padding: '30px 50px',
                        margin: '20px 0',
                    }}>
                        <Spin />
                    </div>
                }{!this.state.loading &&
                    <Timeline style={{ marginTop: '50px' }}>
                        {this.state.checkpoints.map(item => (
                            <Timeline.Item>{item.message} <br></br>{item.location}<br></br> {moment(item.checkpoint_time).format("MMMM Do YYYY")} <br></br> {item.slug}</Timeline.Item>
                        ))}
                    </Timeline>
                }
                {(this.state.found && this.props.auth.isAuthenticated && !this.state.fav) &&
                    <Button onClick={this.addParcell}>Add to your parcells</Button>
                }
                {(this.state.found && this.props.auth.isAuthenticated && this.state.fav) &&
                    <Button onClick={this.deleteParcell}>Remove from your parcells</Button>
                }
            </section >
        )
    }
}

export default Tracking