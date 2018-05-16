import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import indexOf from 'lodash/indexOf';

const checkPermissions = (authorities, permissions) => {
  if (isEmpty(permissions)) {
    return true;
  }

  if (isArray(authorities)) {
    for (let i = 0; i < authorities.length; i += 1) {
      if (indexOf(permissions, authorities[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  if (isString(authorities)) {
    return indexOf(permissions, authorities) !== -1;
  }

  if (isFunction(authorities)) {
    return authorities(permissions);
  }

  throw new Error('[react-acl-router]: Unsupport type of authorities.');
};

export default checkPermissions;
