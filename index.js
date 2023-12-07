/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';

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
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
AppRegistry.registerComponent(appName, () => App);
