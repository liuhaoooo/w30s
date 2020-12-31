import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View } from 'react-native';
import { Container, Content, Button, Text, Separator, Header } from 'native-base';
import base64 from 'react-native-base64'
import { i18n } from '../../i18n/index';
import { loading_tool } from '../../common/tools';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
import { useFocusEffect } from '@react-navigation/native';
import Placeholders from '../../components/Placeholders'
import { MySwitch, MyPicker, MyInput } from '../../components/FormItems'

export default Wifiset_24g = ({ id, cmd, option }) => {
    let _isMounted = true
    const [wifiOpen, setWifiOpen] = useState(true)//wifi开关
    const [wifiHide, setWifiHide] = useState(false)//wifi隐藏
    const [ssid, setSsid] = useState("")//ssid
    const [password, setPassword] = useState("")//wifi密码
    const [encryType, setEncryType] = useState('')//加密方式
    const [wpaEncryType, setWpaEncryType] = useState('')//wpa加密
    const [wepType, setWepType] = useState('')//WEP认证
    const [keylen, setKeylen] = useState('')//加密长度
    const [key, setKey] = useState('')//密钥
    const [wmm, setWmm] = useState(true)//wmm
    const [first5g, setFirst5g] = useState(false)//5G
    //高级设置
    const [showAdv, setShowAdv] = useState(false)//是否显示高级设置
    const [power, setPower] = useState('')//发射功率
    const [channel, setChannel] = useState('')//信道
    const [workMode, setWorkMode] = useState('')//Wi-Fi工作模式
    const [bandwidth, setBandwidth] = useState('')//带宽
    const [loading, setLoading] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            _isMounted = true
            getData()
            return () => _isMounted = false;
        }, [])
    );
    useEffect(() => {
        setLoading(true)
    }, [])

    const getData = async () => {
        let res = await fetchRequest_get({ cmd: cmd.get, subcmd: 0 });
        let res_adv = await fetchRequest_get({ cmd: cmd.get_adv });
        if (!_isMounted) {
            return
        }
        setWifiOpen(res.wifiOpen == '1')
        setSsid(base64.decode(res.ssid))
        setWifiHide(res.broadcast == '1')
        id == '5g' && setFirst5g(res.wifiSames == '1')
        setPassword(res.key)
        setEncryType(res.authenticationType)
        setWpaEncryType(res.wpa)
        setWepType(res.wepauthentication)
        setKeylen(res.keylen)
        setKey(res.key1)
        setWmm(res.wifiwmm == '1')
        setPower(res_adv.txPower)
        setChannel(res_adv.channel)
        setWorkMode(res_adv.wifiWorkMode)
        setBandwidth(res_adv.bandWidth)
        setLoading(false)
    }
    const post = () => {
        loading_tool(true)
        postData()
    }
    const postData = () => {
        let json = {
            cmd: cmd.post,
            subcmd: 0,
            wifiOpen: wifiOpen ? '1' : '0',
            broadcast: wifiHide ? '1' : '0',
            ssid: base64.encode(ssid),
            key: password,
            authenticationType: encryType[0],
            wpa: wpaEncryType[0],
            wepauthentication: wepType[0],
            keylen: keylen[0],
            key1: key,
            wifiwmm: wmm ? '1' : '0'
        }
        if (id == '5g') {
            json.wifiSames = first5g ? '1' : '0'
        }
        fetchRequest_post(json).then(res => {
            postData_adv()
        }).catch(err => {
            postData_adv()
        })
    }
    const postData_adv = () => {
        if (!showAdv) {
            loading_tool(false)
            Toast.info({ content: '设置成功', duration: 1, mask: false })
            return
        }
        let json = {
            cmd: cmd.post_adv,
            txPower: power[0],
            channel: channel[0],
            wifiWorkMode: workMode[0],
            bandWidth: bandwidth[0],
        }
        fetchRequest_post(json).then(res => {
            loading_tool(false)
            Toast.info({ content: '设置成功', duration: 1, mask: false })
        }).catch(err => {
            loading_tool(false)
            Toast.info({ content: '设置成功', duration: 1, mask: false })
        })
    }
    const WifiSet = () => {
        return (
            <>
                <Separator bordered>
                    <Text>基础设置</Text>
                </Separator>
                {
                    id == '5g' ? <MySwitch
                        onChange={(val) => { setFirst5g(val) }}
                        title='5G优选'
                        value={first5g} /> : null
                }
                <MyInput
                    onChange={(val) => { setSsid(val) }}
                    title='Wi-Fi名称'
                    inputValue={ssid} />
                <MySwitch
                    onChange={(val) => { setWifiHide(val) }}
                    title='Wi-Fi隐藏'
                    value={wifiHide} />
                <MyPicker
                    onChange={(val) => { setEncryType(val) }}
                    title='加密方式'
                    value={encryType}
                    options={option.encryption_option} />

                {encryType == 'OPEN' ? null : encryType == 'WEP' ?
                    <>
                        <MyPicker
                            onChange={(val) => { setWepType(val) }}
                            title='WEP认证'
                            value={wepType}
                            options={option.wep_option} />
                        <MyPicker
                            onChange={(val) => { setKeylen(val) }}
                            title='加密长度'
                            value={keylen}
                            options={option.keylen_option} />
                        <MyInput
                            onChange={(val) => { setKey(val) }}
                            title='密钥'
                            inputValue={key} />
                    </> :
                    <>
                        <MyPicker
                            onChange={(val) => { setWpaEncryType(val) }}
                            title='WPA加密'
                            value={wpaEncryType}
                            options={option.wpa_option} />
                        <MyInput
                            onChange={(val) => { setPassword(val) }}
                            title='密码'
                            password={true}
                            inputValue={password} />
                    </>
                }
                <MySwitch
                    onChange={(val) => { setWmm(val) }}
                    title='WMM'
                    value={wmm} />
                <MySwitch
                    onChange={(val) => { setShowAdv(val) }}
                    title='显示高级设置'
                    value={showAdv} />
            </>
        )
    }
    const WifiAdv = () => {
        return (
            <>
                <Separator bordered>
                    <Text>高级设置</Text>
                </Separator>
                <MyPicker
                    onChange={(val) => { setPower(val) }}
                    title='发射功率'
                    value={power}
                    options={option.power_option} />
                <MyPicker
                    onChange={(val) => { setChannel(val) }}
                    title='信道'
                    value={channel}
                    options={option.channel_option} />
                <MyPicker
                    onChange={(val) => { setWorkMode(val) }}
                    title='Wi-Fi工作模式'
                    value={workMode}
                    options={option.workMode_option} />
                <MyPicker
                    onChange={(val) => { setBandwidth(val) }}
                    title='带宽'
                    value={bandwidth}
                    options={option.bandwidth_option} />
            </>
        )
    }
    return (
        <ScrollView>
            {loading ? <Placeholders count={10} /> :
                <Container>
                    <Content>
                        <MySwitch
                            onChange={(val) => { setWifiOpen(val) }}
                            title='Wi-Fi开关'
                            value={wifiOpen} />
                        {wifiOpen ? <><WifiSet />{showAdv ? <WifiAdv /> : null}</> : null}
                        <Button block info onPress={() => post()} style={{ marginTop: 20 }}>
                            <Text>保存</Text>
                        </Button>
                    </Content>
                </Container>}
        </ScrollView>
    )
}
