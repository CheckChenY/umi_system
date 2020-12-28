
import { DataList,MenuList,SearchList } from '@api/index';

export default {
    namespace: 'list',

    state: {
        visble: false,
        title:'',
        loading:false,
        menulist:[]
    },

    effects: {
        *DataList({payload},{call,put}){
            //请求数据接口
            const response = yield call(DataList,payload);
            const menulist = yield call(MenuList,payload);
            // console.log(menulist);
            //存储数据
            yield put({
                type:'save',
                payload:{
                    ...payload,
                    action_type:'DATA_LIST',
                    datalist:response,
                    menulist:menulist,
                    loading:false,
                    // current:payload.current,
                }
            })
        },
        *SearchList({payload},{call,put}){
            //请求数据接口
            let arr = [];
            const response = yield call(SearchList,payload);
            if(payload.name){
                arr.push(response);
            }else{
                arr = response;
            }
            // console.log(menulist);
            //存储数据
            yield put({
                type:'save',
                payload:{
                    ...payload,
                    action_type:'DATA_LIST',
                    datalist:arr,
                }
            })
        },
    },

    reducers: {
        datalist(state, action) {
            switch (action.item) {
                case 'visble':
                    return {
                        ...state,
                        visble: !state.visble,
                        title:action.title,
                    };
                case 'update':
                    return {
                        ...state,
                        visble: !state.visble,
                        data:state.data,
                        title:action.title,
                    };
                default:
                    break;
            }
        },
        save(state,action){
            const { payload } = action,
            { action_type } = payload;
            switch (action_type){
                case 'DATA_LIST' :
                    return {
                        ...state,
                        ...payload,
                    }
                
                default :
                    break;
            }
        },
    },
};