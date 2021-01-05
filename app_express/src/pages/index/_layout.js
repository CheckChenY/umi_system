import { useState } from 'react';
import { connect } from 'dva';
import { Layout,Button } from 'antd';
import MenuSide from '@com/menu';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Content } = Layout;

// const SubMenu = Menu.SubMenu;
const BasicLayout = ({...list}) => {
    const [collapsed,setCollapsed] = useState(false);
    const toggle = () => {
        list.dispatch({
            type:'list/menu',
            action_type:'MENU_LIST',
        })
        setCollapsed(!collapsed);
    }
    return (
        <Layout>
            <Layout>
                <MenuSide />
                <Content>
                    <Header style={{background: '#fff',paddingLeft:5}}>
                        <Button onClick={toggle} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                    </Header>
                    <div style={{ padding:10 }}>
                        {list.children}
                    </div>
                    {/* <Footer style={{  position: 'fixed',bottom:0,textAlign: 'center', width: '100%',height:50,backgroundColor:'blue' }}>Footer</Footer> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default connect(list=>{
    return {
        list
    }
})(BasicLayout);