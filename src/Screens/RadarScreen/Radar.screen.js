import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../utils/Colors";
import CustomTabBar from "../../Components/BottomTab.component";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GradientSlider from "../../Components/GradientSlider.component";
import { Api } from "../../utils/Api/api";
import { API_URLS } from "../../utils/Api/API_URLS";
import axios from "axios";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import SearchInputComponent from "../../Components/SearchInput.component";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from "../../Components/Loader.component";
import HeaderComponent from "../../Components/Header.component";
import StateSelectorModalize from "../../Components/StatesSelectorModalize.component";
import { USA_STATES } from "../../utils/constants";
import { Modalize } from "react-native-modalize";
export default SearchProperty = props => {
    const TABS = {
        1:'Properties',
        2:'Markets'
    }
    const [loading,setLoading] = useState(false);
 

    const RADAR_OPTIONS = [
      {id:1,
        label:'Absentee Owner',
        criteria:  {"name":"isSameMailingOrExempt", "value":[1]}
      },
      {
        id:2,
        label:'Free & Clear Owners',
        criteria: {"name":"EquityPercent", "value":[[3,5]]}
      }
      ,
      {
        id:3,
        label:' Vacant Homes',
        criteria: {"name":"isMailVacant", "value":[1]},
      },
      {
        id:4,
        label:'Mechanic Liens',
        criteria: {"name":"LienType", "value":["MLN"]},
      }
      ,
      {
        id:5,
        label:'Tax Delinquent',
        criteria:{"name":"inTaxDelinquency", "value":[1]}
      },
      {
        id:6,
        label:'Pre Foreclosures',
        criteria:{"name":"ForeclosureStage", "value":["Preforeclosure"]}
      },
      {
        id:7,
        label:'Foreclosures',
        criteria:{"name":"ForeclosureStage", "value":["Preforeclosure-NTS"]}
      },
      {
        id:8,
        label:'Bank Owned',
        criteria:{"name":"ForeclosureStage", "value":["Bank Owned"]}
      }
    ];
    const [selectedRadarOptions,setSelectedRadarOptions] = useState([]);
    const [selectedRadarOptionsId,setSelectedRadarOptionsId] = useState([]);

   
    // const criteria = {
    //     "Criteria": 
    //   }

    const _getPropertiesFromCriteria = async() => {
        try {
          setLoading(true);
            const api = new Api();
            let new_cr = [...criteria];
            new_cr.push({"name":"State", "value":[state?.value]});
            new_cr.push({"name":"City", "value":[cityName]});
            const response = await axios.post('https://api.propertyradar.com/v1/properties?Start=0&Purchase=1',criteria ? {
              "Criteria":new_cr
            } : {},{
                headers:{
                    'Authorization':'Bearer 2504c542c3f6e79afa5737f6ef1be09655d20e86'  
                }
            });
            setLoading(false);
            props.navigation.navigate(SCREEN_ROUTES.searchListingScreen,{
              data:response.data.results,
              input:`${cityName}, ${state?.displayName}`,
              type:TABS['1'],
              isRadar:true
          })
        }
        catch(e) {
          setLoading(false);
            alert(JSON.stringify(e?.response?.data));
        }
    }

    
    // const _searchProperty = async() => {
    //     try {
    //         const api = new Api();
    //         const response = await axios.get(`https://api.propertyradar.com/v1/properties/P8A0E18D?Purchase=0&Fields=Overview`,{
    //             headers:{
    //                 'Authorization':'Bearer 2504c542c3f6e79afa5737f6ef1be09655d20e86'  
    //             }
    //         });
    //        alert(JSON.stringify(response.data))
    //     }
    //     catch(e) {
    //         alert(JSON.stringify(e))
    //     }
    // }
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

    const RadioButton = ({isSelected,onSelect,value}) => {
      return (
        <TouchableOpacity 
        onPress={onSelect}
        style={{
          width:'90%',
          height:55,
          flexDirection:'row',
          borderRadius:10,
          backgroundColor:COLORS.secondary,
          marginVertical:5,
          alignItems:'center',
          paddingLeft:10,
          alignSelf:'center',
        }}>
          <View
          style={{
            width:20,
            height:20,
            borderRadius:5,
            borderWidth:2,
            borderColor:'white',
            justifyContent:'center',
            alignItems:'center'
          }}
          >
          {
            isSelected &&   <View
            style={{
              width:10,
              height:10,
              backgroundColor:'white',
              borderRadius:3
            }}
            />
          }
            </View>
          <Text style={{color:'white',fontSize:14,paddingLeft:12}}>{value}</Text>
        </TouchableOpacity>
      )
    }
    const [cityName,setCityName] = useState('');
    const [state,setState] = useState('')
    const [criteria,setCriteria] = useState([]);
    const stateModalizeRef = useRef();
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Loader
            isVisible={loading}
            />
             <Modalize 
            modalHeight={500}
             ref={stateModalizeRef}>
        <View style={{ padding: 16,paddingVertical:22,backgroundColor:COLORS.secondary }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',color:'white' }}>Select State</Text>
          <Text style={{color:'white',paddingBottom:15}}>Please select one of the states</Text>
          <FlatList
          data={USA_STATES}
          renderItem={({item}) => (
            <TouchableOpacity
            key={item.value}
            style={{paddingVertical:4,width:'100%',justifyContent:'center',paddingLeft:10,height:50,marginVertical:6,alignSelf:'center',borderWidth:state?.value == item.value ? 2 :  0.5,borderColor:'white',borderRadius:10}}
            onPress={() => {
              setState(item);
              stateModalizeRef.current.close()
            }}
          >
            <Text style={{color:'white',fontSize:state?.value == item.value ? 18 : 16,fontWeight:state?.value == item.value ? '700' : 'normal'}}>{item.displayName}</Text>
          </TouchableOpacity>
          )}
          />
        
          
        </View>
      </Modalize>
            <HeaderComponent />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
             <View style={{margin:15}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'900'}}>LandlordLab Radar</Text>
              <Text style={{color:'white',fontSize:12,fontWeight:'300'}}>Exclusive feature, try searching properties and get access to the owners of properties!</Text>
             </View>
             <View
                style={{
                  width:'85%',
                  borderWidth:0.5,
                  borderColor:COLORS.secondary,
                  alignSelf:'center',
                  marginVertical:5
                }}
                />
            <SearchInputComponent
                      value={cityName}
                      onChangeText={value => setCityName(value)}
                     width={'90%'}
                    placeholder='City Name'
                    icon={
                        <AntDesign
                            name='search1'
                            color='white'
                            size={19}
                        />
                    }
                />
                 <SearchInputComponent
                 onPress={() => stateModalizeRef.current.open()}
                 isButton={true}
                      value={state?.displayName}
                      onChangeText={value => setState(value)}
                     width={'90%'}
                    placeholder='Your State'
                    icon={
                        <AntDesign
                            name='search1'
                            color='white'
                            size={19}
                        />
                    }
                />
                <View
                style={{
                  width:'85%',
                  borderWidth:0.5,
                  borderColor:COLORS.secondary,
                  alignSelf:'center',
                  marginVertical:12
                }}
                />
               <FlatList
               data={RADAR_OPTIONS}
               renderItem={({item}) => (
                <RadioButton
                isSelected={selectedRadarOptionsId?.includes(item.id)}
                value={item.label}
                onSelect={() => {
                 if(selectedRadarOptionsId?.includes(item.id)) {
                  const all_items = [...selectedRadarOptions];
                  const filtered_options = all_items.filter(option => option.id != item.id);

                  const all_ids = [...selectedRadarOptionsId];
                  const filtered_ids = all_ids.filter(ids => ids != item.id);

                  const all_criterias = [...criteria];
                  const filtered_criterias = all_criterias.filter(cr => cr.name != item.criteria.name);
                  setSelectedRadarOptions(filtered_options);
                  setSelectedRadarOptionsId(filtered_ids);
                  setCriteria(filtered_criterias);
                 } else {
                  const all_items = [...selectedRadarOptions];
                  const all_ids = [...selectedRadarOptionsId];
                  
                  all_items.push(item);
                  all_ids.push(item.id);

                  const all_criterias = [...criteria];
                  all_criterias.push(item.criteria);

                  setSelectedRadarOptions(all_items);
                  setSelectedRadarOptionsId(all_ids);
                  setCriteria(all_criterias);
                 }
                }}
                />
               )}
               />
{/* 
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
                        }}>{item.Address}</Text>
                        <Text style={{
                            color:'white',
                            fontSize:12,fontWeight:'400'
                        }}>{item?.Beds} Beds . {item?.Baths} Bathrooms . {item?.SqFt} Sqft</Text>
                         <Text style={{
                            color:'white',
                            fontSize:12,fontWeight:'400'
                        }}>{item?.AdvancedPropertyType}</Text>
                         <TouchableOpacity 
                         onPress={() => {
                            props.navigation.navigate(SCREEN_ROUTES.RadarPropertyDetail,{
                                radarId:item?.RadarID,
                                item:item
                            })
                         }}
                         style={{marginVertical:10}}>
                                <Text style={{
                                    color:COLORS.primary,
                                    fontSize:14,fontWeight:'bold'
                                }}>Contact Owner</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{
                                color:COLORS.primary,
                                fontWeight:'bold',
                                fontSize:20,
                                right:12
                            }}>${item?.AVM}</Text>
                           
                        </View>
                        
                 )}
                 /> */}
                  
            </ScrollView>
            {
                    cityName && state ? 
                    <TouchableOpacity 
                    onPress={_getPropertiesFromCriteria}
                    style={{
                      width:60,
                      height:60,
                      justifyContent:'center',
                      alignItems:'center',
                      backgroundColor:COLORS.primary,
                      borderRadius:60/2,
                      position:'absolute',
                      bottom:10,
                      right:10
                    }}>
                     <MaterialIcons
                     name='navigate-next'
                     color='white'
                     size={40}
                     />
                    </TouchableOpacity>
                    :
                    null
                   }
        </View>
    )
}