import React, { useEffect, useRef } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './src/Screens/Onboarding/Onboarding1/Onboarding.screen';
import Onboarding2Screen from './src/Screens/Onboarding/Onboarding2/Onboarding2.screen';
import { NavigationContainer } from '@react-navigation/native';
import { SCREEN_ROUTES } from './src/utils/Navigation/Routes';
import SignupScreen from './src/Screens/Signup/Signup.screen';
import Onboarding3Screen from './src/Screens/Onboarding/Onboarding3/Onboarding3.screen';
import LoginScreen from './src/Screens/Login/Login.screen';
import HomeScreen from './src/Screens/HomeScreen/Home.screen';
import SearchPropertyScreen from './src/Screens/SearchProperty/SearchProperty.screen';
import AddPropertyScreen from './src/Screens/AddPropertyScreen/AddProperty.screen';
import MyPortfolioScreen from './src/Screens/PortfolioScreen/MyPortfolio.screen';
import MyProfileScreen from './src/Screens/MyProfile/MyProfile.screen';
import RadarScreen from './src/Screens/RadarScreen/Radar.screen';
import SearchListingPageScreen from './src/Screens/SearchListingPage/SearchListingPage.screen';
import firebase from '@react-native-firebase/app';
import SplashScreen from './src/Screens/SplashScreen/Splash.screen';
import RadarPropertyDetailScreen from './src/Screens/RadarScreen/RadarPropertyDetail.screen';
import {LogBox, SafeAreaView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './src/Components/BottomTab.component'
import FlashMessage from 'react-native-flash-message';
const firebaseConfig = {
  apiKey: "AIzaSyAQsvVbGT9StZUTQauHUxf-briWzWzA3ts",
  authDomain: "landlordlab-5c156.firebaseapp.com",
  projectId: "landlordlab-5c156",
  storageBucket: "landlordlab-5c156.appspot.com",
  messagingSenderId: "39160415029",
  appId: "1:39160415029:web:cbaa45a49f2fc5b220c27c",
  measurementId: "G-40J15NEMWF",
  databaseURL:"https://console.firebase.google.com/u/1/project/landlordlab-5c156/database/landlordlab-5c156-default-rtdb/data/~2F"
};
console.log(firebase.apps)
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}
export default App = (props) => {
  
  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();

  const ExploreStack = () => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen
        name={SCREEN_ROUTES.SearchPropertyScreen}
        component={SearchPropertyScreen}
        />
       <Stack.Screen
        name={SCREEN_ROUTES.searchListingScreen}
        component={SearchListingPageScreen}
        />
       
      </Stack.Navigator>
    )
  }

  const RadarStack = () => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen
        name={SCREEN_ROUTES.radar}
        component={RadarScreen}
        />
       <Stack.Screen
        name={SCREEN_ROUTES.RadarPropertyDetail}
        component={RadarPropertyDetailScreen}
        />
       
      </Stack.Navigator>
    )
  }


  const PortfolioStack = () => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen
        name={SCREEN_ROUTES.myPortfolio}
        component={MyPortfolioScreen}
        />
       <Stack.Screen
        name={SCREEN_ROUTES.RadarPropertyDetail}
        component={RadarPropertyDetailScreen}
        />
       
      </Stack.Navigator>
    )
  }

  const BottomTabNavigator = () => {
    return (
      <BottomTab.Navigator
      screenOptions={{
        headerShown:false
      }}
      tabBar={(props) => (
        <CustomBottomTab
        active={props.state.index}
        {...props}
        />
      )}
     >
        <BottomTab.Screen
        name={SCREEN_ROUTES.home}
        component={HomeScreen}
        />
         <BottomTab.Screen
        name={SCREEN_ROUTES.exploreScreen}
        component={ExploreStack}
        />
         <BottomTab.Screen
        name={SCREEN_ROUTES.myPortfolio}
        component={PortfolioStack}
        />
         <BottomTab.Screen
        name={SCREEN_ROUTES.radar}
        component={RadarStack}
        />
      </BottomTab.Navigator>
    )
  }

  // Initialize Firebase
  
  const AuthStack = ()  => {
    return (
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen
        name={SCREEN_ROUTES.splash}
        component={SplashScreen}
        />
      <Stack.Screen
        name={SCREEN_ROUTES.ob1}
        component={OnboardingScreen}
        />
           <Stack.Screen
        name={SCREEN_ROUTES.ob2}
        component={Onboarding2Screen}
        />
         <Stack.Screen
        name={SCREEN_ROUTES.ob3}
        component={Onboarding3Screen}
        />
        <Stack.Screen
        name={SCREEN_ROUTES.signup}
        component={SignupScreen}
        />
         <Stack.Screen
        name={SCREEN_ROUTES.login}
        component={LoginScreen}
        />
      </Stack.Navigator>
    )
  }
  
  LogBox.ignoreAllLogs()

  const MainNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
         <Stack.Screen
        name={SCREEN_ROUTES.Auth}
        component={AuthStack}
        />
        
         <Stack.Screen
        name={SCREEN_ROUTES.HomeNav}
        component={BottomTabNavigator}
        />
         
         <Stack.Screen
        name={SCREEN_ROUTES.searchListingScreen}
        component={SearchListingPageScreen}
        />
       <Stack.Screen
        name={SCREEN_ROUTES.myProfile}
        component={MyProfileScreen}
        />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <FlashMessage
      position={'top'}
      />
     <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
      <MainNavigator/>
     </SafeAreaView>
    </NavigationContainer>
  );
};