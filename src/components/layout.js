import React from 'react'
import { Link } from 'react-navi'
import { Layout as LayoutAntd } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Menu } from 'antd'

export default function Layout ({ children }) {

  return (
    <LayoutAntd>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link href='/'>
              Listado de personajes
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          {children}
        </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>By Alonso Palacios 2022</Footer>
    </LayoutAntd>

  )
}
