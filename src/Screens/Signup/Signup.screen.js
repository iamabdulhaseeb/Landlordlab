import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../utils/Colors';
import auth from '@react-native-firebase/auth';
import Loader from '../../Components/Loader.component';
import { SCREEN_ROUTES } from '../../utils/Navigation/Routes';
import { showMessage } from 'react-native-flash-message';

const SignupScreen = (props) => {
  const {width,height} = useWindowDimensions();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const _login = async() => {
    auth().signInWithEmailAndPassword(email,password).then(res => {
      console.log(res.user);
      props.navigation.replace(SCREEN_ROUTES.home)
     }).catch(e => {
      console.log(e);
     })
  }
  const _signup = async() => {
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
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        _login();
        console.log('User account created & signed in!');
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message:'That email address is already in use!',
            type:'danger',
            duration:4000
          });
          return;
        }
    
      else  if (error.code === 'auth/invalid-email') {
          showMessage({
            message:'That email address is invalid!',
            type:'danger',
            duration:4000
          })
          
        } 
        else if(error.code == 'auth/weak-password') {
          showMessage({
            message:`Please enter the strong password!`,
            type:'danger',
            duration:5000
          });
        }
        else {
          showMessage({
            message:`Something went wrong, please try again: ${error?.code}`,
            type:'danger',
            duration:5000
          });
        }
    
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
      <Text style={styles.subheader}>Please fill in the input below here to create an account</Text>

      <View style={styles.inputContainer}>
        {/* <View style={{
          width:width - 60,
          height:47,
          backgroundColor:'#1a1a1a',
          alignSelf:'center',
          borderRadius:5,
          flexDirection:"row",alignItems:'center',paddingLeft:10,marginVertical:8
        }}> 
        <Feather
        name='user'
        color='white'
        size={20}
        />
        <TextInput
          style={{flex:1,paddingLeft:10}}
          placeholder="Full Name"
          placeholderTextColor="#fff"
        />
        </View> */}
      

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
          value={email}
          onChangeText={value => setEmail(value)}
          style={{flex:1,paddingLeft:10,color:'white'}}
          placeholder="Email address"
          placeholderTextColor="#fff"
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
          value={password}
          secureTextEntry
          onChangeText={value => setPassword(value)}
          style={{flex:1,paddingLeft:10,color:'white'}}
          placeholder="Password"
          placeholderTextColor="#fff"
        />
        </View>
      </View>

      <TouchableOpacity 
      
      onPress={_signup}
      style={styles.signupButton}>
        <Text style={styles.signupButtonText}>SIGNUP</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>Already have an account? <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN_ROUTES.login)}><Text style={{color:'white',fontWeight:'bold',top:3,left:3}}>Login</Text></TouchableOpacity></Text>
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
    width:"80%",
    textAlign:"center",
    alignSelf:'center'
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

export default SignupScreen;