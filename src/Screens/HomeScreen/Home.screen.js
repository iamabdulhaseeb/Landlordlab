import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from "../../utils/Colors";
import CustomTabBar from "../../Components/BottomTab.component";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GradientSlider from "../../Components/GradientSlider.component";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import HeaderComponent from "../../Components/Header.component";
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import { Api } from "../../utils/Api/api";
import Geocoder from 'react-native-geocoding';
import SearchInputComponent from "../../Components/SearchInput.component";

export default HomeScreen = props => {


    const [rentEstimate, setRentEstimate] = useState(null);
    const [rentArvEstimate,setRentArvEstimate] = useState(null);
    const [rentalListings,setRentalListings] = useState(null);
    const [myLocation,setMyLocation] = useState({
        latitude:null,
        longitude:null,
        address:null
    })


    const _getEsimatedMonthlyRent = async () => {
        try {
            const api = new Api();
            const response = await axios.get(`https://api.rentcast.io/v1/avm/rent/long-term?latitude=${myLocation.latitude}&longitude=${myLocation.longitude}`, {
                headers: {
                    'X-Api-Key': '0b5c390d81fc431e9b72dda95b275664'
                }
            });
            setRentEstimate(response.data);
        }
        catch (e) {
            alert(JSON.stringify(e?.response?.data?.message))
        }
    }
   


    const _getNearbyListings = async() => {
        try {
            const api = new Api();
            const response = await axios.get(`https://api.rentcast.io/v1/listings/rental/long-term?latitude=${myLocation?.latitude}&longitude=${myLocation?.longitude}&limit=10`,{
                headers:{
                    'X-Api-Key': '0b5c390d81fc431e9b72dda95b275664'
                }
            });
            setRentalListings(response.data);
        }
        catch(e) {
            alert(JSON.stringify(e?.response?.data?.message))
        }
    }

    const _getEstimatdARV = async () => {
        try {
            const api = new Api();
            const response = await axios.get(`https://api.rentcast.io/v1/avm/value?latitude=${myLocation?.latitude}&longitude=${myLocation?.longitude}`, {
                headers: {
                    'X-Api-Key': '0b5c390d81fc431e9b72dda95b275664'
                }
            });
            setRentArvEstimate(response.data);
        }
        catch (e) {
            alert(JSON.stringify(e?.response?.data?.message))
        }
    }

    const _getCurrentLocation = async () => {
        try {
            Geocoder.init("AIzaSyBiLWsQ5b0D4I6CgWkKdYkqFsH2LHiogXI"); // use a valid API key
            Geolocation.getCurrentPosition(info => {
                Geocoder.from(info.coords.latitude,info.coords.longitude).then(res => {
                    console.log(res.results[0].formatted_address);
                    setMyLocation({
                        latitude:info.coords.latitude,
                        longitude:info.coords.longitude,
                        address:res.results[0].formatted_address
                    })
                }).catch(e => {
                    console.log(e)
                })
            });
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        _getCurrentLocation();
    }, [])
    useEffect(() => {
       if(myLocation.latitude && myLocation.longitude) {
        _getEsimatedMonthlyRent()
        _getEstimatdARV();
        _getNearbyListings()
       }
    }, [myLocation.latitude,myLocation.longitude]);
    const { width, height } = useWindowDimensions();

    const Input = ({ placeholder, icon, width }) => {
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}>
                <View style={{
                    width: '90%',
                    height: 100,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 10
                }}>
                    <Ionicons
                        name='location-sharp'
                        color='white'
                        size={29}
                    />
                    <View style={{ width: '80%', paddingLeft: 12 }}>
                        <Text style={{ color: 'white' }}>Your Current Location</Text>
                        <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{myLocation?.address}</Text>
                    </View>
                </View>
                <SearchInputComponent
                value='Search Properties'
                isButton={true}
                onPress={() => props.navigation.navigate(SCREEN_ROUTES.exploreScreen)}
                    width={'90%'}
                    placeholder='Search Properties'
                    icon={
                        <EvilIcons
                            name='search'
                            color='white'
                            size={19}
                        />
                    }
                />
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: '#1a1a1a',
                    borderRadius: 10,
                    marginVertical: 10,
                    padding: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>My Portfolio</Text>
                    <Text style={{ color: 'white', marginTop: 5, fontSize: 11, fontWeight: '300' }}>Add properties to favorites and keep an updated portfolio in your pocket</Text>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate(SCREEN_ROUTES.SearchPropertyScreen)
                        }}
                        style={{
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: COLORS.primary,
                            borderRadius: 5,
                            marginTop: 20,
                            width: 150,
                            borderWidth: 1
                        }}>
                        <Text style={{ color: 'white' }}>+ Add Property</Text>
                    </TouchableOpacity>

                </View>


                <View style={{
                    width: '90%',
                    backgroundColor: '#1a1a1a',
                    alignSelf: 'center',
                    borderRadius: 10,
                    padding: 20,
                    marginVertical: 10,
                    marginBottom: 20
                }}>

                    {
                        rentEstimate ?
                            <View style={{ flex: 1 }}>
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

                                <Text style={{ fontSize: 25, marginVertical: 5, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{rentEstimate?.rent}$</Text>

                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>${(rentEstimate?.comparables[0]?.squareFootage / rentEstimate?.comparables[0]?.price).toFixed(2)}</Text>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>per Sqft</Text>
                                    </View>

                                    <View
                                        style={{
                                            borderWidth: 0.3,
                                            height: 30,
                                            borderColor: 'white',
                                            marginHorizontal: 20
                                        }}
                                    />
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>${(rentEstimate?.comparables[rentEstimate?.comparables?.length - 1]?.squareFootage / rentEstimate?.comparables[rentEstimate?.comparables?.length - 1]?.price).toFixed(2)}</Text>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>per Sqft</Text>
                                    </View>
                                </View>

                                <GradientSlider
                                lowEstimation={rentEstimate?.rentRangeLow}
                                highEstimation={rentEstimate?.rentRangeHigh}
                                />

                            </View>
                            :
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <ActivityIndicator
                                size={'large'}
                                color={'white'}
                                />
                                <Text style={{fontSize:12,color:'white',fontWeight:'300',padding:10}}>Loading Estimated Monthly Rent</Text>
                            </View>

            }

                </View>


                <View style={{
                    width: '90%',
                    backgroundColor: '#1a1a1a',
                    alignSelf: 'center',
                    borderRadius: 10,
                    padding: 20,
                    marginVertical: 10,
                    marginBottom: 20
                }}>
                     
                     {
                        rentArvEstimate ? 
                        <View>
                             <View style={{
                        alignSelf: 'center',
                        height: 30,
                        backgroundColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        paddingHorizontal: 20
                    }}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>Estimated ARV</Text>
                    </View>
                    <Text style={{ fontWeight: '300', color: 'white', marginVertical: 5, textAlign: 'center' }}>In Your Area</Text>

                    <Text style={{ fontSize: 25, marginVertical: 5, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{rentArvEstimate?.price}$</Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>${(rentArvEstimate?.comparables[0]?.squareFootage / rentArvEstimate?.comparables[0]?.price).toFixed(2)}</Text>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>per Sqft</Text>
                        </View>

                        <View
                            style={{
                                borderWidth: 0.3,
                                height: 30,
                                borderColor: 'white',
                                marginHorizontal: 20
                            }}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>${(rentArvEstimate?.comparables[rentArvEstimate?.length]?.squareFootage / rentArvEstimate?.comparables[0]?.price).toFixed(2)}</Text>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>per Sqft</Text>
                        </View>
                    </View>

                    <GradientSlider 
                    lowEstimation={rentArvEstimate?.priceRangeLow}
                    highEstimation={rentArvEstimate?.priceRangeHigh}
                    />
                            </View>
                            :
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator
                            size={'large'}
                            color={'white'}
                            />
                            <Text style={{fontSize:12,color:'white',fontWeight:'300',padding:10}}>Loading Estimated After Repair Rent Value (ARV)</Text>
                        </View>
                     }

                </View>

                    
                    <View style={{
                        width:'90%',
                        height:150,
                        borderRadius:10,
                        backgroundColor: '#1a1a1a',
                        alignSelf:'center',
                        marginBottom:20,
                        padding:12
                        // marginVertical:10,
                    
                    }}>
                        <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>LANDLORDLAB RADAR</Text>
                        <Text style={{color:'white',fontSize:12,paddingVertical:10}}>Try this exclusive feature, search properties and get access to the owners of properties</Text>
                        <TouchableOpacity 
                        onPress={() => props.navigation.navigate(SCREEN_ROUTES.radar)}
                        style={{
                            width:120,
                            height:35,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:COLORS.primary,
                            borderRadius:5,
                            marginVertical:10
                        }}>
                            <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>TRY NOW</Text>
                        </TouchableOpacity>
                    </View>

                <View style={{
                    width: '90%',
                    backgroundColor: '#1a1a1a',
                    alignSelf: 'center',
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}> Nearby Rental Listings</Text>
                        <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate(SCREEN_ROUTES.SearchPropertyScreen)
                        }}
                        >
                            <EvilIcons
                                name='search'
                                color='white'
                                size={28}
                            />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={rentalListings}
                        contentContainerStyle={{ marginTop: 10 }}
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
                            }}>
                                <View style={{width:'75%'}}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 15, fontWeight: '500',
                                        width:'60%'
                                    }}>{item?.formattedAddress}</Text>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>{item?.bedrooms} Beds . {item?.bathrooms} Bathrooms . {item?.squareFootage} sqft</Text>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12, fontWeight: '400'
                                    }}>Listed {item?.daysOnMarket} days ago</Text>
                                </View>
                                <Text style={{
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    fontSize: 20
                                }}>${item?.price}</Text>
                            </View>

                        )}
                    />
                </View>



                {/* <View style={{
                    width: '90%',
                    backgroundColor: '#1a1a1a',
                    alignSelf: 'center',
                    borderRadius: 10,
                    padding: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Recent Searches</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name='dots-vertical'
                                color='white'
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={[1, 2, 3]}
                        contentContainerStyle={{ marginTop: 10 }}
                        renderItem={({ item }) => (
                            <View style={{
                                width: '100%',
                                height: 35,
                                borderBottomWidth: 0.3,
                                borderColor: 'white',
                                justifyContent: 'space-between',
                                marginVertical: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15, fontWeight: '500'
                                }}>Newyork,USA</Text>
                                <MaterialCommunityIcons
                                    name='delete-outline'
                                    color='white'
                                    size={22}
                                />
                            </View>
                        )}
                    />
                </View> */}


            </ScrollView>
            {/* <CustomTabBar
                activeTab={'Home'}
            /> */}
        </View>
    )
}