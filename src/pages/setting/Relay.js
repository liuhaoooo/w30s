import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { CMD } from "../../config/cmd";
import { loading_tool } from '../../common/tools';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
import { Button, InputItem, List, Picker, Toast } from '@ant-design/react-native';

const Relay = (props) => {
    return (
        <View>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                
            </ScrollView>
        </View>
    )
}

export default Relay;