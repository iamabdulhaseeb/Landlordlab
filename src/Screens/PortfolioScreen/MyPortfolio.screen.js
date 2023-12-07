import React, { useEffect, useState } from "react";
import { View, Text,Pressable, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from "../../utils/Colors";
import CustomTabBar from "../../Components/BottomTab.component";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GradientSlider from "../../Components/GradientSlider.component";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from "../../Components/Loader.component";
import HeaderComponent from "../../Components/Header.component";
import { useIsFocused } from "@react-navigation/native";
export default MyPortfolio = props => {
    const { width, height } = useWindowDimensions();
    const [portfolios,setPortfolios] = useState([]);
    const [propertiesPortfolios,setPropertiesPortfolios] = useState([]);
    const [radarPortfolio,setRadarPortfolio] = useState([]);
    const [loading,setLoading] = useState(true);
    const isFocused = useIsFocused();
    const [user,setUser] = useState([]);
    const TABS = {
        1:'Properties',
        2:'Radar'
    }

    const [selectedTab,setSelectedTab] = useState(TABS['2']);
    const isPropertiesTab = selectedTab == TABS['1'];
    const isRadarTab = selectedTab == TABS['2'];
  

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            setUser(user)
        })
    },[])

    const _filterRadarProperties = () => {
        let all_radar_portfolios = portfolios.filter(item => item.isRadar);
        let all_props_portfolios = portfolios.filter(item => !item.isRadar);
        setRadarPortfolio(all_radar_portfolios);
        setPropertiesPortfolios(all_props_portfolios);
    }

    const _getMyPortfolios = async() => {
        firestore().collection('portfolios').where('userId','==',"S7ra2JONRCNL9pbmf4Ush32KT6U2").get().then(res => {
            let myPortfoliosData = [];
            res.forEach(p => {
                myPortfoliosData.push(p.data());
            })
            console.log('line 30',myPortfoliosData);
            setPortfolios(myPortfoliosData);
            setLoading(false);
        }).catch(e => {
            setLoading(false);
            console.log(e);
        });
        setLoading(false);
    }
    useEffect(() => {
        if(user) {
            _getMyPortfolios()
        }
    },[user,isFocused])
    useEffect(() => {
        if(portfolios?.length > 0) {
            _filterRadarProperties();
        }
    },[portfolios]);
    const Header = props => {
        return (
            <View style={{
                width: '100%',
                height: 80,
                borderBottomWidth: 0.3,
                borderBlockColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                // backgroundColor:'#1a1a1a'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name='menu'
                        color='white'
                        size={30}
                    />
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>LANDLORDLAB</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name='notifications-outline'
                        color='white'
                        size={30}
                    />
                    <TouchableOpacity style={{
                        width: 35,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 35 / 2,
                        marginLeft: 10
                    }}>
                        <Text>AH</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    const Input = ({ placeholder, icon,width }) => {
        return (
            <View style={{
                width: width ? width : '100%',
                height: 47,
                backgroundColor: '#1a1a1a',
                alignSelf: 'center',
                borderRadius: 5,
                flexDirection: "row", alignItems: 'center', paddingLeft: 10,
                marginVertical: 8,
                shadowColor: "#dcdcdc",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
            }}>
                {icon}
                <TextInput
                    style={{ flex: 1, paddingLeft: 10 }}
                    placeholder={placeholder}
                    placeholderTextColor="#fff"
                />
            </View>
        )
    }

    
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <HeaderComponent />
            <Loader
            isVisible={loading}
            />
            {/* <View style={{
                    width:'90%',
                    height:38,
                    borderRadius:5,
                    alignSelf:'center',
                    backgroundColor:COLORS.secondary,
                    marginTop:15,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-evenly'
                }}>
                    <TouchableOpacity
                    onPress={() => setSelectedTab(TABS['1'])}
                    style={{
                        width:'48%',
                        height:30,
                        backgroundColor:isPropertiesTab ?  'black' : 'transparent',
                        borderRadius:5,
                        justifyContent:'center',alignItems:'center'
    
                    }}>
                        <Text style={{color:'white',fontWeight:'bold'}}>Properties</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        setSelectedTab(TABS['2'])
                    }}
                    style={{
                        width:'48%',
                        height:30,
                        backgroundColor:isRadarTab ?  'black' : 'transparent',
                        borderRadius:5,
                        justifyContent:'center',alignItems:'center'
    
                    }}>
                        <Text style={{color:'white',fontWeight:'bold'}}>Radar</Text>
    
                    </TouchableOpacity>
                </View> */}
            <ScrollView contentContainerStyle={{flexGrow:1,paddingTop:20}}>
            
           {
            propertiesPortfolios?.length > 0 && isPropertiesTab ?
            <FlatList
            data={propertiesPortfolios}
            //  contentContainerStyle={{marginTop:10}}
            renderItem={({ item }) => (
                <Pressable
                // onPress={() => {
                //     _addToPortfolio(item)
                // }}
                onPress={() => {
                    if(item?.isRadar) {
                        props.navigation.navigate(SCREEN_ROUTES.RadarPropertyDetail,{
                            radarId:item?.RadarID,
                            item:item
                        })
                    }
                }}
                style={{
                    width: '100%',
                    borderBottomWidth: 0.3,
                    borderColor: 'white',
                    marginVertical: 5,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10
                }}>
                    <View style={{width:'75%'}}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15, fontWeight: '500',
                            width: '80%'
                        }}>{item?.isRadar ? item.Address :  item.formattedAddress}</Text>
                      {
                        item?.isRadar ? 
                        <Text style={{
                            color: 'white',
                            fontSize: 12, fontWeight: '400'
                        }}>{item?.Beds ? `${item?.Beds} Beds  .` :  ''} {item?.Baths ? `${item?.Baths} Bathrooms  .` : ''} {item?.SqFt ? `${item?.SqFt} Sqft`:''}</Text>
                        :
                        <Text style={{
                            color: 'white',
                            fontSize: 12, fontWeight: '400'
                        }}>{item?.bedrooms} Beds . {item?.bathrooms} Bathrooms . {item?.features?.roomCount} Rooms</Text>
                      }
                        <Text style={{
                            color: 'white',
                            fontSize: 12, fontWeight: '400'
                        }}>3 miles . 1 day ago</Text>
                    </View>
                    <Text style={{
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: 20,
                        right: 12
                    }}>$1,227</Text>
                </Pressable>

            )}
        />
            :
            radarPortfolio?.length > 0 && isRadarTab ?
            <FlatList
            data={radarPortfolio}
            //  contentContainerStyle={{marginTop:10}}
            renderItem={({ item }) => (
                <Pressable
                // onPress={() => {
                //     _addToPortfolio(item)
                // }}
                onPress={() => {
                    if(item?.isRadar) {
                        props.navigation.navigate(SCREEN_ROUTES.RadarPropertyDetail,{
                            radarId:item?.RadarID,
                            item:item
                        })
                    }
                }}
                style={{
                    width: '100%',
                    borderBottomWidth: 0.3,
                    borderColor: 'white',
                    marginVertical: 5,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10
                }}>
                    <View style={{width:'75%'}}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15, fontWeight: '500',
                            width: '80%'
                        }}>{item?.isRadar ? item.Address :  item.formattedAddress}</Text>
                      {
                        item?.isRadar ? 
                        <Text style={{
                            color: 'white',
                            fontSize: 12, fontWeight: '400'
                        }}>{item?.Beds ? `${item?.Beds} Beds  .` :  ''} {item?.Baths ? `${item?.Baths} Bathrooms  .` : ''} {item?.SqFt ? `${item?.SqFt} Sqft`:''}</Text>
                        :
                        <Text style={{
                            color: 'white',
                            fontSize: 12, fontWeight: '400'
                        }}>{item?.bedrooms} Beds . {item?.bathrooms} Bathrooms . {item?.features?.roomCount} Rooms</Text>
                      }
                        <Text style={{
                            color: 'white',
                            fontSize: 12, fontWeight: '400'
                        }}>3 miles . 1 day ago</Text>
                    </View>
                    <Text style={{
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: 20,
                        right: 12
                    }}>${item?.AVM}</Text>
                </Pressable>

            )}
        />:
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Ionicons
            name='analytics-outline'
            color={COLORS.primary}
            size={100}
            />
            <Text style={{
                fontSize:20,
                fontWeight:'bold',
                color:'white',
                textAlign:'center',
                marginVertical:15
            }}>
            No Properties Added to Portfolio
            </Text>
            <Text style={{
                fontSize:13,
                fontWeight:'300',
                color:'white',
                textAlign:'center',
                width:'80%',
                alignSelf:'center'
            }}>
                LandLordLab can help you keep your favorite properties in pocket, save properties which you like here
            </Text>
            <TouchableOpacity 
            onPress={() => {
props.navigation.navigate(SCREEN_ROUTES.SearchPropertyScreen)
            }}
            style={{
                width:'70%',
                alignSelf:'center',
                height:40,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:COLORS.primary,
                borderRadius:5,
                marginTop:20,
            }}>
                <Text style={{
                    fontWeight:'bold',
                    fontSize:14,
                    color:'white'
                }}>Add Property</Text>
            </TouchableOpacity>
        </View>
           }

            </ScrollView>
           
        </View>
    )
}