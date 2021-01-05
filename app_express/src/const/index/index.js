export const columns = [
    {
        title: '序列',
        dataIndex: 'id',
        key: 'id',
        status:true,
        render:(text,record,index)=>{
            return (
                <span>
                    {index + 1}
                </span>
            )
        }
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '地址',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: '点击数',
        dataIndex: 'alexa',
        key: 'alexa',
    },
    {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        status:true,
    },
];