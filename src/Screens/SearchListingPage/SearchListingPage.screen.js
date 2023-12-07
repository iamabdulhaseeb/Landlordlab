import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable } from 'react-native';
import { COLORS } from "../../utils/Colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientSlider from "../../Components/GradientSlider.component";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default SearchListingPage = props => {
    const { params } = useRoute();
    const [user,setUser] = useState(null);
    const data = params?.data;
    const TABS = {
        1: 'Properties',
        2: 'Market Statistics'
    }
    const isPropertyTab = params?.type == TABS['1'];
    const isRadar = params?.isRadar;

   
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            
            setUser(user);
        })
    },[])

    const _addToPortfolio = async(item) => {
        try {
            const body = {
                isRadar:isRadar,
                ...item,
                type:params?.type,
                userId:user?.uid
            }
            if(isRadar) {
                body.id = item.RadarID;
            }
            firestore().collection('portfolios').add(body).then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            });
        }   
        catch(e) {
            console.log(e);
        }
    }

    // useEffect(() => {
    //     alert(JSON.stringify(data))
    // },[])


    const [properties, setProperties] = useState(data);
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ width: '100%', paddingLeft: 12, paddingTop: 12, height: 55, borderBottomWidth: 0.3, borderBottomColor: 'white' }}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    // onPress={_addToPortfolio}
                    style={{
                        flexDirection: 'row', alignItems: 'center'
                    }}>
                    <MaterialCommunityIcons
                        name='keyboard-backspace'
                        color='white'
                        size={25}
                    />
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '500', paddingLeft: 12 }}>{"Listing"}</Text>
                </TouchableOpacity>

                {/* <View style={{width:'85%',marginLeft:12,backgroundColor:COLORS.secondary,borderRadius:10,height:35}}>
                <TextInput
                placeholder="Your Address"
                placeholderTextColor={'grey'}
                style={{flex:1,paddingLeft:12}}
                />
                </View> */}
            </View>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: COLORS.secondary, alignItems: 'center', padding: 12, width: '100%' }}>
                <Ionicons
                    name='location-sharp'
                    color='white'
                    size={22}
                />
                <Text style={{ color: 'white', fontSize: 13, paddingLeft: 12 }}>{params?.input}</Text>
            </View>

                {/* <Text style={{color:'white'}}>{JSON.stringify(data)}</Text> */}

          <ScrollView contentContainerStyle={{flexGrow:1}}>
          {
                isPropertyTab ?
                    <FlatList
                        data={data}
                        //  contentContainerStyle={{marginTop:10}}
                        renderItem={({ item }) => (
                            <Pressable
                            // onPress={() => {
                            //     _addToPortfolio(item)
                            // }}
                            onPress={() => {
                                if(isRadar) {
                                    props.navigation.navigate(SCREEN_ROUTES.RadarPropertyDetail,{
                                        radarId:item?.RadarID,
                                        item:item
                                    })
                                } else {
                                    alert(JSON.stringify(item))
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
                                    }}>{isRadar ? item.Address :  item.formattedAddress}</Text>
                                  {
                                    isRadar ? 
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>{item?.Beds ? `${item?.Beds} Beds  .` :  ''} {item?.Baths ? `${item?.Baths} Bathrooms  .` : ''} {item?.SqFt ? `${item?.SqFt} Sqft`:''}</Text>
                                    :
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>{item?.bedrooms ? `${item.bedrooms} bedrooms . ` : ''}{item?.bathrooms ? `${item.bathrooms} bathrooms . ` : ''}{item?.features?.roomCount ? `${item?.features?.roomCount} Rooms`  : ''}</Text>
                                  }
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>3 miles . 1 day ago</Text>
                                </View>
                               {
                                item?.lastSalePrice && 
                                <Text style={{
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    right: 12
                                }}>${item?.lastSalePrice}</Text>
                               }
                            </Pressable>

                        )}
                    />
                    :
                    <View style={{ flex: 1 }}>
                          <View style={{width:'95%',alignSelf:'center',backgroundColor:COLORS.secondary,padding:10,marginVertical:12}}>
                                <View style={{
                                    alignSelf: 'center',
                                    height: 30,
                                    backgroundColor: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30,
                                    paddingHorizontal: 20
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>Estimated Monthly Rent</Text>
                                </View>
                                <Text style={{ fontWeight: '300', color: 'white', marginVertical: 5, textAlign: 'center' }}>In Your Area</Text>

                                <Text style={{ fontSize: 25,fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{data?.rentalData?.averageRent}$</Text>

                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                                    <Text style={{color:'white'}}>Total Listings: 88</Text>
                                </View>

                                <GradientSlider
                                lowEstimation={data?.rentalData?.minRent}
                                highEstimation={data?.rentalData?.maxRent}
                                />

                            </View>

                            <FlatList
                        data={isRadar ? data?.rentalData?.dataByBedrooms : data}
                        //  contentContainerStyle={{marginTop:10}}
                        renderItem={({ item }) => (
                            <View style={{
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
                                <View>
                                  
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>{item?.bedrooms} Beds . {item?.minRent}$ - {item?.maxRent}$ </Text>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>Total Listings: {item?.totalListings}</Text>
                                </View>
                                <Text style={{
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    right: 12
                                }}>${item?.averageRent}</Text>
                            </View>

                        )}
                    />
                    </View>
            }
          </ScrollView>
        </View>
    )
}