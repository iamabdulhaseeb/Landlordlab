import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { COLORS } from '../../../utils/Colors';
import { SCREEN_ROUTES } from '../../../utils/Navigation/Routes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default Onboarding3 = (props) => {
  

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
          backgroundColor: 'black',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30,marginBottom:150, fontWeight: '800' }}>LANDLORDLAB</Text>
       
        <View style={{
          width: '90%',
          backgroundColor: '#3498db',
          alignSelf: 'center',
          margin: 20,
          borderRadius: 30,
          padding: 20,
          position: 'absolute',
          bottom: 10,
        }}>
            <Text style={{ paddingVertical: 5, color: 'white', fontSize: 25,fontWeight:'bold' }}>
            Lets Proceed
          </Text>
          <Text style={{ paddingVertical: 15, color: 'white', fontSize: 16 }}>
            Please proceed with the option most best for you! we recommend signing up
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
                props.navigation.navigate(SCREEN_ROUTES.signup)
            }}
          >
           <Text style={{color:COLORS.primary,fontSize:14,fontWeight:'bold'}}>REGISTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderRadius: 10,
              borderColor:'white',borderWidth:1,
              marginTop:10
            }}
            onPress={() => {
                props.navigation.navigate(SCREEN_ROUTES.login)
            }}
          >
           <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>LOGIN</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{
            alignSelf:'flex-end',
            marginVertical:10,
            flexDirection:'row',
            alignItems:'center'
          }}>
            <Text style={{
                color:'white',
                fontSize:17,
                fontWeight:'bold',
                marginRight:10
            }}>Skip & Continue</Text>
            <MaterialIcons
            name='navigate-next'
            color='white'
            size={20}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </ImageBackground>
  );
};