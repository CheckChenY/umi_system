import { useEffect } from 'react';
import { connect } from 'dva';
import { Drawer, Form, Input, Button } from 'antd';
import { columns } from '@const/index';
// import { Encrypt,Decrypt } from '@com/cryptojs/utils';
// import { AddList } from '@api/index';
// import { boatList } from '@api/message/index';

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

const BoatDrawer = ({list,dispatch}) =>  {
    // console.log(list);
    
    let [ form ] = Form.useForm();
    
    useEffect(()=>{
        let items = list.item_list;
        // console.log(items);
        if(list.title === '编辑'){
            // console.log(boat.title)
            form.setFieldsValue({name:items ? items.name : ''});
            form.setFieldsValue({url:items ? items.url : ''});
            form.setFieldsValue({alexa:items ? items.alexa : ''});
            form.setFieldsValue({country:items ? items.country : ''});
        }else if(list.title === '新增'){
            // console.log(boat.title)
            form.setFieldsValue({name:''});
            form.setFieldsValue({url:''});
            form.setFieldsValue({alexa:''});
            form.setFieldsValue({country:''});
        }
        
    },[list,form])
    
    const onFinish = values => {
        // const { type,record,onChangeBol } = this.props;
        // values.SHIPID = boat.list.SHIPID;
        if(list.title === '新增'){
            dispatch({
                type: 'list/AddList',
                payload:values
            })
        }else if(list.title === '编辑'){
            // console.log(values);
            // values.SHIPID = list.list.SHIPID;

            // let nValue = Encrypt(JSON.stringify(values), window.code);

            
            // let obj = {
            //     data:nValue
            // }

            // EditTable(obj).then((res)=>{
            //     let jsonStr = Decrypt(res.substring(16), res.substring(0, 16));
            //     let json = JSON.parse(jsonStr);
            //     // console.log(json);
            //     if(json.state){
            //         // getList();
            //         message.success(json.msg);
            //     }else{
            //         message.waring(json.msg);
            //     }
            // })
        }
    };



    const onClose = () => {
        dispatch({
            type: 'list/datalist',
            item: 'visble',
        })
    }
    
    return (
        <>
            <Drawer
                title={list.title}
                destroyOnClose={true}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={list.visble}
                width={list.width}
                getContainer={false}
            >
                <Form
                    {...layout}  
                    form={form} 
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        {
                            columns.map((show,i)=>{
                                if(show.status){
                                    return false
                                }
                                return(
                                    <Form.Item
                                        key={i}
                                        label={show.title}
                                        name={show.key}
                                        rules={[
                                            {
                                                required: false,
                                                message: `请输入${show.title}`,
                                            },
                                        ]}
                                        >
                                        <Input placeholder={`请输入${show.title}`} />
                                    </Form.Item>
                                )
                            })
                        }



                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}


export default connect(({list,dispatch})=>{
    return {
        dispatch,
        list
    }
})(BoatDrawer)
