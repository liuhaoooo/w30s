import React, { useContext, useState, useEffect } from 'react'
import { View, TouchableHighlight, Text, TextInput, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Item, Input, Label, Icon, Spinner } from 'native-base';
import { CMD } from '../config/cmd'
import { fetchRequest_get, fetchRequest_post } from '../common/fetchRequest'
import base64 from 'react-native-base64'
import { connect } from 'react-redux';
import { changeLoginStateAction } from '../redux/action/index';
import { loading_tool } from '../common/tools';
import { i18n } from '../i18n/index';
const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [times, setTimes] = useState(0)
    const [rememberPass, setRememberPass] = useState(true)
    const [loginTimesIsShow, setLoginTimesIsShow] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    useEffect(() => {
        init()
    }, []);
    async function init() {
        getNextText()
        try {
            const value = await AsyncStorage.getItem('rememberData');
            setUsername(JSON.parse(value).rememberName)
            setPassword(JSON.parse(value).rememberPass)
        } catch (error) { }
    }
    //登录
    async function login() {
        if (!username || !password) {
            // Toast.info({ content: '用户名或者密码不能为空', duration: 1, mask: false })
            return
        }
        // loading_tool(true, i18n.t('tips.logining'))
        rememberPassword()
        let json = {
            cmd: CMD.LOGIN,
            username: username,
            passwd: base64.encode(password),
            isAutoUpgrade: "0"
        };
        fetchRequest_post(json)
            .then(async res => {
                if (res.login_fail === "fail") {
                    // loading_tool(false)
                    // Toast.fail({ content: i18n.t('tips.loginfail') + res.login_times, duration: 1, mask: false })
                    if (parseInt(res.login_times, 10) < 1) {
                        getNextText();
                    }
                } else {//登录成功
                    try {
                        const data = {
                            sessionId: res.sessionId,
                            username,
                            password
                        }
                        await AsyncStorage.setItem('storageData', JSON.stringify(data));
                    } catch (error) { }
                    // loading_tool(false)
                    props.changeLoginState(true)
                }
            }).catch(err => {
                // Toast.fail({ content: '当前WiFi无网络或者不匹配', duration: 2, mask: false })
            })
    }
    async function rememberPassword() {
        if (rememberPass) {
            try {
                const data = {
                    rememberName: username,
                    rememberPass: password
                }
                await AsyncStorage.setItem('rememberData', JSON.stringify(data));
            } catch (error) { }
        } else {
            try {
                await AsyncStorage.removeItem('rememberData');
            } catch (error) { }
        }
    }
    function getNextText() {
        fetchRequest_get({ cmd: CMD.GET_NEXT_LOGIN_TIME }).then(res => {
            if (res.buffer == "0") {
                setTimes(180 - res.netx_login_time);
                setLoginTimesIsShow(true);
                setTimeout(() => {
                    getNextText();
                }, 1000);
            } else {
                setLoginTimesIsShow(false);
            }
        }).catch(err => {
            // Toast.fail({ content: '当前WiFi无网络或者不匹配', duration: 2, mask: false })
        });
    }

    return (
        <View style={styles.content}>
            <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
            />
            <Item rounded style={styles.input}>
                <Icon active name='person' style={{ color: '#999', fontSize: 20 }} />
                <Input
                    placeholder={i18n.t('login.username')}
                    onChangeText={text => setUsername(text)}
                    value={username} />
            </Item>
            <Item rounded style={styles.input}>
                <Icon active name='eye' style={{ color: '#999', fontSize: 20 }} />
                <Input
                    placeholder={i18n.t('login.password')}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true} />
            </Item>
            {/*<Flex style={{ width: '70%' }}>
                <Flex.Item>
                    <Checkbox
                        checked={rememberPass}
                        style={{ color: '#67bdfb' }}
                        onChange={e => setRememberPass(e.target.checked)}
                    ><Text style={{ color: '#999', fontSize: 14 }}>记住密码</Text></Checkbox>
                </Flex.Item>
            </Flex> */}
            <TouchableHighlight onPress={() => login()} style={styles.button} disabled={loginTimesIsShow}>
                {true ? <Text style={styles.button_text}>{loginTimesIsShow ? `${times} s` : i18n.t('login.loginbtn')}</Text> :
                    <Spinner color='#fff' style={{ height: 46 }} />}
            </TouchableHighlight>
        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: (value) => {
            dispatch(changeLoginStateAction(value));
        }
    }
};
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
    input: {
        width: '70%',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#409EFF',
        width: '70%',
        height: 46,
        marginTop: 10,
        borderRadius: 20,
    },
    button_text: {
        textAlign: 'center',
        lineHeight: 46,
        color: '#fff',
        fontSize: 16
    },
    code: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    logo: {
        width: 180,
        height: 100,
    }
})