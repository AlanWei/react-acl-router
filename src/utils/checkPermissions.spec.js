import indexOf from 'lodash/indexOf';
import checkPermissions from './checkPermissions';

test('empty authorities', () => {
  expect(checkPermissions('', [])).toEqual(true);
});

test('array authorities no match', () => {
  expect(checkPermissions(['user'], ['admin'])).toEqual(false);
});

test('array authorities single match', () => {
  expect(checkPermissions(['admin'], ['admin'])).toEqual(true);
});

test('array authorities multiple match', () => {
  expect(checkPermissions(['admin', 'user'], ['admin', 'user'])).toEqual(true);
});

test('string authorities', () => {
  expect(checkPermissions('admin', ['admin', 'user'])).toEqual(true);
});

test('function authorities', () => {
  expect(checkPermissions(permissions => (
    indexOf(permissions, 'admin') !== -1
  ), ['admin', 'user'])).toEqual(true);
});

test('unsupport type of authorities', () => {
  expect(() => checkPermissions(123, ['admin'])).toThrowError('[react-acl-router]: Unsupport type of authorities.');
});
