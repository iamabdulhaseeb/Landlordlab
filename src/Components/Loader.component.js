import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../utils/Colors';

const Loader = ({isVisible}) => {
  return (
    <Modal
    isVisible={isVisible}
    animationIn="fadeIn"
    animationOut="fadeOut"
    backdropOpacity={0.5}
    useNativeDriver
    style={styles.modal}
  >
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="white" />
      <Text style={{color:'white'}}>Loading...</Text>
    </View>
  </Modal>
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
  loaderContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;