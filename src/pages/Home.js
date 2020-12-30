import React, { useReducer, useCallback } from 'react'
import { i18n } from '../i18n/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import {
//     createDrawerNavigator,
//     DrawerContentScrollView,
//     DrawerItemList,
//     DrawerItem,
// } from '@react-navigation/drawer';
import Main from './home/Main'
import Info from './home/Info'
import Status from './home/Status'
// const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
//主要内容
// const Pages = () => {
export default Home = () => {
    return (
        <Tab.Navigator
            initialRouteName="main"
            activeColor="#409EFF"
            shifting={true}
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen
                name="Info"
                component={Info}
                options={{
                    tabBarLabel: i18n.t('home.home'),
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='reader' size={25} color={color} />;
                    }
                }}
            />
            <Tab.Screen
                name="main"
                component={Main}
                options={{
                    tabBarLabel: '首页',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" size={25} color={color} />;
                    }
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Status}
                options={{
                    tabBarLabel: i18n.t('home.tool'),
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="briefcase" size={25} color={color} />;
                    }
                }}
            />
        </Tab.Navigator>
    )
}
//抽屉内容
// const CustomDrawerContent = (props) => {
//     const navigation = useNavigation();
//     return (
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//             <DrawerItem label="修改密码" onPress={() => navigation.push('Password')} />
//             <DrawerItem label="退出登陆" onPress={() => { }} />
//             <DrawerItem label="重启设备" onPress={() => { }} />
//             <DrawerItem label="恢复出厂" onPress={() => { }} />
//         </DrawerContentScrollView>
//     );
// }
// export default Home = () => {
//     return (
//         <Drawer.Navigator drawerType='back' drawerContent={props => <CustomDrawerContent {...props} />}>
//             <Drawer.Screen name="Pages" component={Pages} options={{ title: '返回' }} />
//         </Drawer.Navigator>
//     )
// }