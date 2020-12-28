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
                loading:true
            }
        })
    },[])

    columns[4].render = (text, record) => {
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

    const onChangePlus = () => {
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
                name:res
            }
        })
    }
    console.log(list.datalist);
    return (
        <div>
            <Space align="center" style={{ marginBottom: 16 }}>

                <Search placeholder="按照指定条件搜索" onSearch={onSearch} enterButton />

                <Button  size={'small'} 
                    onClick={onChangePlus} 
                >
                    新增</Button>
            </Space>
            <Table dataSource={list.datalist} columns={columns} />
            
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
