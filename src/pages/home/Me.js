import React, { useEffect, useContext, useState } from 'react'
import { List, Flex, Switch, Picker, WhiteSpace, Modal } from '@ant-design/react-native';
import { ScrollView, View, Button, Text, StyleSheet } from 'react-native';
import { logout_tool, loading_tool, restart_tool,reset_tool } from '../../common/tools'
import { i18n } from '../../i18n/index';
import { CMD } from '../../config/cmd'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
import AsyncStorage from '@react-native-async-storage/async-storage';
//led指示灯
const LedSwitch = () => {
    const [ledSwitchVal, setLedSwitchVal] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                let res = await fetchRequest_get({ cmd: CMD.LED_SWITCH })
                setLedSwitchVal(res.led_status == "0")
            })()
            return () => { }
        }, [])
    );
    const changeLedSwitch = (val) => {
        loading_tool(true)
        fetchRequest_post({ cmd: CMD.LED_SWITCH, led_status: val ? '0' : '1' }).then(() => {
            setLedSwitchVal(val)
            loading_tool(false)
        })
    }
    return (
        <>
            <List.Item
                extra={
                    <Switch
                        checked={ledSwitchVal}
                        onChange={val => changeLedSwitch(val)}
                    />
                }
            >指示灯开关</List.Item>
        </>
    )
}
//语言切换
const LangChange = () => {
    const [lang, setLang] = useState(['zh'])
    const lang_option = [
        { label: '简体中文', value: 'zh' },
        { label: '日本語', value: 'jp' }
    ]

    const langChange = (val) => {
        setLang(val)
        i18n.locale = val[0]
    }
    return (
        <Picker
            title="选择语言"
            data={lang_option}
            cols={1}
            value={lang}
            onOk={val => langChange(val)}
        >
            <List.Item arrow="horizontal">语言</List.Item>
        </Picker>
    )
}
//用户
// const UserPopup = ({ navigation }) => {
//     return (
//         <View style={{ paddingVertical: 20, paddingHorizontal: 20, height: 200 }}>
//             <Button
//                 onPress={() => navigation.push('Networksetting')}
//                 title="修改密码"
//                 color="#841584"
//             />
//             <Button
//                 onPress={() => navigation.push('Username')}
//                 title="修改用户名"
//                 color="#841584"
//             />
//         </View>
//     )
// }

const Me = () => {
    const navigation = useNavigation();
    const [showPopup, setShowPopup] = useState(false)
    const [username, setUsername] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('storageData');
                setUsername(JSON.parse(value).username)
            } catch (error) { }
        })()
    }, [])
    return (
        <>
            {/* <Modal
                popup
                visible={showPopup}
                animationType="slide-up"
                maskClosable={true}
                onClose={() => setShowPopup(false)}
            >
                <UserPopup navigation={navigation} />
            </Modal> */}

            <ScrollView
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <WhiteSpace size="sm" />
                <List>
                    <List.Item extra={username}>
                        <Ionicons name='md-person-circle-outline' size={40} color={'#ccc'} />
                    </List.Item>
                </List>
                <WhiteSpace size="sm" />
                <Flex>
                    <Flex.Item onPress={() => navigation.push('Setting')}>
                        <View style={style.center}>
                            <Ionicons name='ios-wifi' size={40} color={'#bef8a1'} />
                            <Text>Wi-Fi设置</Text>
                        </View>
                    </Flex.Item>
                    <Flex.Item onPress={() => navigation.push('Networksetting')}>
                        <View style={{ borderLeftWidth: 1, borderLeftColor: '#e2e2e2', ...style.center }}>
                            <Ionicons name='ios-globe-outline' size={40} color={'#bef8a1'} />
                            <Text>上网设置</Text>
                        </View>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="sm" />
                <List>
                    <LedSwitch />
                    <LangChange />
                    <List.Item arrow="horizontal" onPress={() => navigation.push('Password')}>修改密码</List.Item>
                    <List.Item arrow="horizontal" onPress={() => { }}>系统日志</List.Item>
                    <List.Item arrow="horizontal" onPress={() => { }}>安全设置</List.Item>
                    <List.Item arrow="horizontal" onPress={() => { }}>网络工具</List.Item>
                </List>
                <WhiteSpace size="lg" />
                <List>
                    <List.Item onPress={() => logout_tool(i18n.t('tips.logout'))}>
                        <Text style={{ fontSize: 14, textAlign: 'center', color: '#409EFF' }}>退出登录</Text>
                    </List.Item>
                </List>
                <WhiteSpace size="sm" />
                <List>
                    <List.Item onPress={() => restart_tool(i18n.t('tips.restart'))}>
                        <Text style={{ fontSize: 14, textAlign: 'center', color: '#E6A23C' }}>重启设备</Text>
                    </List.Item>
                </List>
                <WhiteSpace size="sm" />
                <List>
                    <List.Item onPress={() => reset_tool(i18n.t('tips.reset'))}>
                        <Text style={{ fontSize: 14, textAlign: 'center', color: '#F56C6C' }}>恢复出厂</Text>
                    </List.Item>
                </List>
            </ScrollView>
        </>
    )
}
export default Me

const style = StyleSheet.create({
    center: {
        height: 70,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})