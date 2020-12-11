import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actions from './furnitureActions';
import * as graphqlClient from '../core/graphqlClient';
import GraphQLError from '../../exceptions/GraphQLError';
import * as selector from './furnitureSelectors';
import { notification } from "antd";

function* getAll(action) {
    try {

        const offset = action.payload.offset ? `(offset: "${action.payload.offset}")` : '';

        const query = `
        {
            furnitures ${offset} {
                records {
                    id,
                    name,
                    picture {
                        id,
                        url,
                        filename,
                        size,
                        type,
                        thumbnails {
                            small {
                                url,
                                width,
                                height
                            },
                            large {
                                url,
                                width,
                                height
                            }
                        }
                    },
                    vendor,
                    inStock,
                    unitCost,
                    size,
                    description,
                    designer,
                    link,
                    notes,
                    materialsAndFinishes,
                    settings
                },
                offset
            }
        }
        `;

        const res = yield call(graphqlClient.requestWithAuth, query);

        let furnitures = res.data.data.furnitures;
        yield put({ type: actions.FURNITURE.GET_ALL.SUCCESS, payload: furnitures });
    } catch (error) {
        yield put({ type: actions.FURNITURE.GET_ALL.FAIL, payload: error.message })
        if (error instanceof GraphQLError) {
            notification.error({ message: 'Error! \n ' + error.message });
            return
        }
        notification.error({ message: 'Error loading furnitures! \n Try again later' });
    }
}

function* get(action) {
    try {

        if (action.payload.id === null) {
            yield put({ type: actions.FURNITURE.GET.SUCCESS, payload: null });
        }

        const query = `
        {
            furniture (id: "${action.payload.id}") {
                id,
                name,
                picture {
                    id,
                    url,
                    filename,
                    size,
                    type,
                    thumbnails {
                        small {
                            url,
                            width,
                            height
                        },
                        large {
                            url,
                            width,
                            height
                        }
                    }
                },
                vendor,
                inStock,
                schematic {
                    id,
                    url,
                    filename,
                    size,
                    type,
                    thumbnails {
                        small {
                            url,
                            width,
                            height
                        },
                        large {
                            url,
                            width,
                            height
                        }
                    }
                },
                unitCost,
                size,
                description,
                designer,
                link,
                notes,
                materialsAndFinishes,
                settings
            }
        }
        `;

        const res = yield call(graphqlClient.requestWithAuth, query);

        let furniture = res.data.data.furniture;
        yield put({ type: actions.FURNITURE.GET.SUCCESS, payload: furniture });
    } catch (error) {
        yield put({ type: actions.FURNITURE.GET.FAIL, payload: error.message })
        if (error instanceof GraphQLError) {
            notification.error({ message: 'Error! \n ' + error.message });
            return
        }
        notification.error({ message: 'Error loading furniture! \n Try again later' });
    }
}

function* sendInfo(action) {
    try {
        const query = `
        {
            furnitureSend (id: "${action.payload.id}", email: "${action.payload.email}") {
                sent
            }
        }
        `;

        const res = yield call(graphqlClient.requestWithAuth, query);

        let sent = res.data.data.furnitureSend.sent;
        if (sent == true) {
            yield put({ type: actions.FURNITURE.SEND_INFO.SUCCESS });
            notification.success({ message: 'Email send to ' + action.payload.email });
        } else {
            notification.error({ message: 'Error sending email! \n Try again later' });
        }
    } catch (error) {
        yield put({ type: actions.FURNITURE.SEND_INFO.FAIL, payload: error.message })
        if (error instanceof GraphQLError) {
            notification.error({ message: 'Error! \n ' + error.message });
            return
        }
        notification.error({ message: 'Error sending email! \n Try again later' });
    }
}

function* mySaga() {
    yield takeLatest(actions.FURNITURE.GET_ALL.REQUEST, getAll);
    yield takeLatest(actions.FURNITURE.GET.REQUEST, get);
    yield takeLatest(actions.FURNITURE.SEND_INFO.REQUEST, sendInfo);
}

export default mySaga;