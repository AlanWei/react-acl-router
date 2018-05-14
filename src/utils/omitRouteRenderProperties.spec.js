import omitRouteRenderProperties from './omitRouteRenderProperties';

test('empty authorities', () => {
  expect(omitRouteRenderProperties({
    path: '/',
    component: '123',
    render: () => {},
  })).toEqual({
    path: '/',
  });
});
