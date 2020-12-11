import React, { useEffect } from 'react';
import { Typography, List, Card, Modal, Row, Col, Divider, Tag, Button, Popconfirm } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Carousel } from 'react-responsive-carousel';

const { Title, Text } = Typography;
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
                            <FurnitureCard furniture={furniture} getFurniture={props.getFurniture} />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
            <Modal
                title={'Furniture'}
                centered
                visible={props.furniture}
                // onOk={() => setVisible(false)}
                onCancel={() => props.getFurniture(null)}
                width={'80%'}
                footer={[
                    <Button key={1} type="default" onClick={() => props.getFurniture(null)}>
                        Close
                    </Button>,
                    <span key={2}>
                        {
                            props.loggedUser && (
                                <Popconfirm
                                    placement="top"
                                    title={`Information will be emailed to ${props.loggedUser.email}`}
                                    onConfirm={() => props.sendInfo(props.furniture.id, props.loggedUser.email)}
                                    okText="Send"
                                    cancelText="Cancel"
                                >
                                    <Button type="primary">Request Info</Button>
                                </Popconfirm>
                            )
                        }
                    </span>
                ]}
            >
                <FurnitureCardFull furniture={props.furniture} />
            </Modal>
        </>
    )
}

const FurnitureCard = ({ furniture, getFurniture }) => {
    return (
        <Card
            style={{ height: 400 }}
            hoverable
            cover={<img alt="Furniture" src={furniture.picture[0].url} style={{ width: '100%', maxHeight: 300, objectFit: 'fill' }} />}
            onClick={() => getFurniture(furniture.id)}
        >
            <Meta title={furniture.name} description={'$' + furniture.unitCost} style={{ position: 'absolute', bottom: 20, width: '100%' }} />
        </Card>
    )
}

const FurnitureCardFull = ({ furniture }) => {
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Carousel showArrows={true}>
                        {
                            furniture.picture.map((picture, i) => (
                                <div key={i} style={{ backgroundColor: '#FFFFFF' }}>
                                    <img alt="Furniture" src={picture.url} style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }} />
                                </div>
                            )
                            )
                        }
                    </Carousel>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Title level={4}>
                                {furniture.name} {furniture.inStock ? <Tag color="green">In Stock</Tag> : <Tag color="red">Out of Stock</Tag>}
                            </Title>
                        </Col>
                        <Col span={12}><Title level={5} style={{ fontWeight: 'bold', float: 'right' }}>{'$' + furniture.unitCost}</Title></Col>
                    </Row>
                    <Row><a href={furniture.link} style={{ color: '#00A6ED' }}>{furniture.link}</a></Row>
                    <Divider />
                    <Row>
                        <Col span={12}>
                            <Title level={5}>Materials and Finishes:</Title>
                            {
                                furniture.materialsAndFinishes.map((txt, i) => (
                                    <Tag color="magenta" key={i}>{txt}</Tag>
                                ))
                            }
                            <Title level={5}>Settings:</Title>
                            {
                                furniture.settings.map((txt, i) => (
                                    <Tag color="blue" key={i}>{txt}</Tag>
                                ))
                            }
                        </Col>
                        <Col span={12}>
                            <Title level={5}>Size:</Title>
                            <Text type="secondary">{furniture.size}</Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        {furniture.description}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Catalog;