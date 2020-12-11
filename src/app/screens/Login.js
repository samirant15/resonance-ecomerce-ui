import React from 'react';
import { Input, Form, Button, Card, Typography, Row, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import logo from '../../assets/resonance_logo.png';

const { Title } = Typography;

const Login = (props) => {
    return (
        <Row justify="center" align="middle">
            {
                props.loading ? <Spin size="large" style={{ position: 'absolute', left: '50%', top: '50%' }} /> : (
                    <Col sm={12} md={12} lg={10} xl={6}>
                        <Card style={{ border: "solid 2px #9B9B9B", boxShadow: "#0000004a 0px 4px 8px 0px" }}
                            title={<img style={{ width: '100%', objectFit: 'contain' }} src={logo} alt="logo" />}
                        >
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                onSubmit={values => props.login(values)}
                            >
                                {formikProps => (
                                    <>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('email')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('password')} prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button onClick={formikProps.handleSubmit} type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                                            <div style={{ float: 'right', fontWeight: 'bold' }}>Or <a href='/signup'>Sign Up now!</a></div>
                                        </Form.Item>
                                    </>
                                )}
                            </Formik>
                        </Card>
                    </Col>
                )
            }
        </Row>
    )
}

const styles = {
    button: {
        fontWeight: 'bold',
    }
}

export default Login;