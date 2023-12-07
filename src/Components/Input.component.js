import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../utils/Colors';

const Input = ({icon,value,onChangeText,placeholder,width,secureTextEntry}) => {
    // const {width,height} = useWindowDimensions();
  return (
    <View style={{
        width: width ? width : '100%',
        height: 47,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: "row", alignItems: 'center', paddingLeft: 10,
        marginVertical: 3,

    }}>
        {icon}
        <TextInput
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={{ flex: 1, paddingLeft: 10,color:'white' }}
            placeholder={placeholder}
            placeholderTextColor="#fff"
        />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Input;