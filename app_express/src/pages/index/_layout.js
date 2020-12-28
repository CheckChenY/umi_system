import React,{ Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon,Button } from 'antd';
import MenuSide from '@com/menu';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;
const BasicLayout = (list) => {
    return (
        <Layout>
            <Header>
                dfgsdfsddddddddddddd
            </Header>
            <Layout>
                <MenuSide />
                <Content style={{ margin: '10px 10px 0',marginLeft:210, }}>
                    <div style={{ padding:5,background: '#fff', minHeight: 360 }}>
                        {list.children}
                    </div>
                </Content>
                <Footer style={{  position: 'fixed',bottom:0,left:200,textAlign: 'center', width: '100%' }}>Footer</Footer>
            </Layout>
        </Layout>
    )
}

export default connect(({list,dispatch})=>{
    return {
        list,
        dispatch
    }
})(BasicLayout);