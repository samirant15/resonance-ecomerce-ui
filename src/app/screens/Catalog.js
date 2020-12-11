import React, { useEffect } from 'react';
import { Typography, List, Card } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Title } = Typography;
const { Meta } = Card;

const Catalog = (props) => {

    useEffect(() => {
        props.getAllFurnitures();
    }, []);

    return (
        <>
            <Title level={3}><ShoppingOutlined /> Catalog</Title>
            <InfiniteScroll
                dataLength={props.furnitures.length}
                next={() => props.getAllFurnitures(props.offset)}
                hasMore={props.offset}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center', marginTop: 50 }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                style={{ overflow: 'unset' }}
            >
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={props.furnitures}
                    renderItem={furniture => (
                        <List.Item>
                            <Card
                                style={{ height: 400 }}
                                hoverable
                                cover={<img alt="Furniture" src={furniture.picture[0].url} style={{ width: '100%', maxHeight: 300, objectFit: 'fill' }} />}
                            >
                                <Meta title={furniture.name} description={'$' + furniture.unitCost} style={{ position: 'absolute', bottom: 20, width: '100%' }} />
                            </Card>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </>
    )
}

export default Catalog;