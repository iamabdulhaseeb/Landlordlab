import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from "../../utils/Colors";
import CustomTabBar from "../../Components/BottomTab.component";
import { Api } from "../../utils/Api/api";
import axios from "axios";
import SearchInputComponent from "../../Components/SearchInput.component";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import Loader from "../../Components/Loader.component";
import HeaderComponent from "../../Components/Header.component";
import PropertyTypeModal from "../../Components/PropertyTypesModalize.component";
import { Modalize } from "react-native-modalize";
import { showMessage } from "react-native-flash-message";

export default SearchProperty = props => {
    const TABS = {
        1:'Properties',
        2:'Market Statistics'
    }
    const { width, height } = useWindowDimensions();
    const [isSearched,setIsSearched] = useState(false);
    const [loading,setLoading] = useState(false);
    const [address,setAddress] = useState('');
    const [selectedTab,setSelectedTab] = useState(TABS['1']);
    const isPropertiesTab = selectedTab == TABS['1'];
    const [properties,setProperties] = useState([]);
    const [bathrooms,setBathrooms] = useState('');
    const [bedrooms,setBedrooms] = useState('');
    const [radius,setRadius] = useState('');
    const [propertyType,setPropertyType] = useState('');
    const [zipCode,setZipCode] = useState('');
    const [marketStats,setMarketStats] = useState([]);



    const criteria = {
        "Criteria": [
        //   {
        //     "name": "State",
        //     "value": [
        //       stat
        //     ]
        //   },
          {
            "name": "City",
            "value": [
              address
            ]
          },
          
          
        ]
      }

    const _getPropertiesFromCriteria = async() => {
        try {
            setLoading(true);
            const api = new Api();
            const response = await axios.post('https://api.propertyradar.com/v1/properties?Limit=500&Start=0&Purchase=1',criteria,{
                headers:{
                    'Authorization':'Bearer 2504c542c3f6e79afa5737f6ef1be09655d20e86'  
                }
            });
            setLoading(false);
            props.navigation.navigate(SCREEN_ROUTES.searchListingScreen,{
                data:response.data,
                input:address,
                type:TABS['1']
            })
            setProperties(response.data.results);
        }
        catch(e) {
            setLoading(false);
            alert(JSON.stringify(e));
        }
    }


    const _searchProperty = async() => {
        try {
            setLoading(true);
            const api = new Api();
            let url = `https://api.rentcast.io/v1/properties?city=${address}`;
            if(bedrooms) {
                url = url +  `&bedrooms=${bedrooms}`
            }
            if(bathrooms) {
                url = url +  `&bathrooms=${bathrooms}`
            }
            if(propertyType) {
                url = url +  `&propertyType=${propertyType}`
            }
            const response = await axios.get(url,{
                headers:{
                    'X-Api-Key': '0b5c390d81fc431e9b72dda95b275664'
                }
            });
            setLoading(false);
           setProperties(response.data.results);
           console.log(response.data)
        //    setIsSearched(true);
        props.navigation.navigate(SCREEN_ROUTES.searchListingScreen,{
            data:response.data,
            input:address,
            type:TABS['1'],
            isRadar:false
        })
        }
        catch(e) {
            setLoading(false);
            alert(JSON.stringify(e?.response?.data?.message))
        }
    }

    const _getMarketStats = async() => {
        try {
            setLoading(true);
            const api = new Api();
            const response = await axios.get(`https://api.rentcast.io/v1/markets?zipCode=${zipCode}`,{
                headers:{
                    'X-Api-Key': '0b5c390d81fc431e9b72dda95b275664'
                }
            });
           setMarketStats(response.data);
        //    setIsSearched(true);
        setLoading(false);
        props.navigation.navigate(SCREEN_ROUTES.searchListingScreen,{
            data:response.data,
            input:`Zip Code: ${zipCode}`,
            type:TABS['2']
        })
        }
        catch(e) {
            setLoading(false);
            alert(JSON.stringify(e?.response?.data?.message))
        }
    }
    const propertyTypes = [
        'Single Family',
        'Condo',
        'TownHouse',
        'Multi-Family',
        'Apartment',
        'Reset'
      ];
    const showPropertyTypesModalRef = useRef();
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
             <Modalize 
             adjustToContentHeight
             ref={showPropertyTypesModalRef}>
        <View style={{ padding: 16,paddingVertical:22,backgroundColor:COLORS.secondary }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',color:'white' }}>Property Type</Text>
          <Text style={{color:'white',paddingBottom:15}}>Please select one of the property types</Text>
          {propertyTypes.map(pT => (
              <TouchableOpacity
              key={pT}
              style={{paddingVertical:4,width:'100%'}}
              onPress={() => {
                 if(pT == 'Reset') {
                    setPropertyType('');
                    showPropertyTypesModalRef.current.close();
                 } else {
                    setPropertyType(pT);
                showPropertyTypesModalRef?.current?.close()
                 }
              }}
            >
              <Text style={{color:'white',fontSize:propertyType == pT ? 18 : 16,fontWeight:propertyType == pT ? '700' : 'normal'}}>{pT}</Text>
            </TouchableOpacity>
          ))}
          
        </View>
      </Modalize>
            <HeaderComponent />
            <Loader
            isVisible={loading}
            />
            <ScrollView>

            {
                isSearched ? null : 
                <View style={{
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
                        backgroundColor:!isPropertiesTab ?  'black' : 'transparent',
                        borderRadius:5,
                        justifyContent:'center',alignItems:'center'
    
                    }}>
                        <Text style={{color:'white',fontWeight:'bold'}}>Market Statistics</Text>
    
                    </TouchableOpacity>
                </View>
            }

             {
                isSearched ? 
                <View>
                    <TouchableOpacity
                    onPress={() => setIsSearched(false)}
                    style={{margin:5}}>
                        <MaterialCommunityIcons
                        name='keyboard-backspace'
                        color='white'
                        size={30}
                        />
                    </TouchableOpacity>



                     <SearchInputComponent
                     value={address}
                     onChangeText={value => setAddress(value)}
                     width={'100%'}
                    placeholder='Search off market properties'
                    icon={
                        <Ionicons
                            name='location-outline'
                            color='white'
                            size={19}
                        />
                    }
                />
                 <SearchInputComponent
                      value={propertyType}
                      onChangeText={() => showPropertyTypesModalRef.current.open()}
                     width={'90%'}
                    placeholder='03'
                    icon={
                        <FontAwesome
                            name='building-o'
                            color='white'
                            size={19}
                        />
                    }
                />
                    <View style={{flexDirection:'row',alignItems:'center',bottom:12}}>
                   
                <SearchInputComponent
                  value={bedrooms}
                  onChangeText={value => setBedrooms(value)}
                     width={'25%'}
                    placeholder='03'
                    icon={
                        <Ionicons
                        name='bed-outline'
                        color='white'
                        size={19}
                    />
                    }
                />
                <SearchInputComponent
                     width={'25%'}
                     value={bathrooms}
                     onChangeText={value => setBathrooms(value)}
                    placeholder='03'
                    icon={
                        <MaterialCommunityIcons
                        name='shower'
                        color='white'
                        size={19}
                    />
                    }
                />
                <SearchInputComponent
                value={radius}
                onChangeText={value => setRadius(value)}
                     width={'25%'}
                    placeholder='03'
                    icon={
                        <MaterialCommunityIcons
                        name='ruler'
                        color='white'
                        size={19}
                    />
                    }
                />
                    </View>
                    {/* <ScrollView contentContainerStyle={{flexGrow:1}}> */}
                    <FlatList
                 data={properties}
                //  contentContainerStyle={{marginTop:10}}
                 renderItem={({item}) => (
                    <View style={{
                        width:'100%',
                        borderBottomWidth:0.3,
                        borderColor:'white',
                        marginVertical:5,
                        paddingVertical:10,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        padding:10
                    }}>
                        <View>
                        <Text style={{
                            color:'white',
                            fontSize:15,fontWeight:'500',
                            width:'80%'
                        }}>{item.formattedAddress}</Text>
                        <Text style={{
                            color:'white',
                            fontSize:12,fontWeight:'400'
                        }}>{item?.bedrooms} Beds . {item?.bathrooms} Bathrooms . {item?.features?.roomCount} Rooms</Text>
                         <Text style={{
                            color:'white',
                            fontSize:12,fontWeight:'400'
                        }}>3 miles . 1 day ago</Text>
                            </View>
                            <Text style={{
                                color:COLORS.primary,
                                fontWeight:'bold',
                                fontSize:20,
                                right:12
                            }}>$1,227</Text>
                        </View>
                        
                 )}
                 />
                </View>
                :
                <View style={{ marginLeft: 20 }}>
                <Text style={{ color: 'white', marginTop: 20, textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>Search {isPropertiesTab ? 'Properties' : 'Market Statistics'}</Text>
                <Text style={{
                    color: 'white',
                    fontWeight: '300', width: '90%',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    marginTop: 10,
                    marginBottom: 20
                }}>Look up rent estimates, comps and market trends for any property in the US.</Text>

                 {
                    isPropertiesTab ? 
                    <View>
                         <SearchInputComponent
                    value={address}
                    onChangeText={value => setAddress(value)}
                    placeholder='Type City Name'
                    icon={
                        <Ionicons
                            name='location-outline'
                            color='white'
                            size={19}
                        />
                    }
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '95%',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                    <View
                        style={{
                            width: '25%',
                            borderWidth: 0.5,
                            borderColor: 'white'
                        }}
                    />
                    <View>
                        <Text style={{ color: 'white', fontSize: 11 }}>Property Features (Optionals)</Text>
                    </View>
                    <View
                        style={{
                            width: '25%',
                            borderWidth: 0.5,
                            borderColor: 'white'
                        }}
                    />
                </View>

                <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:20}}>
                <SearchInputComponent
                    value={propertyType}
                    onPress={() => showPropertyTypesModalRef.current.open()}
                    isButton={true}
                    onChangeText={value => setProperties(value)}
                    width={'48%'}
                    placeholder='Property Type'
                    icon={
                        <FontAwesome
                            name='building-o'
                            color='white'
                            size={19}
                        />
                    }
                />
                 <SearchInputComponent
                 value={bedrooms}
                 onChangeText={value => setBedrooms(value)}
                 width={'48%'}
                    placeholder='Bedrooms'
                    icon={
                        <Ionicons
                            name='bed-outline'
                            color='white'
                            size={19}
                        />
                    }
                />
                </View>

                <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <SearchInputComponent
                    value={bathrooms}
                    onChangeText={value => setBathrooms(value)}
                    width={'48%'}
                    placeholder='Bathroom'
                    icon={
                        <MaterialCommunityIcons
                            name='shower'
                            color='white'
                            size={19}
                        />
                    }
                />
                 <SearchInputComponent
                 value={radius}
                 onChangeText={value => setRadius(value)}
                 width={'48%'}
                    placeholder='Radius (Miles)'
                    icon={
                        <MaterialCommunityIcons
                            name='ruler'
                            color='white'
                            size={19}
                        />
                    }
                />
                </View>
                 </View>
                 :
                 <View>
                     <SearchInputComponent
                    value={zipCode}
                    onChangeText={value => setZipCode(value)}
                    placeholder='Zip Code'
                    icon={
                        <Ionicons
                            name='location-outline'
                            color='white'
                            size={19}
                        />
                    }
                />
                    </View>
                 }

                <TouchableOpacity 
                onPress={() => {
                  
                    if(isPropertiesTab) {
                        if(!address) {
                            showMessage({
                                message:'Please write the city name',
                                type:'danger'
                            });
                            return;
                        }
                        _searchProperty();
                    } else {
                        if(!zipCode) {
                            showMessage({
                                message:'Please write the zip code',
                                type:'danger'
                            });
                            return;
                        }
                        _getMarketStats()
                    }
                }}
                style={{
                    width:'100%',
                    alignSelf:'center',
                    height:50,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:COLORS.primary,
                    borderRadius:5,
                    marginTop:20
                }}>
                    <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Search {isPropertiesTab ? 'Properties' : 'Market Statistics'}</Text>
                </TouchableOpacity>

            </View>
             }
            </ScrollView>
          
        </View>
    )
}