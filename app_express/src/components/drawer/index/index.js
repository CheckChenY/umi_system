// import { useEffect } from 'react';
import { connect } from 'dva';
import { Drawer, Form, Input, Button,message } from 'antd';
import { columns } from '@const/index';
// import { Encrypt,Decrypt } from '@com/cryptojs/utils';
import { AddList } from '@api/index';
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
    
    // let [ form ] = Form.useForm();
    
    // useEffect(()=>{
    //     let items = boat.list;
    //     // console.log(items);
    //     if(boat.title === '编辑'){
    //         // console.log(boat.title)
    //         form.setFieldsValue({SHIPNAME:items ? items.SHIPNAME : ''});
    //         form.setFieldsValue({CAPACITY:items ? items.CAPACITY : ''});
    //         form.setFieldsValue({GROSSTONNAGE:items ? items.GROSSTONNAGE : ''});
    //         form.setFieldsValue({SHIPLENGHT:items ? items.SHIPLENGHT : ''});
    //         form.setFieldsValue({SHIPWIDTH:items ? items.SHIPWIDTH : ''});
    //         form.setFieldsValue({SHIPDEEP:items ? items.SHIPDEEP : ''});
    //         form.setFieldsValue({OWNER:items ? items.OWNER : ''});
    //         form.setFieldsValue({SHIPFACTORY:items ? items.SHIPFACTORY : ''});
    //         form.setFieldsValue({SHIPMATERIAL:items ? items.SHIPMATERIAL : ''});
    //         // form.setFieldsValue({SHIPID:items ? items.SHIPID : ''});
    //     }else if(boat.title === '新增'){
    //         // console.log(boat.title)
    //         form.setFieldsValue({SHIPNAME:''});
    //         form.setFieldsValue({CAPACITY:''});
    //         form.setFieldsValue({GROSSTONNAGE:''});
    //         form.setFieldsValue({SHIPLENGHT:''});
    //         form.setFieldsValue({SHIPWIDTH:''});
    //         form.setFieldsValue({SHIPDEEP:''});
    //         form.setFieldsValue({OWNER:''});
    //         form.setFieldsValue({SHIPFACTORY:''});
    //         form.setFieldsValue({SHIPMATERIAL:''});
    //     }
        
    // },[boat,form])
    
    const onFinish = values => {
        // const { type,record,onChangeBol } = this.props;
        // values.SHIPID = boat.list.SHIPID;
        if(list.title === '新增'){
            console.log(values);
            AddList(values).then(res=>{
                console.log(res);
            })
            // let nValue = Encrypt(JSON.stringify(values), window.code);
            // let obj = {
            //     data:nValue
            // }

            // AddTable(obj).then((res)=>{
            //     // let jsonStr = Decrypt(res.substring(16), res.substring(0, 16));
            //     // let json = JSON.parse(jsonStr);
            //     // console.log(json);
            //     dispatch({
            //         type: 'boat/boatListTable',
            //         item: 'visble',
            //     })
            //     message.success('添加成功')
                
            //     // getList();
            // })
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

    // const getList = () => {
    //     let obj = {
    //         start:Encrypt((list.start - 1) * 10 + 1, window.code),
    //         count:Encrypt(10, 'DEUKfkMNUMNYG8xO')
    //     }
    //     // console.log(boat);
    //     boatList(obj).then((res)=>{

    //         let jsonStr = Decrypt(res.substring(16), res.substring(0, 16));
    //         let json = JSON.parse(jsonStr);
    //         let sData = json.data;
    //         // console.log(json)

    //         dispatch({
    //             type: 'boat/boatListTable',
    //             item: 'boat_list_table',
    //             data:sData,
    //             total:json.resultsize,
    //             start:list.start
    //         })
    //     })
    // }

    
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
                    // form={form} 
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
