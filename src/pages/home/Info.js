import React, { useContext, useEffect, useState } from 'react'
import { View, Button, Text, ScrollView } from 'react-native'
import { List, WhiteSpace, WingBlank, SwipeAction } from '@ant-design/react-native';
import { useFocusEffect } from '@react-navigation/native';
import Placeholders from '../../components/Placeholders'
import { CMD } from '../../config/cmd'
import { date_tool } from '../../common/tools'
import { i18n } from '../../i18n/index';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
const Info = () => {
    const [deviceInfo, setDeviceInfo] = useState([])
    const [ipv4Info, setIpv4Info] = useState([])
    const [ipv6Info, setIpv6Info] = useState([])
    const [loading, setLoading] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            getData()
            return () => { }
        }, [])
    );
    const getData = async () => {
        let res = await fetchRequest_get({ cmd: CMD.DEVICE_INFO });
        let res1 = await fetchRequest_get({ cmd: CMD.NETWORK_INFO });
        let deviceInfoTmp = [
            { label: i18n.t('info.label1'), value: res.board_type },
            { label: i18n.t('info.label2'), value: res.device_firm },
            { label: i18n.t('info.label3'), value: res.device_sn },
            { label: i18n.t('info.label4'), value: res.hwversion },
            { label: i18n.t('info.label5'), value: res.real_fwversion },
            { label: i18n.t('info.label6'), value: date_tool(res.uptime) },
            { label: i18n.t('info.label7'), value: res.config_version },
            { label: i18n.t('info.label8'), value: res.build_date },
            { label: i18n.t('info.label9'), value: res.git_branch },
            { label: i18n.t('info.label10'), value: res.fake_version },
            { label: i18n.t('info.label11'), value: res.device_cmei },
            { label: i18n.t('info.label12'), value: res.cpuload },
            { label: i18n.t('info.label13'), value: res.memory1 },
            { label: i18n.t('info.label14'), value: res.memory2 },
            { label: i18n.t('info.label15'), value: res.memory3 },
            { label: i18n.t('info.label16'), value: res.git_sha }
        ]
        let ipv4InfoTmp = [
            { label: i18n.t('info.label17'), value: res1.wan_ip_v4 },
            { label: i18n.t('info.label18'), value: res1.lan_ip_v4 },
            { label: i18n.t('info.label19'), value: res1.gateway_v4 },
            { label: i18n.t('info.label20'), value: res1.dns_v4 },
        ]
        let ipv6InfoTmp = [
            { label: i18n.t('info.label21'), value: res1.gateway_v6 },
            { label: i18n.t('info.label22'), value: res1.dns_v6 },
            { label: i18n.t('info.label23'), value: res1.prefix },
            { label: i18n.t('info.label24'), value: res1.link_addr },
            { label: i18n.t('info.label25'), value: res1.wan_ip_v6 },
        ]
        setDeviceInfo(deviceInfoTmp)
        setIpv4Info(ipv4InfoTmp)
        setIpv6Info(ipv6InfoTmp)
        setLoading(false)
    }
    return (
        <ScrollView
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {
                loading ? <Placeholders count={18} /> :
                    <>
                        <List renderHeader={i18n.t('info.renderHeader1')}>
                            {
                                deviceInfo.map((item, index) => (
                                    <List.Item extra={item.value} key={index}>{item.label}</List.Item>
                                ))
                            }
                        </List>
                        <List renderHeader={i18n.t('info.renderHeader2')}>
                            {
                                ipv4Info.map((item, index) => (
                                    <List.Item extra={item.value} key={index}>{item.label}</List.Item>
                                ))
                            }
                        </List>
                        <List renderHeader={i18n.t('info.renderHeader3')}>
                            {
                                ipv6Info.map((item, index) => (
                                    <List.Item extra={item.value} key={index}>{item.label}</List.Item>
                                ))
                            }
                        </List>
                    </>
            }
        </ScrollView>
    )
}

export default Info