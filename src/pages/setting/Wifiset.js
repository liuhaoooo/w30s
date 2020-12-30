import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View } from 'react-native';
import { InputItem, Toast, Switch, List, Picker, Button, WhiteSpace, Provider } from '@ant-design/react-native'
import base64 from 'react-native-base64'
import { i18n } from '../../i18n/index';
import { loading_tool } from '../../common/tools';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
import { useFocusEffect } from '@react-navigation/native';
import Placeholders from '../../components/Placeholders'
export default Wifiset_24g = ({ id, cmd, option }) => {
    let _isMounted = true
    const [wifiOpen, setWifiOpen] = useState(true)//wifi开关
    const [wifiHide, setWifiHide] = useState(false)//wifi隐藏
    const [ssid, setSsid] = useState("")//ssid
    const [password, setPassword] = useState("")//wifi密码
    const [encryType, setEncryType] = useState([])//加密方式
    const [wpaEncryType, setWpaEncryType] = useState([])//wpa加密
    const [wepType, setWepType] = useState([])//WEP认证
    const [keylen, setKeylen] = useState([])//加密长度
    const [key, setKey] = useState('')//密钥
    const [wmm, setWmm] = useState(true)//wmm
    const [first5g, setFirst5g] = useState(false)//5G
    //高级设置
    const [showAdv, setShowAdv] = useState(false)//是否显示高级设置
    const [power, setPower] = useState([])//发射功率
    const [channel, setChannel] = useState([])//信道
    const [workMode, setWorkMode] = useState([])//Wi-Fi工作模式
    const [bandwidth, setBandwidth] = useState([])//带宽
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
        setEncryType([res.authenticationType])
        setWpaEncryType([res.wpa])
        setWepType([res.wepauthentication])
        setKeylen([res.keylen])
        setKey(res.key1)
        setWmm(res.wifiwmm == '1')
        setPower([res_adv.txPower])
        setChannel([res_adv.channel])
        setWorkMode([res_adv.wifiWorkMode])
        setBandwidth([res_adv.bandWidth])
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
                <List>
                    {
                        id == '5g' ?
                            <List.Item
                                extra={
                                    <Switch
                                        checked={first5g}
                                        onChange={val => setFirst5g(val)}
                                    />
                                }
                            >5G优选</List.Item> : null
                    }
                    <List.Item
                        extra={
                            <Switch
                                checked={wifiHide}
                                onChange={val => setWifiHide(val)}
                            />
                        }
                    >Wi-Fi隐藏</List.Item>
                    <InputItem
                        clear
                        value={ssid}
                        onChange={value => setSsid(value)}
                        placeholder="请输入"
                    >Wi-Fi名</InputItem>
                    <Picker
                        title="选择加密方式"
                        data={option.encryption_option}
                        cols={1}
                        value={encryType}
                        onChange={val => setEncryType(val)}
                        onOk={val => setEncryType(val)}
                    >
                        <List.Item arrow="horizontal">加密方式</List.Item>
                    </Picker>
                    {encryType == 'OPEN' ? null : encryType == 'WEP' ?
                        <>
                            <Picker
                                title="选择WEP认证"
                                data={option.wep_option}
                                cols={1}
                                value={wepType}
                                onChange={val => setWepType(val)}
                                onOk={val => setWepType(val)}
                            >
                                <List.Item arrow="horizontal">WEP认证</List.Item>
                            </Picker>
                            <Picker
                                title="选择加密长度"
                                data={option.keylen_option}
                                cols={1}
                                value={keylen}
                                onChange={val => setKeylen(val)}
                                onOk={val => setKeylen(val)}
                            >
                                <List.Item arrow="horizontal">加密长度</List.Item>
                            </Picker>
                            <InputItem
                                clear
                                value={key}
                                onChange={value => setKey(value)}
                                placeholder="请输入"
                            >密钥</InputItem>
                        </> :
                        <>
                            <Picker
                                title="选择WPA加密"
                                data={option.wpa_option}
                                cols={1}
                                value={wpaEncryType}
                                onChange={val => setWpaEncryType(val)}
                                onOk={val => setWpaEncryType(val)}
                            >
                                <List.Item arrow="horizontal">WPA加密</List.Item>
                            </Picker>
                            <InputItem
                                clear
                                type="password"
                                value={password}
                                onChange={value => setPassword(value)}
                                placeholder="请输入"
                            >密码</InputItem>
                        </>}
                    <List.Item
                        extra={
                            <Switch
                                checked={wmm}
                                onChange={val => setWmm(val)}
                            />
                        }
                    >WMM</List.Item>

                </List>
                <WhiteSpace size="lg" />
                <List>
                    <List.Item
                        extra={
                            <Switch
                                checked={showAdv}
                                onChange={val => setShowAdv(val)}
                            />
                        }
                    >显示高级设置</List.Item>
                </List>
            </>
        )
    }
    const WifiAdv = () => {
        return (
            <List>
                <Picker
                    title="选择发射功率"
                    data={option.power_option}
                    cols={1}
                    value={power}
                    onChange={val => setPower(val)}
                    onOk={val => setPower(val)}
                >
                    <List.Item arrow="horizontal">发射功率</List.Item>
                </Picker>
                <Picker
                    title="选择信道"
                    data={option.channel_option}
                    cols={1}
                    value={channel}
                    onChange={val => setChannel(val)}
                    onOk={val => setChannel(val)}
                >
                    <List.Item arrow="horizontal">信道</List.Item>
                </Picker>
                <Picker
                    title="选择Wi-Fi工作模式"
                    data={option.workMode_option}
                    cols={1}
                    value={workMode}
                    onChange={val => setWorkMode(val)}
                    onOk={val => setWorkMode(val)}
                >
                    <List.Item arrow="horizontal">Wi-Fi工作模式</List.Item>
                </Picker>
                <Picker
                    title="选择带宽"
                    data={option.bandwidth_option}
                    cols={1}
                    value={bandwidth}
                    onChange={val => setBandwidth(val)}
                    onOk={val => setBandwidth(val)}
                >
                    <List.Item arrow="horizontal">带宽</List.Item>
                </Picker>
            </List>
        )
    }
    return (
        <ScrollView>
            {loading ? <Placeholders count={10} /> : <>
                <List>
                    <List.Item
                        extra={
                            <Switch
                                checked={wifiOpen}
                                onChange={val => setWifiOpen(val)}
                            />
                        }
                    >Wi-Fi开关</List.Item>
                </List>
                {wifiOpen ? <><WifiSet />{showAdv ? <WifiAdv /> : null}</> : null}
                <List>
                    <List.Item>
                        <Button
                            type="primary"
                            style={{ marginTop: 20 }}
                            onPress={() => post()}>
                            保存
                </Button>
                    </List.Item>
                </List>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
            </>}

        </ScrollView>
    )
}
