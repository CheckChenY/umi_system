import React,{ useState,useEffect } from 'react';
import { connect } from 'dva';
import { Menu, Button,Layout } from 'antd';
import router from 'umi/router';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import styles from './index.less';
const { Sider } = Layout;

const { SubMenu } = Menu;
const MenuSide = ({list,dispatch}) => {
    const handleMenuClick = ({keyPath}) => {
        router.push({
            pathname: keyPath[0],///index/jd
        });
        
    }
    return (
        <Sider className={styles.box_menu}>
            <Menu 
                theme="dark" 
                mode="inline" 
                onClick={handleMenuClick}
                defaultSelectedKeys={['/']}
                defaultOpenKeys={['sub1']}
                >
                {
                    list.menulist.length > 0 && list.menulist.map((item,i)=>{
                        if(item.children){
                            return(
                                <SubMenu
                                    key={`sub${item.id}`}
                                    icon={<MailOutlined />} title="Dashboard"
                                >
                                    {
                                        item.children.map(txt=>(
                                            <Menu.Item key={txt.router}>
                                                {/* {IconName[txt.NAME]} */}
                                                <span>{txt.name}</span>
                                            </Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                        }else{
                            return(
                                <Menu.Item key={item.router} icon={<PieChartOutlined />}>
                                    <span>{item.name}</span>
                                </Menu.Item>
                            )
                        }
                    })
                }
                {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <span>Helloworld</span>
                </Menu.Item>
                <SubMenu
                    key="sub1" 
                    icon={<MailOutlined />} title="Dashboard"
                >
                    <Menu.Item key="2">分析页</Menu.Item>
                    <Menu.Item key="3">监控页</Menu.Item>
                    <Menu.Item key="4">工作台</Menu.Item>
                </SubMenu> */}
            </Menu>
        </Sider>
    )
}
export default connect(({list,dispatch})=>{
    return {
        list,
        dispatch
    }
})(MenuSide);