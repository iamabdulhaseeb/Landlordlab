import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SCREEN_ROUTES } from '../../../utils/Navigation/Routes';
import { COLORS } from '../../../utils/Colors';

export default Onboarding1 = (props) => {
  

  return (
    <ImageBackground
      source={{
        uri:
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
      }}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.99)',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30, fontWeight: '800' }}>LANDLORDLAB</Text>
        {/* <Image
          source={require('../../../../assets/Images/ob1.png')}
          style={{
            width: 300,
            height: 300,
            marginBottom: 200,
          }}
        /> */}
        <View style={{
          width: '90%',
          backgroundColor: COLORS.primary,
          alignSelf: 'center',
          margin: 20,
          borderRadius: 30,
          padding: 20,
          position: 'absolute',
          bottom: 10,
        }}>
            <Text style={{ paddingVertical: 5, color: 'white', fontSize: 25,fontWeight:'bold' }}>
            Rent Estimations
          </Text>
          <Text style={{ paddingVertical: 15, color: 'white', fontSize: 16 }}>
            An app where you can find properties, markets and also find the rent and prices of different areas
          </Text>
          <TouchableOpacity
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
            }}
            onPress={() => {
                props.navigation.navigate(SCREEN_ROUTES.ob2)
            }}
          >
            <Text style={{color:COLORS.primary,fontSize:14,fontWeight:'bold'}}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};