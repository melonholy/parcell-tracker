import React from "react";
import {
    Form, Icon, Input, Button
} from 'antd';
import { connect } from "react-redux";
import { registerUser, loginUser } from "../actions/authentication";

class SingUp extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: {}
    };
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };

        registerUser(user).then(res => {
            if (res.status) {
                this.setState({
                    errors: res.data
                });
            }
            else {
                this.props.loginUser(user).then(res => {
                    if (res.status) {
                        this.setState({
                            errors: res.data
                        });
                    } else {
                        this.props.setDefaultKey('2')
                    }
                });
            }
        });
    };
    render() {
        return (
            <Form >
                <Form.Item>
                    <Input style={{ width: "30%" }} name="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <Input style={{ width: "30%" }} name="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <Input style={{ width: "30%" }} name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <Input style={{ width: "30%" }} name="passwordConfirm" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" onChange={this.handleInputChange} />
                </Form.Item>
                <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
                    Sign up
          </Button>
            </Form >
        )
    }
}
export default connect(
    null,
    { loginUser }
)(SingUp);