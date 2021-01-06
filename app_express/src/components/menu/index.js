import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Menu, Layout } from 'antd';
import router from 'umi/router';
import {
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';
import styles from './index.less';
const { Sider } = Layout;

const { SubMenu } = Menu;
const MenuSide = ({ list, dispatch }) => {

    const [current, setMenu] = useState('');
    const [openKeys, setOpenKeys] = useState('sub1');

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

    useEffect(() => {

        let storage = window.localStorage;
        let current = storage.getItem('menu');
        let open = storage.getItem('openKeys');
        // console.log(current);
        // console.log(open);
        setMenu(current);
        setOpenKeys(open);

    }, [])


    const handleMenuClick = ({ key, keyPath }) => {
        // console.log(key);
        // console.log(keyPath);
        const storage = window.localStorage;
        storage.setItem('menu', key);

        router.push({
            pathname: keyPath[0],///index/jd
        });
    }


    const onOpenChange = keys => {
        const storage = window.localStorage;
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        storage.setItem('openKeys', latestOpenKey);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Sider className={styles.box_menu}
            trigger={null} collapsible collapsed={list.collapsed}
        >
            <div style={{color:'#ffffff'}}>
                {current}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                onClick={handleMenuClick}

                // selectedKeys={current}
                defaultSelectedKeys={[current]}

                // defaultOpenKeys={[openKeys]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                {
                    list.menulist.length > 0 && list.menulist.map((item, i) => {
                        if (item.chilren) {
                            return (
                                <SubMenu
                                    key={`sub${item.id}`}
                                    icon={<MailOutlined />} title={item.name}
                                >
                                    {
                                        item.chilren.map(txt => (
                                            <Menu.Item key={txt.router}>
                                                {/* {IconName[txt.NAME]} */}
                                                <span>{txt.name}</span>
                                            </Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                        } else {
                            return (
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
export default connect(({ list, dispatch }) => {
    return {
        list,
        dispatch
    }
})(MenuSide);