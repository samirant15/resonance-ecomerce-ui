import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import Login from '../containers/LoginContainer';
import Catalog from '../screens/Catalog';
import SignUp from '../containers/SignUpContainer';

export const routes = {
    login: {
        path: '/',
        title: 'Login',
        icon: null,
        showOnSider: false,
        noSider: true,
        noUser: true,
        content: <Login />,
    },
    signup: {
        path: '/signup',
        title: 'Sign Up',
        icon: null,
        showOnSider: false,
        noSider: true,
        noUser: true,
        content: <SignUp />,
    },
    catalog: {
        path: '/catalog',
        title: 'Catalog',
        icon: <ShoppingOutlined />,
        showOnSider: true,
        noFooter: true,
        content: <Catalog />,
    },
};

const notFoundRedirectPath = routes.login.path;
export const mainScreen = routes.catalog.path;
export const unsecuredRoutes = [
    routes.login.path,
    routes.signup.path,
];

export function onNotFoundRedirect(path) {
    if (!routesArray().find((r, i) => r.path === path))
        window.location = notFoundRedirectPath;
}

export function routesArray() {
    let arr = [];
    for (var [i, route] of Object.entries(routes)) {
        if (route.subMenu && route.subMenu === true) {
            for (var [i, subroute] of Object.entries(route.routes))
                arr = [...arr, { ...subroute, parentTitle: route.title }];
        } else {
            arr = [...arr, route];
        }
    }
    return arr;
}
