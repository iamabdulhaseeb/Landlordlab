import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
export default MyPortfolio = props => {
    useEffect(() => {
        auth().onAuthStateChanged(user => {
         if(user) {
            props.navigation.replace(SCREEN_ROUTES.HomeNav);
         } else {
            props.navigation.replace(SCREEN_ROUTES.ob1);
         }
        })
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: 'black',justifyContent:'center',alignItems:'center' }}>
            <Text style={{color:'white',fontSize:30,fontWeight:'900'}}>LANDLORDLAB</Text>
        </View>
    )
}