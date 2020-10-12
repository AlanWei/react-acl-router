import React from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => <>{children}</>;

DefaultLayout.propTypes = {
  children: PropTypes.element,
};

DefaultLayout.defaultProps = {
  children: <></>,
};

export default DefaultLayout;
