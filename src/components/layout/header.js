import React from 'react';
import { PageHeader, Divider } from 'antd';
export default function Header({
  title = 'Ultra',
  slogan = 'Hello World!',
  extra = null,
  children = null,
}) {
  return (
    <PageHeader
      title={
        <React.Fragment>
          {title}
          {slogan ? (
            <React.Fragment>
              <Divider type="vertical" />
              {slogan}
            </React.Fragment>
          ) : null}
        </React.Fragment>
      }
      subTitle="控制面板"
      extra={extra}
    >
      {children}
    </PageHeader>
  );
}
