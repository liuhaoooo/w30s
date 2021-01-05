import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Separator, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Thumbnail, Toast, CheckBox } from 'native-base';
import { i18n } from '../../i18n/index';
import { CMD } from '../../config/cmd'
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
const _Item = ({ data, index, editPress, detelePress, switchChange }) => {
    return (
        <ListItem icon style={{ marginBottom: 10, marginTop: 10 }}>
            <Left>
                <Switch value={data.timing_switch == '1'} onChange={() => switchChange(data.timing_switch, index)} />
            </Left>
            <Body>
                <Text>{data.open_time} - {data.close_time}</Text>
                <Text note numberOfLines={1}>{data.week_time}</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => editPress(data, index)}>
                    <Icon active name="form" type="AntDesign" style={{ fontSize: 20, color: '#409EFF' }} />
                </Button>
                <Button transparent onPress={() => detelePress(index)}>
                    <Icon active name="ios-trash-outline" type="Ionicons" style={{ fontSize: 23, color: '#F56C6C' }} />
                </Button>
            </Right>
        </ListItem>
    )
}
// const datas = require('@bang88/china-city-data')
export default Wifitiming = () => {
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        // console.log(datas)
        getData()
    }, [])
    const getData = async () => {
        let res = await fetchRequest_get({ cmd: CMD.WIFI_TIMING })
        // res.data != undefined && setData(res.data)
        console.log(res.data)
        setData([
            { timing_switch: '1', open_time: '08:00', close_time: '12:00', week_time: '周二, 周三, 周五' },
            { timing_switch: '0', open_time: '08:20', close_time: '17:00', week_time: '周一, 周三' },
            { timing_switch: '1', open_time: '06:00', close_time: '23:00', week_time: '周二, 周三, 周日' },
            { timing_switch: '0', open_time: '06:00', close_time: '23:00', week_time: '周二, 周三, 周日' },
        ])
    }
    const postData = () => {
        console.log(data)
        return
        fetchRequest_post({ cmd: CMD.WIFI_TIMING, data }).then(res => {
            Toast.show({
                text: '保存成功',
                type: 'success',
                buttonText: '',
                position: 'center',
                duration: 1500,
                textStyle: { textAlign: 'center' }
            })
        }).catch(err => { })
    }
    function editPress(val, index) {
        console.log(val, index)
    }
    function detelePress(index) {
        Alert.alert(
            i18n.t('tips.tip'),
            '确定删除吗',
            [
                {
                    text: i18n.t('tips.cancel'),
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: i18n.t('tips.ok'),
                    onPress: () => {
                        let tmpData = JSON.parse(JSON.stringify(data))
                        tmpData.splice(index, 1)
                        setData(tmpData)
                    }
                }
            ]
        );
    }
    function switchChange(val, index) {
        setData(data.map((item, key) => key == index ? { ...item, timing_switch: val === '0' ? '1' : '0' } : item))
    }
    const Modals = () => {
        const [value, setValue] = useState([])
        const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        const option = [
            { label: "1", value: '1' },
            { label: "2", value: '2' },
            { label: "3", value: '3' },
            { label: "4", value: '4' },
            { label: "5", value: '5' }
        ]
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modal_content}>
                                <View style={{ flex: 1, backgroundColor: '#ccc' }}>
                                    
                                </View>
                                <View style={{ flex: 1 }}>
                                    {
                                        weeks.map((item, index) => (
                                            <View style={styles.modal_chackbox} key={index}>
                                                <CheckBox checked={true} />
                                                <Text>{item}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={styles.modal_footer}>
                                <Button rounded warning block style={styles.modal_btn} onPress={() => setModalVisible(false)}>
                                    <Text>取消</Text>
                                </Button>
                                <Separator style={{ backgroundColor: '#fff' }} />
                                <Button block rounded info style={styles.modal_btn}>
                                    <Text>确定</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
            </Modal>
        );
    };
    return (
        <ScrollView>
            {
                data.length > 0 ?
                    data.map((item, index) => (
                        <_Item
                            key={index}
                            data={item}
                            index={index}
                            editPress={(val, index) => editPress(val, index)}
                            detelePress={(index) => detelePress(index)}
                            switchChange={(val, index) => switchChange(val, index)} />
                    )) :
                    <View style={{ alignItems: 'center' }}>
                        <Separator />
                        <Thumbnail large source={require("../../assets/images/noData.png")} style={{ width: 180, height: 180 }} />
                        <Text style={{ color: '#bbb' }}>无数据</Text>
                        <Separator />
                    </View>
            }
            {
                data.length < 5 ? <Button block transparent onPress={() => { setModalVisible(true) }}>
                    <Icon active name="pluscircleo" type="AntDesign" style={{ fontSize: 30, color: '#409EFF' }} />
                </Button> : null
            }
            <Separator />
            <Button block info onPress={() => postData()}><Text>保存</Text></Button>
            <Separator />
            <Modals />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 16,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '70%',
        height: '50%'
    },
    modal_content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modal_chackbox: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    },
    modal_footer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    modal_btn: {
        width: 110,
    }
});