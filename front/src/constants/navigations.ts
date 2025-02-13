const mainNavigations = {
  MAP_HOME: 'MapStackNavigation',
  FEED_HOME: 'FeedStackNavigation',
  CALENDAR_HOME: 'CalendarHome',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
} as const;

export { authNavigations, feedNavigations, mainNavigations, mapNavigations };
