import React, { useState } from 'react';
import history from '../../history';
import { routes, routesArray } from '../config/routeConfig';
import { Layout, Menu, Typography, Button, Avatar, Popover, List } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../../assets/resonance_logo.png';

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;
const routesArr = routesArray();

const AppLayout = ({ noSider, noTitle, noUser, noFooter, content, logout, loggedUser }) => {
    return (
        <Layout>
            <Header className="header" style={styles.header}>
                {!noUser && <LayoutUser logout={logout} loggedUser={loggedUser} />}
                {!noTitle && <a href='/'><img style={{ height: '90%', objectFit: 'contain' }} src={logo} alt="logo" /></a>}
            </Header>
            <Layout style={{ minHeight: '80vh' }}>
                {!noSider && <LayoutSider />}
                <Content style={styles.content}>{content}</Content>
            </Layout>
            {!noFooter && <LayoutFooter noSider={noSider} />}
        </Layout>
    );
}

const LayoutUser = ({ logout, loggedUser }) => (
    <div style={{ float: 'right' }}>
        <Popover
            content={
                <List>
                    <List.Item style={{ padding: 0 }}>
                        <Button type="link" style={{ cursor: 'default' }} block> <UserOutlined /> My Account</Button>
                    </List.Item>
                    <List.Item style={{ padding: 0 }}>
                        <Button type="link" style={{ cursor: 'default' }} block><SettingOutlined /> Settings</Button>
                    </List.Item>
                    <List.Item style={{ padding: 0 }}>
                        <Button onClick={logout} type="link" block> <LogoutOutlined /> Log out</Button>
                    </List.Item>
                </List>
            }
            title={<p style={{ textAlign: 'center', margin: 0 }}>{loggedUser ? ('@' + loggedUser.username) : ''}</p>}
            placement="bottom"
            trigger="click"
        >
            <Avatar style={{ backgroundColor: '#F7AC35', verticalAlign: 'middle' }} size="large">
                {loggedUser ? (loggedUser.firstName[0] + loggedUser.lastName[0]) : ''}
            </Avatar>
        </Popover>
    </div>
)

const LayoutSider = () => {
    const [collapsed, setCollapsed] = useState(false);
    const path = history.location.pathname;
    const selected = routesArr.find(r => r.path === path).title;
    const open = routesArr.find(r => r.path === path).parentTitle;

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={200}
            breakpoint='md'
            onBreakpoint={setCollapsed}
            style={{ background: '#fff' }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={[selected]}
                defaultOpenKeys={[open]}
                style={{ height: 'calc(100vh - 64px - 48px)', borderRight: 0 }}
            >
                {
                    Object.entries(routes).map(([i, route]) =>
                        route.subMenu && route.subMenu === true ? (
                            <Menu.SubMenu key={route.title}
                                title={
                                    <span>
                                        {route.icon}
                                        <span>{route.title}</span>
                                    </span>
                                }
                            >
                                {
                                    Object.entries(route.routes).map(([i, subroute]) => (
                                        subroute.showOnSider && <Menu.Item key={subroute.title} onClick={() => history.push(subroute.path)}>
                                            {subroute.icon}
                                            <span>{subroute.title}</span>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.SubMenu>
                        ) : (
                                route.showOnSider && <Menu.Item key={route.title} onClick={() => history.push(route.path)}>
                                    {route.icon}
                                    <span>{route.title}</span>
                                </Menu.Item>
                            )
                    )
                }
            </Menu>
        </Sider>
    )
}

const LayoutFooter = (props) => (
    <Footer style={{ marginLeft: !props.noSider ? 200 : 0, paddingBottom: 10, textAlign: 'center' }}>
        <span style={{ textAlign: 'center', color: '#9B9B9B' }}>Resonance Companies - 2020</span>
    </Footer>
)

const styles = {
    content: {
        background: '#fff',
        padding: '5%',
        margin: '1%',
    },
    header: {
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderBottom: "solid 2px #9B9B9B",
        boxShadow: "#0000004a 0px 4px 8px 0px"
    }
};

export default AppLayout;