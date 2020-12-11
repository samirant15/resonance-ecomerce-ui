import React from 'react';
import { connect } from 'react-redux';
import * as furnitureActions from '../redux/furniture/furnitureActions';
import Catalog from '../screens/Catalog';

const CatalogContainer = (props) => (
    <Catalog {...props} />
);

const mapDispatchToProps = (dispatch) => {
    return {
        getFurniture: (id) => dispatch(furnitureActions.get(id)),
        getAllFurnitures: (offset) => dispatch(furnitureActions.getAll(offset)),
        sendInfo: (id, email) => dispatch(furnitureActions.sendInfo(id, email)),
    }
}

const mapStateToProps = (state) => {
    return {
        furniture: state.furnitureReducer.furniture,
        furnitures: state.furnitureReducer.furnitures ? (state.furnitureReducer.furnitures.records || []) : [],
        offset: state.furnitureReducer.furnitures ? (state.furnitureReducer.furnitures.offset || null) : null,
        loggedUser: state.userReducer.loggedUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContainer);