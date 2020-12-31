import React from 'react'
import { View } from 'react-native'
import { Content } from "native-base";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default Placeholders = ({count}) => {
    let arr = []
    for (let i = 0; i < count; i++) {
        arr.push(
            <Placeholder
                style={{ marginLeft: 10 }}
                Animation={Fade}
                Left={PlaceholderMedia}
                key={i}
            >
                <PlaceholderLine width={60} />
                <PlaceholderLine width={90} />
            </Placeholder>
        )
    }
    return (<Content padder>{arr}</Content>)
}