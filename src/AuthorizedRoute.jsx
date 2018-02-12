import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import map from 'lodash/map';
import Authorized from './Authorized.jsx';

const propTypes = {
  BasicLayout: PropTypes.func,
  routes: PropTypes.array,
  redirectPath: PropTypes.string,
  permissions: PropTypes.array,
};

const defaultProps = {
  BasicLayout: () => <div />,
  routes: [],
  redirectPath: '/',
  permissions: [],
};

class AuthorizedRoute extends Component {
  render() {
    const {
      BasicLayout,
      routes,
      redirectPath,
      permissions,
    } = this.props;

    return (
      <BasicLayout>
        <Switch>
          {map(routes, route => (
            <Authorized
              {...route}
              permissions={permissions}
              redirectPath={redirectPath}
            />
          ))}
        </Switch>
      </BasicLayout>
    );
  }
}

AuthorizedRoute.propTypes = propTypes;
AuthorizedRoute.defaultProps = defaultProps;
export default AuthorizedRoute;
