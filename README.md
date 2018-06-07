# react-acl-router

[![npm v](https://img.shields.io/npm/v/react-acl-router.svg)](https://www.npmjs.com/package/react-acl-router)
[![npm dm](https://img.shields.io/npm/dm/react-acl-router.svg)](https://www.npmjs.com/package/react-acl-router)

Router with Access Control for React Applications.

## Installation

```bash
yarn add react-acl-router react react-router-dom lodash
```

## Usage

### AclRouter
| Property           | Description                                    | Type                             | Default                       |
| ------------------ | ---------------------------------------------- | -------------------------------- | ----------------------------- |
| authorities        | permissions of current user                    | OneOfType([string, array, func]) | ''                            |
| authorizedRoutes   | array of routes needs permissions              | arrayOf(AuthorizedRoute)         | []                            |
| authorizedLayout   | container of all authorized routes             | function                         | `<div>{props.children}</div>` |
| normalRoutes       | array of routes don't need permissions         | arrayOf(NormalRoute)             | []                            |
| normalLayout       | container of all routes don't need permissions | function                         | `<div>{props.children}</div>` |
| notFound           | element to show when route doesn't match       | function                         | `<div>404</div>`              |

### AuthorizedRoute
with all react-router `<Route />` supported props except `render` because `react-acl-router` will overwrite the `render` prop.

| Property     | Description                                                      | Type            | Default  |
| ------------ | ---------------------------------------------------------------- | --------------- | -------- |
| path         | route's full path                                                | string          | -        |
| permissions  | array of roles which have permission like ['god', 'admin' ]      | arrayOf(string) | -        |
| component    | route's component                                                | function        | -        |
| unauthorized | unauthorized view component if authorities don't have permission | string          | -        |
| redirect     | redirect path if authorities don't have permission               | string          | -        |

### NormalRoute (with react-router Route's all supported props)
with all react-router `<Route />` supported props except `render` because `react-acl-router` will overwrite the `render` prop.

| Property    | Description                        | Type            | Default  |
| ----------- | ---------------------------------- | --------------- | -------- |
| path        | route's full path                  | string          | -        |
| redirect    | redirect route path to other route | string          | -        |
| component   | route's component                  | function        | -        |

## Example
```javascript
import AclRouter from 'react-acl-router';
import BasicLayout from 'layouts/BasicLayout';
import NormalLayout from 'layouts/NormalLayout';
import Login from 'views/login';
import WorkInProgress from 'views/workInProgress';
import Unauthorized from 'views/unauthorized';

const authorizedRoutes = [{
  path: '/dashboard/analysis/realtime',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
}, {
  path: '/dashboard/analysis/offline',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
}, {
  path: '/dashboard/workplace',
  exact: true,
  permissions: ['admin', 'user'],
  redirect: '/login',
  component: WorkInProgress,
}, {
  path: '/exception/403',
  exact: true,
  permissions: ['god'],
  component: WorkInProgress,
  unauthorized: Unauthorized,
}];

const normalRoutes = [{
  path: '/',
  exact: true,
  redirect: '/dashboard/analysis/realtime',
}, {
  path: '/login',
  exact: true,
  component: Login,
}];

const Router = (props) => (
  <AclRouter
    // sync user authorities with the user data in your application
    authorities={props.user.authorities}
    authorizedRoutes={authorizedRoutes}
    authorizedLayout={BasicLayout}
    normalRoutes={unAuthorizedRoutes}
    normalLayout={NormalLayout}
    notFound={() => <div>Page Not Found</div>}
  />
);

export default Router;
```

## Notes
* For normal route, `redirect` or `unauthorized` and `component` are exclusive since normally you won't redirect user to another path while you have a valid component to render.