import React from 'react';
import { Input, Form, Checkbox, Button, Card, Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, RocketTwoTone } from '@ant-design/icons';
import logo from '../../assets/resonance_logo.png';

const { Title } = Typography;

const Login = () => {
    return (
        <Row justify="center" align="middle">
            <Col sm={12} md={12} lg={10} xl={6}>
                <Card style={{ border: "solid 2px #9B9B9B", boxShadow: "#0000004a 0px 4px 8px 0px" }}
                    title={<img src={logo} alt="logo" />}
                >
                    <Form onSubmit={() => null} className="login-form">
                        <Form.Item>
                            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => window.location = '/catalog'} type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                            <div style={{ float: 'right', fontWeight: 'bold' }}>Or <a href='/signup'>Sign Up now!</a></div>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

const styles = {
    button: {
        fontWeight: 'bold',
    }
}

export default Login;