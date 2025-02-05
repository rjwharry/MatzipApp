const mainNavigations = {
  MAP_HOME: 'MapStackNavigation',
  FEED_HOME: 'FeedHome',
  CALENDAR_HOME: 'CalendarHome',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
} as const;

export { authNavigations, mainNavigations, mapNavigations };
