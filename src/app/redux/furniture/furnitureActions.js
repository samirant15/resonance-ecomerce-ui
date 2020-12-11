import { generateTypes } from '../core/typeGenerator';

export const FURNITURE = generateTypes(['GET_ALL', 'GET', 'SEND_INFO'], 'FURNITURE');

export const getAll = (offset) => {
    return {
        type: FURNITURE.GET_ALL.REQUEST,
        payload: { offset }
    }
}

export const get = (id) => {
    return {
        type: FURNITURE.GET.REQUEST,
        payload: { id }
    }
}

export const sendInfo = (id, email) => {
    return {
        type: FURNITURE.SEND_INFO.REQUEST,
        payload: { id, email }
    }
}