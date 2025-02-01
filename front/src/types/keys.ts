const queryKeys = {
    AUTH: 'auth',
    GET_ACCESS_TOKEN: 'getAccessToken',
    'GET_PROFILE': 'getProfile',
} as const;

const storageKeys = {
    REFRESH_TOKEN: 'refreshToken',
} as const;

const headerKeys = {
    AUTHORIZATION: 'Authorization',
} as const;

export { headerKeys, queryKeys, storageKeys };

