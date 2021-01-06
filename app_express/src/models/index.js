
import { DataList,MenuList,SearchList
    // AddList 
} from '@api/index';

export default {
    namespace: 'list',

    state: {
        visble: false,
        title:'',
        loading:false,
        menulist:[],
        item_list:[],
        collapsed:false,
        datalist:{
            page:1
        },
        loading:false,
        weather_data:{},
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
        
        *MenuList({payload},{call,put}){
            //请求数据接口
            const menulist = yield call(MenuList,payload);
            // const weather = yield call(Weather,payload);
            // console.log(menulist);
            //存储数据
            yield put({
                type:'save',
                payload:{
                    ...payload,
                    action_type:'MENU_LIST_DATA',
                    // weather_data:weather,
                    menulist:menulist,
                    // loading:false,
                    // current:payload.current,
                }
            })
        },
        //增
        *AddList({payload},{call,put}){
            //请求数据接口
            // const response = yield call(AddList,payload);
            const item = yield call(DataList,payload);
            // console.log(menulist);
            //存储数据
            yield put({
                type:'save',
                payload:{
                    ...payload,
                    action_type:'DATA_LIST',
                    datalist:item,
                    loading:false,
                    visble:false
                    // current:payload.current,
                }
            })
        },
        *SearchList({payload},{call,put}){
            //请求数据接口
            let arr = [];
            const response = yield call(SearchList,payload);
            //存储数据
            yield put({
                type:'save',
                payload:{
                    ...payload,
                    action_type:'DATA_LIST',
                    datalist:response,
                    loading:false,
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
                        item_list:action.item_list
                    };
                case 'update':
                    return {
                        ...state,
                        visble: !state.visble,
                        data:state.data,
                        title:action.title,
                        // item:action.item
                    };
                case 'menu':
                    return {
                        ...state,
                        collapsed: !state.collapsed,
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
                case 'MENU_LIST_DATA' :
                    return {
                        ...state,
                        ...payload,
                    }
                
                default :
                    break;
            }
        },
        menu(state,action){
            switch (action.action_type){
                case 'MENU_LIST' :
                    return {
                        ...state,
                        collapsed : !state.collapsed,
                    }
                
                default :
                    break;
            }
        },
    },
};