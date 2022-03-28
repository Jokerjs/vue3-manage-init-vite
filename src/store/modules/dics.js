import {_http, _api} from '@/libs/'

const dics = {
    state: {
        dictItemMap: {},
        dictItems: {}
    },
    getters: {
        dictItemMap: (state) => state.dictItemMap,
        dictItems: (state) => state.dictItems
    },
    mutations: {
        SET_DICT_ITEMS(state, payload) {
            const dictItemMap = {}
            for (let key in payload) {
                let itemObj = {}
                payload[key].forEach(item => {
                    itemObj[item.value] = item.title
                })
                dictItemMap[key] = itemObj
            }
            Object.assign(state, {dictItems: payload, dictItemMap})
        }
    },
    actions: {
        GetDictItems({commit}) {
            return _http.get(_api.queryAllDictItems).then(res => commit('SET_DICT_ITEMS', res || {}))
        }
    }

}
export default dics
