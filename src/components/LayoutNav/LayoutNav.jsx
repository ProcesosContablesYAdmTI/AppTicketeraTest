import React from 'react';
import { HomeOutlined, FormOutlined, FileSearchOutlined, MessageOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import './LayoutNav.css'

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {key: 1, icon: <HomeOutlined />, label: <NavLink to="/">Home</NavLink>},
  {key: 2, icon: <FormOutlined/>, label: <NavLink to="/form">Nueva Solicitud</NavLink>},
  {key: 3, icon: <FileSearchOutlined/>, label: <NavLink to="/history">Historial</NavLink>},
  {key: 4, icon: <MessageOutlined />, label: <NavLink to="/chat">Chat</NavLink>}
]

  function LayoutNav() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (

    <Layout style={{ minHeight: '100vh' }}>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
    <Layout>
      {/* <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      /> */}
      <Content
         style={{
         margin: '24px 16px 0',
         }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            // background: colorBgContainer,
          }}
        >
          <Outlet/>
          {/* { contentComponent} */}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Universidad de los Andes ©2023 Procesos Centrales
      </Footer>
    </Layout>
  </Layout>



  )
}

export default LayoutNav