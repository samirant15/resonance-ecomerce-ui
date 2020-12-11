import * as actions from './furnitureActions';

const INIT_STATE = {
    furniture: null,
    furnitures: {
        records: [],
        offset: null,
    },
    loading: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        // GET ALL
        case actions.FURNITURE.GET_ALL.REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actions.FURNITURE.GET_ALL.SUCCESS:
            return {
                ...state,
                loading: false,
                furnitures: {
                    records: [...state.furnitures.records, ...action.payload.records],
                    offset: action.payload.offset
                }
            }
        case actions.FURNITURE.GET_ALL.FAIL:
            return {
                ...state,
                loading: false,
            }
        // GET
        case actions.FURNITURE.GET.REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actions.FURNITURE.GET.SUCCESS:
            return {
                ...state,
                loading: false,
                furniture: action.payload
            }
        case actions.FURNITURE.GET.FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}