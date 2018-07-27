import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { intersection } from 'lodash';
import AclRouterContext from './AclRouterContext';

function shouldLinkBeRendered(context, to) {
  const { authorities, authorizedRoutes, normalRoutes } = context;
  let foundRoute = normalRoutes.find((route) => {
    if (route.exact) {
      return route.path === to;
    }
    return route.path.includes(to);
  });
  if (foundRoute) {
    return true;
  }
  foundRoute = authorizedRoutes.find((route) => {
    if (route.exact) {
      return route.path === to;
    }
    return route.path.includes(to);
  });
  const roleHits = intersection(foundRoute.permissions, authorities);
  return (roleHits.length > 0);
}

const AclRouterLink = props => (
  <AclRouterContext.Consumer>
    {(context) => {
      if (shouldLinkBeRendered(context, props.to)) {
        return props.nav ? <NavLink {...props} /> : <Link {...props} />;
      }
        return null;
    }}
  </AclRouterContext.Consumer>
);

AclRouterLink.propTypes = {
  to: PropTypes.string.isRequired,
  nav: PropTypes.bool,
};

AclRouterLink.defaultProps = {
  nav: false,
};

export default AclRouterLink;
