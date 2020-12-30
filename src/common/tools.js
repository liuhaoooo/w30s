import AsyncStorage from '@react-native-async-storage/async-storage';
import { CMD } from "../config/cmd";
import { Alert } from 'react-native'
import { fetchRequest_get, fetchRequest_post } from "./fetchRequest";
import store from '../redux/reducer/index'
import { i18n } from '../i18n/index';
import { changeLoginStateAction, changeLoading } from '../redux/action/index';
export const logout_tool = (message) => {
    if (!message) {
        fetchRequest_post({ cmd: CMD.LOGOUT }).then(res => {
            AsyncStorage.removeItem('storageData');
            store.dispatch(changeLoginStateAction(false))
        });
        return
    }
    Alert.alert(
        i18n.t('tips.tip'),
        message,
        [
            {
                text: i18n.t('tips.cancel'),
                onPress: () => {},
                style: "cancel"
            },
            {
                text: i18n.t('tips.ok'),
                onPress: () => {
                    fetchRequest_post({ cmd: CMD.LOGOUT }).then(res => {
                        AsyncStorage.removeItem('storageData');
                        store.dispatch(changeLoginStateAction(false))
                    });
                }
            }
        ]
    );
}


export const restart_tool = (message) => {
    if (!message) {
        fetchRequest_post({ cmd: CMD.SYS_REBOOT, rebootType: 2 }).then(() => { });
        return
    }
    Alert.alert(
        i18n.t('tips.tip'),
        message,
        [
            {
                text: i18n.t('tips.cancel'),
                onPress: () => {},
                style: "cancel"
            },
            {
                text: i18n.t('tips.ok'),
                onPress: () => {
                    fetchRequest_post({ cmd: CMD.SYS_REBOOT, rebootType: 2 }).then(res => {
                        console.log(res, '--------------')
                    });
                }
            }
        ]
    );
}
export const reset_tool = (message) => {
    if (!message) {
        fetchRequest_post({ cmd: CMD.RESTORE_DEFAULT }).then(() => { });
        return
    }
    Alert.alert(
        i18n.t('tips.tip'),
        message,
        [
            {
                text: i18n.t('tips.cancel'),
                onPress: () => {},
                style: "cancel"
            },
            {
                text: i18n.t('tips.ok'),
                onPress: () => {
                    fetchRequest_post({ cmd: CMD.RESTORE_DEFAULT }).then(res => {
                        console.log(res, '--------------')
                    });
                }
            }
        ]
    );
}
export const date_tool = val => {
    let day = Math.floor(val / (24 * 3600));
    let hour = Math.floor((val - day * 24 * 3600) / 3600);
    let minute = Math.floor((val - day * 24 * 3600 - hour * 3600) / 60);
    return `${day}天 ${hour}小时 ${minute}分`
}
export const loading_tool = (tag, msg = '') => {
    let load = store.getState()
    if (tag) {
        try {
            // Portal.remove(load.loadingKey)
        } catch (error) { }
        // const loading = Toast.loading({ content: msg ? msg : i18n.t('tips.wait'), duration: 15 })
        const loading = null
        store.dispatch(changeLoading(loading))
    } else {
        // Portal.remove(load.loadingKey)
    }
}