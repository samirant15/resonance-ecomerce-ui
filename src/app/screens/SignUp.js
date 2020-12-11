import React from 'react';
import { Input, Form, Button, Card, Typography, Row, Col, Spin } from 'antd';
import { UserAddOutlined, UserOutlined, LockOutlined, MailOutlined, FontColorsOutlined } from '@ant-design/icons';
import { Formik } from 'formik';

const { Title } = Typography;

const SignUp = (props) => {
    return (
        <Row justify="center" align="middle">
            {
                props.uploading ? <Spin size="large" style={{ position: 'absolute', left: '50%', top: '50%' }} /> : (
                    <Col sm={12} md={12} lg={10} xl={6}>
                        <Card style={{ border: "solid 2px #9B9B9B", boxShadow: "#0000004a 0px 4px 8px 0px" }}
                            title={<Title style={{ textAlign: 'center' }} level={3}><UserAddOutlined /> Sign Up</Title>}
                        >
                            <Formik
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    username: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: ""
                                }}
                                onSubmit={values => props.signup(values)}
                            >
                                {formikProps => (
                                    <>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('firstName')} prefix={<FontColorsOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('lastName')} prefix={<FontColorsOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('username')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('email')} prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('password')} prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input onChange={formikProps.handleChange('confirmPassword')} prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onPressEnter={formikProps.handleSubmit} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button onClick={formikProps.handleSubmit} type="primary" block htmlType="submit" className="login-form-button">Sign Up</Button>
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

export default SignUp;