import Vue from 'vue';
import Vuex from 'vuex';
// import fetch from '@/utils/fetch';

Vue.use(Vuex);

const accessId = {
    namespaced: true,
    state: {
        storeId: '',
    },
    mutations: {
        SET_STORE_ID: (state, value) => {
            state.storeId = value;
        },
    },
    actions: {
        setStoreId ({ commit }, params) {
            commit('SET_STORE_ID', params);
        },
    },
    getters: {}
};

export default accessId;
