import React from 'react';
import router from 'umi/router';
import { Menu, Icon, Typography, Tag, Dropdown, PageHeader, Button, Row } from 'antd';
import useMenu from '../../components/Hooks/useMenu';

const { Paragraph } = Typography;

const DropdownMenu = () => {
  return (
    <Dropdown
      key="more"
      overlay={
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              文件管理
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              3rd menu item
            </a>
          </Menu.Item>
        </Menu>
      }
    >
      <Button
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        <Icon
          type="ellipsis"
          style={{
            fontSize: 20,
            verticalAlign: 'top',
          }}
        />
      </Button>
    </Dropdown>
  );
};
const Content = ({ children, extraContent }) => {
  return (
    <Row className="content" type="flex">
      <div className="main" style={{ flex: 1 }}>
        {children}
      </div>
      <div
        className="extra"
        style={{
          marginLeft: 80,
        }}
      >
        {extraContent}
      </div>
    </Row>
  );
};
const IconLink = ({ src, text, onClick = () => {} }) => (
  <Button
    style={{
      marginRight: 16,
      display: 'flex',
      alignItems: 'center',
    }}
    onClick={onClick}
  >
    <img
      style={{
        marginRight: 8,
      }}
      src={src}
      alt="start"
    />
    {text}
  </Button>
);

const Dashboard = props => {
  const { render } = useMenu();
  return (
    <section>
      <PageHeader
        title="Title"
        subTitle="This is a subtitle"
        tags={<Tag color="blue">Running</Tag>}
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
          <DropdownMenu key="more" />,
        ]}
        avatar={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}
        breadcrumb={{
          routes: [
            {
              path: 'index',
              breadcrumbName: 'First-level Menu',
            },
            {
              path: 'first',
              breadcrumbName: 'Second-level Menu',
            },
            {
              path: 'second',
              breadcrumbName: 'Third-level Menu',
            },
          ],
        }}
      >
        {render}
        <Content
          extraContent={
            <img
              src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
              alt="content"
            />
          }
        >
          <div className="content">
            <Paragraph>
              Ant Design interprets the color system into two levels: a system-level color system
              and a product-level color system.
            </Paragraph>
            <Paragraph>
              Ant Design&#x27;s design team preferred to design with the HSB color model, which
              makes it easier for designers to have a clear psychological expectation of color when
              adjusting colors, as well as facilitate communication in teams.
            </Paragraph>
            <Row className="contentLink" type="flex">
              <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                text="Quick Start"
                onClick={() => {
                  router.push('/admin');
                }}
              />
              <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                text=" Product Info"
                onClick={() => {
                  router.push('/admin/competition');
                }}
              />
              <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                text="Product Doc"
                onClick={() => {
                  router.push('/admin/competition/create');
                }}
              />
            </Row>
          </div>
        </Content>
      </PageHeader>
    </section>
  );
};
export default Dashboard;
