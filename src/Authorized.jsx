import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import indexOf from 'lodash/indexOf';
import omit from 'lodash/omit';

const propTypes = {
  aclKey: PropTypes.string,
  permissions: PropTypes.arrayOf(PropTypes.string),
  redirectPath: PropTypes.string,
};

const defaultProps = {
  aclKey: '',
  permissions: [],
  redirectPath: '/',
};

class Authorized extends Component {
  checkPermissions = () => {
    const { aclKey, permissions } = this.props;
    return indexOf(permissions, aclKey) !== -1;
  }

  render() {
    const hasPermission = this.checkPermissions();
    const rest = omit(this.props, ['aclKey', 'permissions', 'redirectPath']);
    if (hasPermission) {
      return (
        <Route
          {...rest}
        />
      );
    }
    return <Redirect to={{ pathname: this.props.redirectPath }} />;
  }
}

Authorized.propTypes = propTypes;
Authorized.defaultProps = defaultProps;
export default Authorized;
