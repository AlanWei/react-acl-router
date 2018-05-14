import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import omitRouteRenderProperties from './utils/omitRouteRenderProperties';
import checkPermissions from './utils/checkPermissions';
import DefaultLayout from './DefaultLayout';
import DefaultNotFound from './DefaultNotFound';

const propTypes = {
  authorities: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  authorized: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    exact: PropTypes.bool,
    permissions: PropTypes.arrayOf(PropTypes.string),
    redirect: PropTypes.string,
    component: PropTypes.func,
  })).isRequired,
  authorizedLayout: PropTypes.func,
  unAuthorized: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    exact: PropTypes.bool,
    redirect: PropTypes.string,
    component: PropTypes.func,
  })).isRequired,
  unAuthorizedLayout: PropTypes.func,
  notFound: PropTypes.func,
};

const defaultProps = {
  authorities: '',
  authorizedLayout: DefaultLayout,
  unAuthorizedLayout: DefaultLayout,
  notFound: DefaultNotFound,
};

class Router extends Component {
  renderRedirectRoute = route => (
    <Route
      key={route.path}
      {...omitRouteRenderProperties(route)}
      render={() => <Redirect to={route.redirect} />}
    />
  );

  /**
   * props pass to Layout & Component are history, location, match
   */
  renderAuthorizedRoute = (route) => {
    const { authorizedLayout: AuthorizedLayout, authorities } = this.props;
    const { permissions, path, component: RouteComponent } = route;
    const hasPermission = checkPermissions(authorities, permissions);

    // redirect if there is no permission
    if (!hasPermission) {
      return this.renderRedirectRoute(route);
    }

    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <AuthorizedLayout {...props}>
            <RouteComponent {...props} />
          </AuthorizedLayout>
        )}
      />
    );
  }

  /**
   * props pass to Layout & Component are history, location, match
   */
  renderUnAuthorizedRoute = (route) => {
    const { unAuthorizedLayout: UnAuthorizedLayout } = this.props;
    const { redirect, path, component: RouteComponent } = route;

    // check if current route is a redirect route
    if (isNil(RouteComponent) && !isNil(redirect)) {
      return this.renderRedirectRoute(route);
    }

    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <UnAuthorizedLayout {...props}>
            <RouteComponent {...props} />
          </UnAuthorizedLayout>
        )}
      />
    );
  }

  render() {
    const { unAuthorized, authorized, notFound: NotFound } = this.props;
    return (
      <Switch>
        {map(unAuthorized, route => (
          this.renderUnAuthorizedRoute(route)
        ))}
        {map(authorized, route => (
          this.renderAuthorizedRoute(route)
        ))}
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    );
  }
}

Router.propTypes = propTypes;
Router.defaultProps = defaultProps;
export default Router;
