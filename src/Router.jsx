import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import map from 'lodash/map';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import indexOf from 'lodash/indexOf';

const OMIT_ROUTE_RENDER_PROPERTIES = ['render', 'component'];

const omitRouteRenderProperties = route => (
  omit(route, OMIT_ROUTE_RENDER_PROPERTIES)
);

const propTypes = {
  userRole: PropTypes.string,
  authorized: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    exact: PropTypes.bool,
    permission: PropTypes.arrayOf(PropTypes.string),
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
};

const defaultProps = {
  userRole: '',
  authorizedLayout: <div />,
  unAuthorizedLayout: <div />,
};

class Router extends Component {
  checkPermission = permission => (
    indexOf(permission, this.props.userRole) !== -1
  )

  renderRedirectRoute = route => (
    <Route
      key={route.path}
      {...omitRouteRenderProperties(route)}
      render={() => <Redirect to={route.redirect} />}
    />
  );

  renderAuthorizedRoute = (route) => {
    const { authorizedLayout: AuthorizedLayout } = this.props;
    const { permission, path, component: RouteComponent } = route;
    const hasPermission = this.checkPermission(permission);
    if (hasPermission) {
      return (
        <Route
          key={path}
          {...omitRouteRenderProperties(route)}
          render={props => (
            <AuthorizedLayout {...props}>
              <RouteComponent />
            </AuthorizedLayout>
          )}
        />
      );
    }
    return this.renderRedirectRoute(route);
  }

  renderUnAuthorizedRoute = (route) => {
    const { unAuthorizedLayout: UnAuthorizedLayout } = this.props;
    const { redirect, path, component: RouteComponent } = route;

    if (isNil(RouteComponent) && !isNil(redirect)) {
      return this.renderRedirectRoute(route);
    }
    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <UnAuthorizedLayout {...props}>
            <RouteComponent />
          </UnAuthorizedLayout>
        )}
      />
    );
  }

  render() {
    const { unAuthorized, authorized } = this.props;
    return (
      <Switch>
        {map(unAuthorized, route => (
          this.renderUnAuthorizedRoute(route)
        ))}
        {map(authorized, route => (
          this.renderAuthorizedRoute(route)
        ))}
        <Route render={() => <div>404</div>} />
      </Switch>
    );
  }
}

Router.propTypes = propTypes;
Router.defaultProps = defaultProps;
export default Router;
