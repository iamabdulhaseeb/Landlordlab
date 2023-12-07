import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../utils/Colors';
import { SCREEN_ROUTES } from '../../utils/Navigation/Routes';
import auth from '@react-native-firebase/auth';
import Loader from '../../Components/Loader.component';
import { showMessage } from 'react-native-flash-message';
import { saveUser } from '../../utils/authservice';
const LoginScreen = (props) => {
  const {width,height} = useWindowDimensions();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const _login = async() => {
    try {
      if(!email) {
        alert('Please enter email');
        return;
      }
      if(!password) {
        alert('Please enter password');
        return;
      }
      setLoading(true);
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(async(res) => {
        showMessage({
          message:"Welcome to LandLordLab",
          type:'succes'
        })
        await saveUser(res.user);
        setLoading(false);
        props.navigation.navigate(SCREEN_ROUTES.home);
      })
      .catch(error => {
        if(error.code == 'auth/invalid-email') {
          showMessage({
            message:"Invalid Email Address",
            type:'danger',
            duration:4000
          });
          
        } else {
          showMessage({
            message:`Something went wrong please try again: ${error.code}`,
            type:'danger',
            duration:5000
          })
        }
        console.log('line 34',error.code)
        setLoading(false);
       
          });
    }
    catch(e) {
      setLoading(false);
      console.log(e)
    }
  }
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      <Loader
      isVisible={loading}
      />
      <TouchableOpacity 
      onPress={() => props.navigation.goBack()}
      style={{
        margin:10,
        top:20,
        left:20
      }}>
        <MaterialCommunityIcons
        name='keyboard-backspace'
        color='white'
        size={30}
        />
      </TouchableOpacity>
      <View style={styles.container}>
      <Text style={styles.header}>LANDLORDLAB</Text>
      <Text style={styles.subheader}>Login to continue to the App</Text>

      <View style={styles.inputContainer}>
       

        <View style={{
          width:width - 60,
          height:47,
          backgroundColor:'#1a1a1a',
          alignSelf:'center',
          borderRadius:5,
          flexDirection:"row",alignItems:'center',paddingLeft:10,
          marginVertical:8
        }}> 
        <MaterialCommunityIcons
        name='email-outline'
        color='white'
        size={20}
        />
        <TextInput
          style={{flex:1,paddingLeft:10,color:'white'}}
          placeholder="Email Address"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        </View>



        <View style={{
          width:width - 60,
          height:47,
          backgroundColor:'#1a1a1a',
          alignSelf:'center',
          borderRadius:5,
          flexDirection:"row",alignItems:'center',paddingLeft:10,
          marginVertical:8
        }}> 
        <AntDesign
        name='lock1'
        color='white'
        size={20}
        />
        <TextInput
        secureTextEntry
          style={{flex:1,paddingLeft:10,color:'white'}}
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={value => setPassword(value)}
        />
        </View>
      </View>

      <TouchableOpacity 
      onPress={_login}
      style={styles.signupButton}>
        <Text style={styles.signupButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>Dont have an account? <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN_ROUTES.signup)}><Text style={{color:'white',fontWeight:'bold',top:3,left:3}}>Register</Text></TouchableOpacity></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subheader: {
    marginTop: 10,
    color: '#fff',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    color: '#fff',
  },
  signupButton: {
    backgroundColor:COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width:305
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    marginTop: 20,
    color: '#fff',
  },
});

export default LoginScreen;