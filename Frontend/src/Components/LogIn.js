import React from "react";
import {
    Form, Icon, Input, Button,
} from 'antd';
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";

class LogIn extends React.Component {
    state = {
        email: "",
        password: "",
    };
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user).then(res => {
            if (res.status) {
                this.setState({
                    errors: res.data
                });
            } else {
                this.props.setDefaultKey('2')
            }
        });
    };
    render() {
        return (
            <Form >
                <Form.Item>
                    <Input style={{ width: "30%" }} name="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <Input style={{ width: "30%" }} name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleInputChange}
                        name="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
                        Log in
          </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default connect(
    null,
    { loginUser }
)(LogIn);