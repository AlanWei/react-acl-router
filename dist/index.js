'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactRouterDom = require('react-router-dom');
var indexOf = _interopDefault(require('lodash/indexOf'));
var omit = _interopDefault(require('lodash/omit'));
var map = _interopDefault(require('lodash/map'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var propTypes = {
  aclKey: PropTypes.string,
  permissions: PropTypes.arrayOf(PropTypes.string),
  redirectPath: PropTypes.string
};

var defaultProps = {
  aclKey: '',
  permissions: [],
  redirectPath: '/'
};

var Authorized = function (_Component) {
  inherits(Authorized, _Component);

  function Authorized() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Authorized);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Authorized.__proto__ || Object.getPrototypeOf(Authorized)).call.apply(_ref, [this].concat(args))), _this), _this.checkPermissions = function () {
      var _this$props = _this.props,
          aclKey = _this$props.aclKey,
          permissions = _this$props.permissions;

      return indexOf(permissions, aclKey) !== -1;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Authorized, [{
    key: 'render',
    value: function render() {
      var hasPermission = this.checkPermissions();
      var rest = omit(this.props, ['aclKey', 'permissions', 'redirectPath']);
      if (hasPermission) {
        return React__default.createElement(reactRouterDom.Route, rest);
      }
      return React__default.createElement(reactRouterDom.Redirect, { to: { pathname: this.props.redirectPath } });
    }
  }]);
  return Authorized;
}(React.Component);

Authorized.propTypes = propTypes;
Authorized.defaultProps = defaultProps;

var propTypes$1 = {
  BasicLayout: PropTypes.func,
  routes: PropTypes.array,
  redirectPath: PropTypes.string,
  permissions: PropTypes.array
};

var defaultProps$1 = {
  BasicLayout: function BasicLayout() {
    return React__default.createElement('div', null);
  },
  routes: [],
  redirectPath: '/',
  permissions: []
};

var AuthorizedRoute = function (_Component) {
  inherits(AuthorizedRoute, _Component);

  function AuthorizedRoute() {
    classCallCheck(this, AuthorizedRoute);
    return possibleConstructorReturn(this, (AuthorizedRoute.__proto__ || Object.getPrototypeOf(AuthorizedRoute)).apply(this, arguments));
  }

  createClass(AuthorizedRoute, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          BasicLayout = _props.BasicLayout,
          routes = _props.routes,
          redirectPath = _props.redirectPath,
          permissions = _props.permissions;


      return React__default.createElement(
        BasicLayout,
        null,
        React__default.createElement(
          reactRouterDom.Switch,
          null,
          map(routes, function (route) {
            return React__default.createElement(Authorized, _extends({}, route, {
              permissions: permissions,
              redirectPath: redirectPath
            }));
          })
        )
      );
    }
  }]);
  return AuthorizedRoute;
}(React.Component);

AuthorizedRoute.propTypes = propTypes$1;
AuthorizedRoute.defaultProps = defaultProps$1;

module.exports = AuthorizedRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9BdXRob3JpemVkLmpzeCIsIi4uL3NyYy9BdXRob3JpemVkUm91dGUuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUm91dGUsIFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgaW5kZXhPZiBmcm9tICdsb2Rhc2gvaW5kZXhPZic7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gvb21pdCc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgYWNsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwZXJtaXNzaW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gIHJlZGlyZWN0UGF0aDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgYWNsS2V5OiAnJyxcbiAgcGVybWlzc2lvbnM6IFtdLFxuICByZWRpcmVjdFBhdGg6ICcvJyxcbn07XG5cbmNsYXNzIEF1dGhvcml6ZWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjaGVja1Blcm1pc3Npb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgYWNsS2V5LCBwZXJtaXNzaW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gaW5kZXhPZihwZXJtaXNzaW9ucywgYWNsS2V5KSAhPT0gLTE7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaGFzUGVybWlzc2lvbiA9IHRoaXMuY2hlY2tQZXJtaXNzaW9ucygpO1xuICAgIGNvbnN0IHJlc3QgPSBvbWl0KHRoaXMucHJvcHMsIFsnYWNsS2V5JywgJ3Blcm1pc3Npb25zJywgJ3JlZGlyZWN0UGF0aCddKTtcbiAgICBpZiAoaGFzUGVybWlzc2lvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFJvdXRlXG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXt7IHBhdGhuYW1lOiB0aGlzLnByb3BzLnJlZGlyZWN0UGF0aCB9fSAvPjtcbiAgfVxufVxuXG5BdXRob3JpemVkLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkF1dGhvcml6ZWQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuZXhwb3J0IGRlZmF1bHQgQXV0aG9yaXplZDtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgbWFwIGZyb20gJ2xvZGFzaC9tYXAnO1xuaW1wb3J0IEF1dGhvcml6ZWQgZnJvbSAnLi9BdXRob3JpemVkLmpzeCc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgQmFzaWNMYXlvdXQ6IFByb3BUeXBlcy5mdW5jLFxuICByb3V0ZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgcmVkaXJlY3RQYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwZXJtaXNzaW9uczogUHJvcFR5cGVzLmFycmF5LFxufTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBCYXNpY0xheW91dDogKCkgPT4gPGRpdiAvPixcbiAgcm91dGVzOiBbXSxcbiAgcmVkaXJlY3RQYXRoOiAnLycsXG4gIHBlcm1pc3Npb25zOiBbXSxcbn07XG5cbmNsYXNzIEF1dGhvcml6ZWRSb3V0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBCYXNpY0xheW91dCxcbiAgICAgIHJvdXRlcyxcbiAgICAgIHJlZGlyZWN0UGF0aCxcbiAgICAgIHBlcm1pc3Npb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCYXNpY0xheW91dD5cbiAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICB7bWFwKHJvdXRlcywgcm91dGUgPT4gKFxuICAgICAgICAgICAgPEF1dGhvcml6ZWRcbiAgICAgICAgICAgICAgey4uLnJvdXRlfVxuICAgICAgICAgICAgICBwZXJtaXNzaW9ucz17cGVybWlzc2lvbnN9XG4gICAgICAgICAgICAgIHJlZGlyZWN0UGF0aD17cmVkaXJlY3RQYXRofVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Td2l0Y2g+XG4gICAgICA8L0Jhc2ljTGF5b3V0PlxuICAgICk7XG4gIH1cbn1cblxuQXV0aG9yaXplZFJvdXRlLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkF1dGhvcml6ZWRSb3V0ZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5leHBvcnQgZGVmYXVsdCBBdXRob3JpemVkUm91dGU7XG4iXSwibmFtZXMiOlsicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiYXJyYXlPZiIsImRlZmF1bHRQcm9wcyIsIkF1dGhvcml6ZWQiLCJjaGVja1Blcm1pc3Npb25zIiwicHJvcHMiLCJhY2xLZXkiLCJwZXJtaXNzaW9ucyIsImluZGV4T2YiLCJoYXNQZXJtaXNzaW9uIiwicmVzdCIsIm9taXQiLCJSZWFjdCIsIlJvdXRlIiwiUmVkaXJlY3QiLCJwYXRobmFtZSIsInJlZGlyZWN0UGF0aCIsIkNvbXBvbmVudCIsImZ1bmMiLCJhcnJheSIsIkF1dGhvcml6ZWRSb3V0ZSIsIkJhc2ljTGF5b3V0Iiwicm91dGVzIiwicm91dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsSUFBTUEsWUFBWTtVQUNSQyxVQUFVQyxNQURGO2VBRUhELFVBQVVFLE9BQVYsQ0FBa0JGLFVBQVVDLE1BQTVCLENBRkc7Z0JBR0ZELFVBQVVDO0NBSDFCOztBQU1BLElBQU1FLGVBQWU7VUFDWCxFQURXO2VBRU4sRUFGTTtnQkFHTDtDQUhoQjs7SUFNTUM7Ozs7Ozs7Ozs7Ozs7OzZMQUNKQyxtQkFBbUIsWUFBTTt3QkFDUyxNQUFLQyxLQURkO1VBQ2ZDLE1BRGUsZUFDZkEsTUFEZTtVQUNQQyxXQURPLGVBQ1BBLFdBRE87O2FBRWhCQyxRQUFRRCxXQUFSLEVBQXFCRCxNQUFyQixNQUFpQyxDQUFDLENBQXpDOzs7Ozs7NkJBR087VUFDREcsZ0JBQWdCLEtBQUtMLGdCQUFMLEVBQXRCO1VBQ01NLE9BQU9DLEtBQUssS0FBS04sS0FBVixFQUFpQixDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLGNBQTFCLENBQWpCLENBQWI7VUFDSUksYUFBSixFQUFtQjtlQUVmRyw2QkFBQ0Msb0JBQUQsRUFDTUgsSUFETixDQURGOzthQU1LRSw2QkFBQ0UsdUJBQUQsSUFBVSxJQUFJLEVBQUVDLFVBQVUsS0FBS1YsS0FBTCxDQUFXVyxZQUF2QixFQUFkLEdBQVA7Ozs7RUFoQnFCQzs7QUFvQnpCZCxXQUFXTCxTQUFYLEdBQXVCQSxTQUF2QjtBQUNBSyxXQUFXRCxZQUFYLEdBQTBCQSxZQUExQjs7QUNqQ0EsSUFBTUosY0FBWTtlQUNIQyxVQUFVbUIsSUFEUDtVQUVSbkIsVUFBVW9CLEtBRkY7Z0JBR0ZwQixVQUFVQyxNQUhSO2VBSUhELFVBQVVvQjtDQUp6Qjs7QUFPQSxJQUFNakIsaUJBQWU7ZUFDTjtXQUFNVSx5Q0FBTjtHQURNO1VBRVgsRUFGVztnQkFHTCxHQUhLO2VBSU47Q0FKZjs7SUFPTVE7Ozs7Ozs7Ozs7NkJBQ0s7bUJBTUgsS0FBS2YsS0FORjtVQUVMZ0IsV0FGSyxVQUVMQSxXQUZLO1VBR0xDLE1BSEssVUFHTEEsTUFISztVQUlMTixZQUpLLFVBSUxBLFlBSks7VUFLTFQsV0FMSyxVQUtMQSxXQUxLOzs7YUFTTEs7bUJBQUE7OzsrQkFDRTs7Y0FDT1UsTUFBSixFQUFZO21CQUNYViw2QkFBQyxVQUFELGVBQ01XLEtBRE47MkJBRWVoQixXQUZmOzRCQUdnQlM7ZUFKTDtXQUFaOztPQUhQOzs7O0VBVDBCQzs7QUF5QjlCRyxnQkFBZ0J0QixTQUFoQixHQUE0QkEsV0FBNUI7QUFDQXNCLGdCQUFnQmxCLFlBQWhCLEdBQStCQSxjQUEvQjs7OzsifQ==
