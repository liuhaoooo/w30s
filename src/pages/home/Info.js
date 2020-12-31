import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { List, ListItem, Text, Left } from 'native-base';
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
                        <List>
                            <ListItem itemDivider>
                                <Text style={styles.title_text}>{i18n.t('info.renderHeader1')}</Text>
                            </ListItem>
                            {
                                deviceInfo.map((item, index) => (
                                    <ListItem key={index}>
                                        <Left>
                                            <Text>{item.label}</Text>
                                        </Left>
                                        <View style={styles.text}>
                                            <Text style={{ textAlign: 'right' }} numberOfLines={1}>{item.value}</Text>
                                        </View>
                                    </ListItem>
                                ))
                            }
                            <ListItem itemDivider>
                                <Text style={styles.title_text}>{i18n.t('info.renderHeader2')}</Text>
                            </ListItem>
                            {
                                ipv4Info.map((item, index) => (
                                    <ListItem key={index}>
                                        <Left>
                                            <Text>{item.label}</Text>
                                        </Left>
                                        <View style={styles.text}>
                                            <Text style={{ textAlign: 'right' }} numberOfLines={1}>{item.value}</Text>
                                        </View>
                                    </ListItem>
                                ))
                            }
                            <ListItem itemDivider>
                                <Text style={styles.title_text}>{i18n.t('info.renderHeader3')}</Text>
                            </ListItem>
                            {
                                ipv6Info.map((item, index) => (
                                    <ListItem key={index}>
                                        <Left>
                                            <Text>{item.label}</Text>
                                        </Left>
                                        <View style={styles.text}>
                                            <Text style={{ textAlign: 'right' }} numberOfLines={1}>{item.value}</Text>
                                        </View>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </>
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    text: {
        maxWidth: '40%',
        minWidth: '10%'
    },
    title_text: {
        color: '#999'
    }
})
export default Info