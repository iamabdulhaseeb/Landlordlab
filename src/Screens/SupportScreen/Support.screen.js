import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../utils/Colors";
import CustomTabBar from "../../Components/BottomTab.component";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GradientSlider from "../../Components/GradientSlider.component";
import { Api } from "../../utils/Api/api";
import { API_URLS } from "../../utils/Api/API_URLS";
import axios from "axios";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import SearchInputComponent from "../../Components/SearchInput.component";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from "../../Components/Loader.component";
import HeaderComponent from "../../Components/Header.component";
export default SupportScreen = props => {
   
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
           
            <HeaderComponent />
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{
                width:'80%',
                height:250,
                backgroundColor:COLORS.secondary,
                borderRadius:10
            }}>

            </View>
            </View>
        </View>
    )
}