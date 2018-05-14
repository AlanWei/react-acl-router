import omit from 'lodash/omit';

const OMIT_ROUTE_RENDER_PROPERTIES = ['render', 'component'];

const omitRouteRenderProperties = route => (
  omit(route, OMIT_ROUTE_RENDER_PROPERTIES)
);

export default omitRouteRenderProperties;
