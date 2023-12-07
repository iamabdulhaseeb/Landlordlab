import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
export default Input = ({icon,placeholder,onPress,onChangeText,value,width,isButton}) => {
    if(isButton) {
       return (

        <TouchableOpacity
        onPress={onPress}
        style={{
            width: width ? width : '100%',
            height: 47,
            backgroundColor: '#1a1a1a',
            alignSelf: 'center',
            borderRadius: 5,
            flexDirection: "row", alignItems: 'center', paddingLeft: 10,
            marginVertical: 8,
            shadowColor: "#dcdcdc",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        }}>
            {icon}
            <Text style={{color:'white',paddingLeft:10}}>{value ? value : "Property Type"}</Text>
            {/* <TextInput
                value={value}
                onChangeText={onChangeText}
                style={{ flex: 1, paddingLeft: 10,color:'white' }}
                placeholder={placeholder}
                placeholderTextColor="#fff"
            /> */}
        </TouchableOpacity>
       )
    } else {
        return (
            <View style={{
                width: width ? width : '100%',
                height: 47,
                backgroundColor: '#1a1a1a',
                alignSelf: 'center',
                borderRadius: 5,
                flexDirection: "row", alignItems: 'center', paddingLeft: 10,
                marginVertical: 8,
                shadowColor: "#dcdcdc",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
    
                elevation: 3,
            }}>
                {icon}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={{ flex: 1, paddingLeft: 10,color:'white' }}
                    placeholder={placeholder}
                    placeholderTextColor="#fff"
                />
            </View>
        )
    }
   
}