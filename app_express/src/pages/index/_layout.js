import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Layout, Button, Image, Row, Col, Space,Dropdown,Menu,Avatar } from 'antd';
import Axios from 'axios';
import MenuSide from '@com/menu';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GlobalOutlined
} from '@ant-design/icons';
// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Content } = Layout;

// const Menu = Menu.SubMenu;
const BasicLayout = ({ ...list }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [weather, setWeather] = useState({});
    // const { list } = list,
    // { weather_data } = list;

    useEffect(() => {
        list.dispatch({
            type: 'list/MenuList',
            action_type: 'MENU_LIST_DATA',
        })

        Axios.get('https://tianqiapi.com/api?version=v61&appid=84312475&appsecret=6BrMxHRi')
            .then(function (res) {
                // handle success
                setWeather(res.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])

    const toggle = () => {
        list.dispatch({
            type: 'list/menu',
            action_type: 'MENU_LIST',
        })
        setCollapsed(!collapsed);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
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
    );
    return (
        <Layout>
            <Layout>
                <MenuSide />
                <Content>
                    <Header style={{ background: '#fff', paddingLeft: 5,height:48 }}>
                        <Row style={{lineHeight:'48px'}}>
                            <Col span={12}>
                                <Button onClick={toggle} size={'small'} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                            </Col>
                            <Col span={8}>
                                <Space>
                                    <span>{weather.week}</span>
                                    <span>{weather.city}</span>
                                    <span>{weather.wea}</span>
                                    <Image height={40} width={40} src={`https://www.mingtai18.com/tianqiapi/skin/pitaya/${weather.wea_img}.png`} />
                                    <span>{weather.tem2}℃ ~ {weather.tem1}℃</span>
                                    <span>{weather.win}</span>
                                    <span>{weather.win_speed}</span>
                                    <span>{weather.win_meter}</span>
                                </Space>
                            </Col>
                            <Col span={4} style={{textAlign:'right'}}>
                                <Space>
                                    <Avatar src={ <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />} />
                                    {'陈亚力'}
                                    <Dropdown overlay={menu} placement="bottomCenter">
                                        <GlobalOutlined />
                                    </Dropdown>
                                </Space>
                            </Col>
                        </Row>

                    </Header>
                    <div style={{ padding: 10 }}>
                        {list.children}
                    </div>
                    {/* <Footer style={{  position: 'fixed',bottom:0,textAlign: 'center', width: '100%',height:50,backgroundColor:'blue' }}>Footer</Footer> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default connect(list => {
    return {
        list
    }
})(BasicLayout);