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
  normalRoutes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    redirect: PropTypes.string,
    component: PropTypes.func,
  })),
  normalLayout: PropTypes.func,
  authorizedRoutes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    permissions: PropTypes.arrayOf(PropTypes.string),
    redirect: PropTypes.string,
    component: PropTypes.func,
  })),
  authorizedLayout: PropTypes.func,
  notFound: PropTypes.func,
};

const defaultProps = {
  authorities: '',
  normalRoutes: [],
  normalLayout: DefaultLayout,
  authorizedRoutes: [],
  authorizedLayout: DefaultLayout,
  notFound: DefaultNotFound,
};

class AclRouter extends Component {
  static getDerivedStateFromProps(nextProps) {
    return {
      authorities: nextProps.authorities,
    };
  }

  state = {
    authorities: this.props.authorities,
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.authorities !== prevProps.authorities) {
      this.setState({
        authorities: this.props.authorities,
      });
    }
  }

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
    const { authorizedLayout: AuthorizedLayout } = this.props;
    const { authorities } = this.state;
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
    const { normalLayout: NormalLayout } = this.props;
    const { redirect, path, component: RouteComponent } = route;

    // check if current route is a redirect route (doesn't have component but redirect path)
    if (isNil(RouteComponent) && !isNil(redirect)) {
      return this.renderRedirectRoute(route);
    }

    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <NormalLayout {...props}>
            <RouteComponent {...props} />
          </NormalLayout>
        )}
      />
    );
  }

  renderNotFoundRoute = () => {
    const { notFound: NotFound } = this.props;
    return (
      <Route
        render={props => (
          <NotFound {...props} />
        )}
      />
    );
  }

  render() {
    const { normalRoutes, authorizedRoutes } = this.props;
    return (
      <Switch>
        {map(normalRoutes, route => (
          this.renderUnAuthorizedRoute(route)
        ))}
        {map(authorizedRoutes, route => (
          this.renderAuthorizedRoute(route)
        ))}
        {this.renderNotFoundRoute()}
      </Switch>
    );
  }
}

AclRouter.propTypes = propTypes;
AclRouter.defaultProps = defaultProps;
export default AclRouter;
