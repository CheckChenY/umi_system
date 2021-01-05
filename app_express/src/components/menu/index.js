// import React,{ useState,useEffect } from 'react';
import { connect } from 'dva';
import { Menu,Layout } from 'antd';
import router from 'umi/router';
import {
    PieChartOutlined,
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
        <Sider className={styles.box_menu}
            trigger={null} collapsible collapsed={list.collapsed}
        >
            <Menu 
                theme="dark" 
                mode="inline" 
                onClick={handleMenuClick}
                defaultSelectedKeys={['/']}
                defaultOpenKeys={['sub1']}
                >
                {
                    list.menulist.length > 0 && list.menulist.map((item,i)=>{
                        if(item.chilren){
                            return(
                                <SubMenu
                                    key={`sub${item.id}`}
                                    icon={<MailOutlined />} title={item.name}
                                >
                                    {
                                        item.chilren.map(txt=>(
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