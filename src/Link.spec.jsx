import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink, Link } from 'react-router-dom';
import AclLink from './Link';

jest.mock('react-router-dom');

configure({ adapter: new Adapter() });

const contextValue = {
  authorities: ['admin'],
  authorizedRoutes: [
    {
      path: '/auth',
      permissions: ['admin', 'owner'],
      redirect: '/',
      component: () => <div />,
    },
  ],
  normalRoutes: [
    {
      path: '/',
      component: () => <div />,
    },
  ],
};

describe('AclRouterLink', () => {
  it('should choose a the Link component by default', () => {
    const outer = shallow(<AclLink to="/auth">Foo</AclLink>);
    const Children = outer.props().children(contextValue);
    expect(Children.type).toEqual(Link);
  });

  it('should choose a the NavLink component by default', () => {
    const outer = shallow(<AclLink nav to="/auth">Foo</AclLink>);
    const Children = outer.props().children(contextValue);
    expect(Children.type).toEqual(NavLink);
  });

  it('should return null if there is no permssion for the link', () => {
    contextValue.authorities = [];
    const outer = shallow(<AclLink nav to="/auth">Foo</AclLink>);
    const Children = outer.props().children(contextValue);
    expect(Children).toEqual(null);
  });

  it('should return link for normal routes', () => {
    contextValue.authorities = [];
    const outer = shallow(<AclLink nav to="/">Foo</AclLink>);
    const Children = outer.props().children(contextValue);
    expect(Children.type).toEqual(NavLink);
  });
});
