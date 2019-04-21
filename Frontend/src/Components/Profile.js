import React from 'react';
import 'antd/dist/antd.css'
import { searchCurrentUser } from "../actions/usersRequests";
import { connect } from "react-redux";
import { Avatar, Typography } from 'antd';

const { Paragraph, Text } = Typography;

class Profile extends React.Component {
    state = {
        name: '',
        email: '',
        telephone: '',
    };
    componentDidMount() {
        searchCurrentUser(this.props.user.id).then(res => {
            this.setState({
                name: res.name,
                email: res.email,
            })
        })
    }
    onChange = (str) => {
        this.setState({ str });
    };
    render() {
        return (
            <section style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                <Avatar shape="square" size={256} icon="user" />
                <br></br>
                <Paragraph style={{ fontSize: '20px' }} editable={{ onChange: this.onChange }}>{this.state.name}</Paragraph >
                <Paragraph style={{ fontSize: '20px' }}>Email:<Text editable={{ onChange: this.onChange }}>{this.state.email}</Text></Paragraph >
                <Paragraph style={{ fontSize: '20px' }} >Telephone: <Text editable={{ onChange: this.onChange }}>+375298085562</Text></Paragraph >

            </section>
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    null,
)(Profile);