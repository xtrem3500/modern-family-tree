
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  DASHBOARD: {
    INDEX: '/dashboard',
    PROFILE: '/dashboard/profile',
    TREE: '/dashboard/tree',
    MEMBERS: '/dashboard/members',
    SETTINGS: '/dashboard/settings',
    INVITE: '/dashboard/invite',
  },
  FAMILY: {
    TREE: '/family/tree',
    MEMBERS: '/family/members',
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD.INDEX,
  ROUTES.DASHBOARD.PROFILE,
  ROUTES.DASHBOARD.TREE,
  ROUTES.DASHBOARD.MEMBERS,
  ROUTES.DASHBOARD.SETTINGS,
  ROUTES.DASHBOARD.INVITE,
  ROUTES.FAMILY.TREE,
  ROUTES.FAMILY.MEMBERS,
];
