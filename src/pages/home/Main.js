import React, { useContext, useMemo, useState } from 'react'
import { Image, ScrollView, Text, View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { CMD } from '../../config/cmd'
import { i18n } from '../../i18n/index';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
// import { List, Flex, WhiteSpace, Accordion } from '@ant-design/react-native';
// const Hearder = () => {
//     const [ip, setIp] = useState(null)
//     const [ssid, setSsid] = useState(null)
//     useFocusEffect(
//         React.useCallback(() => {
//             getDeviceInfo()
//             return () => { }
//         }, [])
//     );
//     const getDeviceInfo = async () => {
//         NetInfo.fetch().then(res => {
//             setIp(res.details.ipAddress)
//             setSsid(res.details.ssid)
//         })
//         let brand = await DeviceInfo.getBrand()
//         let name = await DeviceInfo.getDeviceName()
//     }
//     return (
//         <View>
//             {/* <Flex>
//                 <Flex.Item>
//                     <View style={style.wifiInfoHeader}>
//                         <Ionicons name='ios-globe-outline' size={50} color={'#409EFF'} />
//                     </View>

//                 </Flex.Item>
//                 <Flex.Item style={style.wifiInfoHeader}>
//                     <Ionicons name='ellipsis-horizontal' size={30} color={'#bef8a1'} />
//                     <Text style={{ fontSize: 10 }}>已连接</Text>
//                 </Flex.Item>
//                 <Flex.Item>
//                     <View style={style.wifiInfoHeader}>
//                         <Image
//                             style={style.tinyLogo}
//                             source={require('../../assets/images/route.png')}
//                         />
//                     </View>
//                 </Flex.Item>
//                 <Flex.Item style={style.wifiInfoHeader}>
//                     <Ionicons name='ellipsis-horizontal' size={30} color={'#bef8a1'} />
//                     <Text style={{ fontSize: 10 }}>已连接</Text>
//                 </Flex.Item>
//                 <Flex.Item>
//                     <View style={style.wifiInfoHeader}>
//                         <Ionicons name='phone-portrait-outline' size={45} color={'#409EFF'} />
//                     </View>
//                 </Flex.Item>
//             </Flex> */}
//             <View style={{ height: 100, backgroundColor: 'rgba(255, 255, 255, 0)' }, style.wifiInfoHeader}>
//                 <Text style={{ color: '#666' }}>当前连接WiFi: {ssid}</Text>
//                 {/* <WhiteSpace size="sm" /> */}
//                 <Text style={{ color: '#666' }}>当前网络IP: {ip}</Text>
//             </View>
//         </View>
//     )
// }
// const WifiInfo = () => {
//     const [networkInfo, setNetworkInfo] = useState({})
//     const [is5g, setIs5g] = useState(false)
//     const wifiName_4g = useMemo(() => (
//         !networkInfo.wifiName_4g || networkInfo.wifiName_4g == 'Wlan2GClose'
//     ), [networkInfo.wifiName_4g])
//     const wifiName_5g = useMemo(() => (
//         !networkInfo.wifiName_5g || networkInfo.wifiName_5g == 'Wlan2GClose'
//     ), [networkInfo.wifiName_5g])

//     useFocusEffect(
//         React.useCallback(() => {
//             getData()
//             return () => { }
//         }, [])
//     );

//     const getData = async () => {
//         let res = await fetchRequest_get({ cmd: CMD.NETWORK_INFO });
//         let res_5g = await fetchRequest_get({ cmd: CMD.WIRELESS5G_CONFIG, subcmd: 0 });
//         setNetworkInfo(res)
//         setIs5g(res_5g.wifiSames == "1")
//     }
//     return (
//         <>
//             {!is5g ? <>
//                 <Flex>
//                     <Flex.Item style={style.wifiInfoHeader}>
//                         <Feather name={wifiName_4g ? 'wifi-off' : 'wifi'} size={50} color={wifiName_4g ? '#F56C6C' : '#409EFF'} />
//                         <Text style={{ color: '#666' }}>Wi-Fi 2.4G</Text>
//                         <Text>{wifiName_4g ? '已关闭' : networkInfo.wifiName_4g}</Text>
//                     </Flex.Item>
//                     <Flex.Item style={style.wifiInfoHeader}>
//                         <Feather name={wifiName_5g ? 'wifi-off' : 'wifi'} size={50} color={wifiName_5g ? '#F56C6C' : '#409EFF'} />
//                         <Text style={{ color: '#666' }}>Wi-Fi 5G</Text>
//                         <Text>{wifiName_5g ? '已关闭' : networkInfo.wifiName_5g}</Text>
//                     </Flex.Item>
//                 </Flex>
//                 <Flex>
//                     <Flex.Item style={style.wifiInfo}>
//                         <Text></Text>
//                         <Text>带宽: {i18n.t(`device_status.bandwidth_4g_arr.${networkInfo.bandwidth_4g}`)}</Text>
//                         <Text>信道: {networkInfo.channel_4g || '-----'}</Text>
//                         <Text>当前模式: {i18n.t(`device_status.mode_4g_arr.${networkInfo.mode_4g}`)}</Text>
//                     </Flex.Item>
//                     <Flex.Item style={style.wifiInfo}>
//                         <Text></Text>
//                         <Text>带宽: {i18n.t(`device_status.bandwidth_5g_arr.${networkInfo.bandwidth_5g}`)}</Text>
//                         <Text>信道: {networkInfo.channel_5g || '-----'}</Text>
//                         <Text>当前模式: {i18n.t(`device_status.mode_5g_arr.${networkInfo.mode_5g}`)}</Text>
//                     </Flex.Item>
//                 </Flex>
//             </> :
//                 <>
//                     <Flex>
//                         <Flex.Item style={style.wifiInfoHeader}>
//                             <Feather name={wifiName_5g ? 'wifi-off' : 'wifi'} size={50} color={wifiName_5g ? '#F56C6C' : '#409EFF'} />
//                             <Text style={{ color: '#666' }}>5G优选</Text>
//                             <Text>{wifiName_5g ? '已关闭' : networkInfo.wifiName_5g}</Text>
//                         </Flex.Item>
//                     </Flex>
//                     <WhiteSpace size="lg" />
//                     <Flex>
//                         <Flex.Item style={style.wifiInfo}>
//                             <Text style={{ color: '#666' }}>2.4G Wi-Fi</Text>
//                             <Text>带宽: {i18n.t(`device_status.bandwidth_4g_arr.${networkInfo.bandwidth_4g}`)}</Text>
//                             <Text>信道: {networkInfo.channel_4g || '-----'}</Text>
//                             <Text>当前模式: {i18n.t(`device_status.mode_4g_arr.${networkInfo.mode_4g}`)}</Text>
//                         </Flex.Item>
//                         <Flex.Item style={style.wifiInfo}>
//                             <Text style={{ color: '#666' }}>5G Wi-Fi</Text>
//                             <Text>带宽: {i18n.t(`device_status.bandwidth_5g_arr.${networkInfo.bandwidth_5g}`)}</Text>
//                             <Text>信道: {networkInfo.channel_5g || '-----'}</Text>
//                             <Text>当前模式: {i18n.t(`device_status.mode_5g_arr.${networkInfo.mode_5g}`)}</Text>
//                         </Flex.Item>
//                     </Flex>
//                 </>}
//         </>
//     )
// }
const Main = () => {

    return (
        <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ height: '100%' }}>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <>
                    {/* <Hearder />
                    <WifiInfo />
                    <WhiteSpace size="lg" />
                    <DeviceList /> */}
                </>
            </ScrollView>
        </LinearGradient>
    )
}
//style
const center = {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
}
const style = StyleSheet.create({
    wifiInfoHeader: {
        ...center,
        height: 100,
    },
    wifiInfo: {
        ...center,
        height: 100,
    },
    tinyLogo: {
        width: 60,
        height: 60,
    },
})

export default Main