import React from 'react';
import { Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
const { Title } = Typography;

const SignUp = () => {
    return (
        <>
            <Title level={3}><UserAddOutlined /> Sign Up</Title>
        </>
    )
}

export default SignUp;