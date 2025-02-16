const MIN = 60 * 1000;

const numbers = {
  ACCESS_TOKEN_REFRESH_TIME: 30 * MIN - 3 * MIN,
  INITIAL_REGION: {
    latitudeDelta: 0.0173,
    longitudeDelta: 0.0022,
  },
} as const;

export { numbers };
