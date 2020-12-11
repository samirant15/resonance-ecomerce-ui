import { generateTypes } from '../core/typeGenerator';

export const FURNITURE = generateTypes(['GET_ALL', 'GET', 'SELECT'], 'FURNITURE');

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