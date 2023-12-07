import { useNavigation } from "@react-navigation/native";
import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_ROUTES } from "../utils/Navigation/Routes";
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default Header = props => {
    const navigation = useNavigation();
    const [user,setUser] = useState(null);

    useEffect(() => {
        auth().onAuthStateChanged(user => {
       setUser(user);
        })
    },[])
    return (
        <View style={{
            width: '100%',
            height: 80,
            borderBottomWidth: 0.3,
            borderBlockColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            // backgroundColor:'#1a1a1a'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Ionicons
                    name='menu'
                    color='white'
                    size={30}
                /> */}
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '800', marginLeft: 10 }}>LANDLORDLAB</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name='contact-support'
                    color='white'
                    size={30}
                />
                <TouchableOpacity 
                onPress={() => {
                    navigation.navigate(SCREEN_ROUTES.myProfile)
                }}
                style={{
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 35 / 2,
                    marginLeft: 10
                }}>
                    <Text>{user?.email[0].toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}