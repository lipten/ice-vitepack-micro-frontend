import React, { createElement } from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link } from 'ice';
import { renderRoutes } from 'react-router-config';
import { asideMenuConfig } from './menuConfig';

const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: createElement(icon),
    children: children && loopMenuItem(children),
  }));

export default function BasicLayout({ route, location }) {
  return (
    <ProLayout
      title="icejs & antd"
      style={{
        minHeight: '100vh',
      }}
      location={{
        pathname: location.pathname,
      }}
      menuDataRender={() => loopMenuItem(asideMenuConfig)}
      menuItemRender={(item, defaultDom) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
      footerRender={() => (
        <DefaultFooter
          links={[
            {
              key: 'icejs',
              title: 'icejs',
              href: 'https://github.com/ice-lab/icejs',
            },
            {
              key: 'antd',
              title: 'antd',
              href: 'https://github.com/ant-design/ant-design',
            },
          ]}
          copyright="by icejs & antd"
        />
      )}
    >
      <div style={{ minHeight: '60vh' }}>{renderRoutes(route.routes)}</div>
    </ProLayout>
  );
}
