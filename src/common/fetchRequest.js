import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios'
// import { Toast, Modal,Portal } from '@ant-design/react-native';
import { common_url } from '../config/cmd'
import store from '../redux/reducer/index'
import { i18n } from '../i18n/index';
import { changeLoginStateAction } from '../redux/action/index';
async function fetchRequest(method = 'POST', params = '') {
    let data = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    if (params) {
        try {
            const value = await AsyncStorage.getItem('storageData');
            const sessionId = JSON.parse(value).sessionId
            params.sessionId = sessionId == null ? '' : sessionId
        } catch (error) {
            params.sessionId = ''
        }
        data = {
            method,
            body: JSON.stringify(params)
        }
    }
    return new Promise((resolve, reject) => {
        fetch(common_url, data)
            .then(response => response.json())
            .then(res => {
                if (res.message == 'NO_AUTH') {
                    // Modal.alert(i18n.t('tips.tip'), i18n.t('tips.loginExpired'), [
                    //     {
                    //         text: i18n.t('tips.ok'),
                    //         onPress: () => {
                    //             store.dispatch(changeLoginStateAction(false))
                    //         }
                    //     },
                    // ]);
                    store.dispatch(changeLoginStateAction(false))
                    reject(null)
                }
                resolve(res);
            }).catch(err => {
                // Portal.remove(store.getState().loadingKey)
                // Toast.info({ content: i18n.t('tips.fail'), duration: 1, mask: false })
                reject(err);
            });
    });
}
export const fetchRequest_post = async (data) => {
    data.method = 'POST'
    let res = await fetchRequest('POST', data)
    return res
}
export const fetchRequest_get = async (data) => {
    data.method = 'GET'
    let res = await fetchRequest('POST', data)
    return res
}



// const request = axios.create({
//     baseURL: common_url,
//     timeout: 10000,
// });
// // 请求拦截器
// request.interceptors.request.use((config) => {
//     config.method = 'post'
//     return config;
// }, (error) => {
//     loading_tool(false)
//     Toast.info({ content: '请求失败', duration: 1, mask: false })
//     return Promise.reject(error);
// });

// // 响应拦截器
// request.interceptors.response.use((response) => {
//     if (!response.data.success && response.data.message == 'NO_AUTH') {
//         store.dispatch(changeLoginStateAction(false))
//         return {};
//     }
//     return response.data;
// }, (error) => {
//     console.log(error.response);

//     loading_tool(false)
//     Toast.info({ content: '请求失败', duration: 1, mask: false })
//     return Promise.reject(error);
// });

// export const fetchRequest_get = async (data) => {
//     data.method = 'GET'
//     try {
//         const value = await AsyncStorage.getItem('sessionId');
//         data.sessionId = value == null ? '' : value
//     } catch (error) {
//         data.sessionId = ''
//     }
//     let res = await request({ data })
//     return res
// }
// export const fetchRequest_post = async (data) => {
//     data.method = 'POST'
//     try {
//         const value = await AsyncStorage.getItem('sessionId');
//         data.sessionId = value == null ? '' : value
//     } catch (error) {
//         data.sessionId = ''
//     }
//     let res = await request({ data })
//     return res
// }