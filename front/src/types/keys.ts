const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
  POST: 'post',
  GET_POST: 'getPost',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

const headerKeys = {
  AUTHORIZATION: 'Authorization',
} as const;

export { headerKeys, queryKeys, storageKeys };
