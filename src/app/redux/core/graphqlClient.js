import { request, authRequest } from "./restClient";
import GraphQLError from '../../exceptions/GraphQLError';

const APP_ROOT = process.env.REACT_APP_DOMAIN + '/graphql';

export const plainRequest = async (query) => {
    const res = await request(APP_ROOT, `POST`, { query });

    if (res.data && res.data.errors && res.data.errors.length > 0) {
        let errors = '';
        for (const error of res.data.errors) {
            errors += error.message + '\n'
        }
        throw new GraphQLError(errors);
    }
    return res;
}

export const requestWithAuth = async (query) => {
    const res = authRequest(APP_ROOT, `POST`, { query }, null);

    if (res.data && res.data.errors && res.data.errors.length > 0) {
        let errors = '';
        for (const error of res.data.errors) {
            errors += error.message + '\n'
        }
        throw new GraphQLError(errors);
    }
    return res;
}