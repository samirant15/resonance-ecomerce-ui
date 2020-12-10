import React from 'react';
import { Typography } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
const { Title } = Typography;

const Catalog = () => {
    return (
        <>
            <Title level={3}><ShoppingOutlined /> Catalog</Title>
        </>
    )
}

export default Catalog;