import { useEffect } from 'react';
import { connect } from 'dva';
import { Table,Space,Button,Input } from 'antd';
import { columns } from '@const/index';
import DrawerScreen from '@com/drawer/index';
const { Search } = Input;
const IndexScreen = ({list,dispatch}) => {
    useEffect(()=>{
        dispatch({
            type:'list/DataList',
            payload:{
                loading:true,
                page:1,
                size:8
            }
        })
    },[])

    columns[5].render = (text, record) => {
        return (
            <span>
                <Space>
                    <Button  size={'small'}  onClick={() => onChangeUpdate(record)} >
                        编辑</Button>
                    <Button  size={'small'} onClick={() => onChangeDelete(record)} >
                        删除</Button>
                </Space>
            </span>
        )
    }

    const onChangePlus = (item) => {
        dispatch({
            type: 'list/datalist',
            item: 'visble',
            title:'新增'
        })
    }

    const onChangeUpdate = (res) => {
        dispatch({
            type: 'list/datalist',
            item: 'visble',
            title:'编辑',
            item_list:res
        })
    }

    const onChangeDelete = (res) => {
        console.log(res);
    }

    const onSearch = (res) => {
        console.log(res);
        
        dispatch({
            type:'list/SearchList',
            payload:{
                name:res,
                page:1,
                size:8,
                loading:true
            }
        })
    }

    const changePage = (res) => {
        
        dispatch({
            type:'list/DataList',
            payload:{
                loading:true,
                page:res,
                size:8
            }
        })
    }

    //显示总数
    const showTotal = (total) => {
        return `共 ${total} 条`;
    }

    return (
        <div>
            <Space align="center" style={{ marginBottom: 16 }}>

                <Search placeholder="按照指定条件搜索" onSearch={onSearch} enterButton />

                <Button  size={'small'} 
                    onClick={onChangePlus} 
                >
                    新增</Button>
            </Space>
            <Table rowKey="id" 
                dataSource={list.datalist ? list.datalist.data : []} 
                columns={columns}
                loading={list.loading}
                
                pagination={{  // 分页
                    // showSizeChanger: false,
                    current: Number(list.datalist.page),
                    total: list.datalist.total,
                    onChange: changePage,
                    showTotal: (item)=>showTotal(item)
                }}
             />
            
            <DrawerScreen />
        </div>
    );
}

export default connect(({list,dispatch})=>{
    return {
        list,
        dispatch
    }
})(IndexScreen);
