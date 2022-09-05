import React, { createElement } from 'react';
import { renderRoutes } from 'react-router-config';

export default function BasicLayout({ route, location }) {
  return renderRoutes(route.routes);
}
