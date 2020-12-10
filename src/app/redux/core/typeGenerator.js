export function generateTypes(subTypes, typeName) {
    let types = {};
    for (var sub of subTypes) {
        types = {
            ...types,
            [sub]: {
                REQUEST: sub + '_' + typeName + '_REQUEST',
                SUCCESS: sub + '_' + typeName + '_SUCCESS',
                FAIL: sub + '_' + typeName + '_FAIL',
            }
        }
    }
    return types;
}
