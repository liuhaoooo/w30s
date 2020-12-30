import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { ActionSheet, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
export default Networksetting = () => {
    const [dynamicValidateForm, setdynamicValidateForm] = useState(
        {
            name: '',
            phone: '',
            bandwidth: []
        }
    )
    const changeText = (type, text) => {
        let obj = { dynamicValidateForm };
        obj[type] = text;
        setdynamicValidateForm(obj)
    }
    var BUTTONS = [
        { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
        { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
        { text: "Delete", icon: "trash", iconColor: "#fa213b" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ];
    return (
        <ScrollView>
            <Button
                onPress={() =>
                    ActionSheet.show(
                        {
                            options: BUTTONS,
                            cancelButtonIndex: 3,
                            destructiveButtonIndex: 4,
                            title: "Testing ActionSheet"
                        },
                        buttonIndex => {
                            // this.setState({ clicked: BUTTONS[buttonIndex] });
                        }
                    )}
            >
                <Text>Actionsheet</Text>
            </Button>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#FF9501" }}>
                        <Icon active name="airplane" />
                    </Button>
                </Left>
                <Body>
                    <Text>Airplane Mode</Text>
                </Body>
                <Right>
                    <Switch value={false} />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                        <Icon active name="wifi" />
                    </Button>
                </Left>
                <Body>
                    <Text>Wi-Fi</Text>
                </Body>
                <Right>
                    <Text>GeekyAnts</Text>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                        <Icon active name="bluetooth" />
                    </Button>
                </Left>
                <Body>
                    <Text>Bluetooth</Text>
                </Body>
                <Right>
                    <Text>On</Text>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    elFormItem: {
        marginTop: 0,
        marginBottom: 0,
        height: 50
    },
    input: {
        height: 30,
        width: '100%',
        borderColor: '#8cc5ff',
        borderRadius: 6,
        borderWidth: 1
    }
});

