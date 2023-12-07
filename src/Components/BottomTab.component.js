import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo'
import { SCREEN_ROUTES } from '../utils/Navigation/Routes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../utils/Colors';
const BottomTabBar = ({active}) => {
  const activeTab = active;

  const navigation = useNavigation();
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity
        style={styles.tabBarButton}
        onPress={() => {
          navigation.navigate(SCREEN_ROUTES.home);
          // setActiveTab('Dashboard')
        }}
      >
        <MaterialCommunityIcons
          name={activeTab === 0 ? 'view-dashboard' : 'view-dashboard-outline'}
          size={24}
          color={activeTab === 0 ? COLORS.primary : 'gray'}
        />
        <Text
          style={[
            styles.tabBarLabel,
            { color: activeTab === 0 ? COLORS.primary : 'gray' },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabBarButton}
        onPress={() => {
          navigation.navigate(SCREEN_ROUTES.exploreScreen);
          // setActiveTab('Dashboard')
        }}
      >
        <AntDesign
          name={'search1'}
          size={24}
          color={activeTab === 1 ? COLORS.primary : 'gray'}
        />
        <Text
          style={[
            styles.tabBarLabel,
            { color: activeTab === 1 ? COLORS.primary : 'gray' },
          ]}
        >
          Explore
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.tabBarButton}
        onPress={() => {
          navigation.navigate(SCREEN_ROUTES.myPortfolio);
          // setActiveTab('Dashboard')
        }}
      >
        <MaterialCommunityIcons
          name={'briefcase'}
          size={24}
          color={activeTab === 2 ? COLORS.primary : 'gray'}
        />
        <Text
          style={[
            styles.tabBarLabel,
            { color: activeTab === 2 ? COLORS.primary : 'gray' },
          ]}
        >
          My Portfolio
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.tabBarButton}
        onPress={() => {
          navigation.navigate(SCREEN_ROUTES.radar);
          // setActiveTab('Dashboard')
        }}
      >
        <MaterialCommunityIcons
          name={'radar'}
          size={25}
          color={activeTab === 3 ? COLORS.primary : 'gray'}
        />
        <Text
          style={[
            styles.tabBarLabel,
            { color: activeTab === 3 ? COLORS.primary : 'gray' },
          ]}
        >
          Radar
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    elevation: 5,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  plusButton: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabBar;