import axios from 'axios';
// import qs from 'qs';
import store from 'src/store';
import { getToken } from 'common/js/auth';

const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 5000 // 请求超时的时间
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // config.headers['Content-type'] = 'application/x-www-form-urlencoded';
  if (store.getters.token) { // 登录成功后，让每个请求都携带token
    config.headers['AUTH-TOKEN'] = getToken();
  }
  if (config.method === 'post') {
    config.headers['Content-type'] = 'application/json';
    // config.data = JSON.stringify(config.data);
  }
  return config;
}, (error) => {
  // 请求错误时做的事情
  // Message({
  //   showClose: true,
  //   message: 'Oops!Something wrong',
  //   type: 'error'
  // });
  console.log(`request error:${error}`);

  // 在此处可在界面弹出提示信息（待实现）
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 根据status判断权限，是否需要登录并返回登录页
  // 401-未授权
  // if (response.code === 401) {
  // 清除token并跳转到登录页
  // store.dispatch('Logout').then(() => {
  //   router.replace({
  //     path: 'login',
  //     query: { redirect: router.currentRoute.fullPath }
  //   });
  // });
  // Message({
  //   showClose: true,
  //   message: '没有权限，请重新登录',
  //   type: 'error'
  // });
  // }
  return response;
}, (error) => {
  // Message({
  //   showClose: true,
  //   message: error,
  //   type: 'error'
  // });
  console.log(`response error:${error}`);
  return Promise.reject(error);
});

export default service;
