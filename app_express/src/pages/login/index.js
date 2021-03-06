// import { useEffect } from 'react';
import { Input, Button, Form ,message} from 'antd';
// import { loginName } from '@platformConfig';
// import { copyright, copytop } from '@platformConfig';
import { LoginIn } from '@api/login';
// import router from 'umi/router';
// import PingScreen from './ping';
import router from 'umi/router';

import styles from './index.less';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const LoginPage = () => {

    const onFinish = (values) => {

        LoginIn(values).then(res=>{
            if(res.code === 0){
                router.push('/');
            }else{
                console.log(res);
                message.warning(res.msg);
            }
        })

    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请填写密码“admin”',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default LoginPage;