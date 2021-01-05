// import { useEffect } from 'react';
import { Input, Button, Form } from 'antd';
// import { loginName } from '@platformConfig';
// import { copyright, copytop } from '@platformConfig';
import { RegisterIn } from '@api/login';
// import router from 'umi/router';
// import PingScreen from './ping';

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
        console.log('Success:', values);

        RegisterIn(values).then(res=>{
            console.log(res);
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
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default LoginPage;