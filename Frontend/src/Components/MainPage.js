import React from 'react';
import '../App.css';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css'
import Tracking from './Tracking'
import Profile from "./Profile"
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import Parcells from './Parcells'
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";

const { Header, Sider, Content } = Layout;

class MainPage extends React.Component {
    state = {
        collapsed: false,
        usedKey: '1',
    };
    setDefaultKey = (key) => {
        this.setState({
            usedKey: key,
        }); 
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    LogOut = () => {
        this.props.logoutUser()
        this.setDefaultKey('1');
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }} breakpoint={'md'}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    {this.props.auth.isAuthenticated ? (
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.usedKey]}>
                            <Menu.Item key="1" onClick={(item) => this.setState({ usedKey: item.key })}>
                                <Icon type="search" />
                                <span>Track your parcel</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={(item) => this.setState({ usedKey: item.key })}>
                                <Icon type="user" />
                                <span>Profile</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={(item) => this.setState({ usedKey: item.key })}>
                                <Icon type="inbox" />
                                <span>Your parcels</span>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={this.LogOut}>
                                <Icon type="logout" />
                                <span>Log Out</span>
                            </Menu.Item>
                        </Menu>
                    ) : (<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={(item) => this.setState({ usedKey: item.key })}>
                            <Icon type="search" />
                            <span>Track your parcel</span>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={(item) => this.setState({ usedKey: item.key })}>
                            <Icon type="login" />
                            <span>Log in</span>
                        </Menu.Item>
                        <Menu.Item key="6" onClick={(item) => this.setState({ usedKey: item.key })}>
                            <Icon type="user-add" />
                            <span>Sign up</span>
                        </Menu.Item>
                    </Menu>)}
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    {(this.state.usedKey == 1) &&
                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            <Tracking  auth={this.props.auth}/>
                        </Content>
                    }
                    {(this.state.usedKey == 2) &&
                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            <Profile />
                        </Content>
                    }
                      {(this.state.usedKey == 3) &&
                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                        <Parcells/>
                        </Content>
                    }
                    {(this.state.usedKey == 5) &&
                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            <LogIn  setDefaultKey={this.setDefaultKey}/>
                        </Content>
                    }
                    {(this.state.usedKey == 6) &&
                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            <SignUp setDefaultKey={this.setDefaultKey} />
                        </Content>
                    }
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logoutUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);

