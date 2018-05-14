import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import indexOf from 'lodash/indexOf';

const checkPermissions = (authorities, permissions) => {
  if (isArray(authorities)) {
    let hasPermission = false;
    for (let i = 0; i < authorities.length; i += 1) {
      if (indexOf(permissions, authorities[i]) !== -1) {
        hasPermission = true;
        break;
      }
    }
    return hasPermission;
  }

  if (isString(authorities)) {
    return indexOf(permissions, authorities) !== -1;
  }

  if (isFunction(authorities)) {
    return authorities(permissions);
  }

  return true;
};

export default checkPermissions;
