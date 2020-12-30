import Home from '../pages/Home'
import Login from '../pages/Login'
import Disconnect from '../pages/Disconnect'
import Wifiset24g from '../pages/setting/Wifiset24g'
import Wifiset5g from '../pages/setting/Wifiset5g'
import Networksetting from '../pages/setting/Networksetting'
import Password from '../pages/setting/Password'
import Relay from '../pages/setting/Relay'
//未连接WiFi
export const disconnect = [
    { name: 'Disconnect', component: Disconnect, headerShown: false, title: '未连接WiFi' }
]
//未登录
export const userScreens = [
    { name: 'Login', component: Login, headerShown: false, title: '登录' }
]
//已登录
export const authScreens = [
    { name: 'Home', component: Home, headerShown: true, title: 'W30S',showMeun:true },
    { name: 'Wifiset24g', component: Wifiset24g, headerShown: true, title: '2.4GWiFi设置' },
    { name: 'Wifiset5g', component: Wifiset5g, headerShown: true, title: '5GWiFi设置' },
    { name: 'Networksetting', component: Networksetting, headerShown: true, title: '网络设置' },
    { name: 'Password', component: Password, headerShown: true, title: '修改密码' },
    { name: 'Relay', component: Relay, headerShown: true, title: '无线中继' },
]
