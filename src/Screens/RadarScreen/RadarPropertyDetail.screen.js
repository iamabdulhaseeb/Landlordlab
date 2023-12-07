import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Linking } from 'react-native';
import { COLORS } from "../../utils/Colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientSlider from "../../Components/GradientSlider.component";
import axios from "axios";
import { Api } from "../../utils/Api/api";
import Loader from "../../Components/Loader.component";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default RadarPropertyDetail = props => {
    const { params } = useRoute();
    const data = params?.item;
    const RadarId = params?.radarId;
    const TABS = {
        1: 'Properties',
        2: 'Market Statistics'
    }
    const isPropertyTab = params?.type == TABS['1'];
    const [loading,setLoading] = useState(false);
    const [ownerInfo,setOwnerInfo] = useState(null);
    const [portfolios,setPortfolios] = useState([]);
    const [portfolioIds,setPortfolioIds] = useState([]);
    const [user,setUser] = useState(null);

    const [properties, setProperties] = useState(data);
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            
            setUser(user);
        })
    },[])

    const _getMyRadarPortfolios = async() => {
        setLoading(true);
        firestore().collection('portfolios').where('userId','==',"S7ra2JONRCNL9pbmf4Ush32KT6U2").where('isRadar','==',true).get().then(res => {
            let myPortfoliosData = [];
            res.forEach(p => {
                myPortfoliosData.push({
                    ...p.data(),
                    docId:p.id
                });
            })
            setPortfolios(myPortfoliosData);
            setLoading(false);
        }).catch(e => {
            setLoading(false);
            console.log(e);
        });
        setLoading(false);
    }
    useEffect(() => {
       if(portfolios) {
        let portfolioIds = [];
        portfolios.map(item => {
           portfolioIds.push(item.id);
        })
       setPortfolioIds(portfolioIds);
       }
    },[portfolios]);
    useEffect(() => {
        if(user) {
            _getMyRadarPortfolios()
        }
    },[user])
    const _addToPortfolio = async(item) => {
        try {
            setLoading(true);
            const body = {
                isRadar:true,
                ...data,
                type:'Radar',
                userId:user?.uid,
                id:RadarId
            }
            
            firestore().collection('portfolios').add(body).then(res => {
                _getMyRadarPortfolios();
            }).catch(e => {
                console.log(e);
            });
        }   
        catch(e) {
            console.log(e);
        }
    }
    const _getDocId = (id) => {
        try {
            const filtered_portfolio = portfolios.filter(item => item.id == id);
            const docId = filtered_portfolio[0].docId;
           if(docId) {
            return docId;
           }
        }
        catch(e) {
            alert('error in getting doc id')
        }
    }
    const _removeFromPortfolio = async() => {
        try {
            setLoading(true);
            const documentId = _getDocId(RadarId);
            firestore().collection('portfolios').doc(documentId).delete().then(res => {
                _getMyRadarPortfolios();
            }).catch(e => {
                console.log(e);
                alert('something went wrong');
            })
            setLoading(false);
        }
        catch(e) {
            console.log('line 109',e);
            alert('something went wrong');
            setLoading(false);
        }
    }
    const IconTab = ({icon,label}) => {
        return (
            <View style={{flexDirection:'row',alignItems:'center',marginVertical:5}}>
                {icon}
                <Text style={{color:'white',fontSize:18,fontWeight:'400',paddingLeft:10}}>{label}</Text>
            </View>
        )
    }

    const _getContactsOfOwner = async() => {
        try {
            setLoading(true);
            const api = new Api();
            const response = await axios.get(`https://api.propertyradar.com/v1/properties/${RadarId}/persons?Purchase=1`,{
                headers:{
                    'Authorization':'Bearer 2504c542c3f6e79afa5737f6ef1be09655d20e86'  
                }
            });
            setLoading(false);
            setOwnerInfo(response.data.results)
           console.log(response.data);
        }
        catch(e) {
            setLoading(false);
            alert(JSON.stringify(e));
        }
    }

    const _getEmailOfOwner = async(PersonKey) => {
        try {
            setLoading(true);
            const api = new Api();
            const response = await axios.post(`https://api.propertyradar.com/v1/persons/${PersonKey}/Email?Purchase=1`,{

            },{
                headers:{
                    'Authorization':'Bearer 2504c542c3f6e79afa5737f6ef1be09655d20e86'  
                }
            });
            setLoading(false);
        } catch(e) {
            setLoading(false);
            alert(JSON.stringify(e?.response?.data));
        }
    }

    const _getPhoneOfOwner = async(PersonKey) => {
        try {
            setLoading(true);
            const api = new Api();
            const response = await axios.post(`https://api.propertyradar.com/v1/persons/${PersonKey}/Phone?Purchase=1`,{

            },{
                headers:{
                    'Authorization':'Bearer 2504c542c3f6e79afa5737f6ef1be09655d20e86'  
                }
            });
            setLoading(false);
        } catch(e) {
            setLoading(false);
            alert(JSON.stringify(e?.response?.data));
        }
    }
    useEffect(() => {
        _getContactsOfOwner();
    },[])

    const PropertyListItem = ({item}) => {
        const [showEmails,setShowEmails] = useState(false);
        const [showPhones,setShowPhones] = useState(false);
        return (
            <View style={{
                width:'96%',
                borderRadius:10,
                backgroundColor:COLORS.secondary,
                margin:5,
                padding:15
            }}>
             <Text style={{color:'white',fontSize:16,fontWeight:'bold',marginVertical:1.5}}>{item?.FirstName + " " + item?.LastName}</Text>
             <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>{item?.PrimaryResidence[0]?.Address}</Text>
            <View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingHorizontal:1,
                    marginVertical:5
                }}>
                    <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Emails</Text>
                    <Entypo
                    onPress={() => setShowEmails(prev => !prev)}
                    name={showEmails ? 'chevron-down' : 'chevron-up'}
                    color='white'
                    size={20}
                    />
                </View>
                {
                    showEmails ? 
                    <View>
                    {
                    item?.Email?.length > 0  ? item?.Email?.map(emails => (
                        <TouchableOpacity onPress={async() => {
                            await _getEmailOfOwner(item?.PersonKey);
                         }}>
                                                <Text style={{color:'white'}}>{emails?.linktext}</Text>
                        </TouchableOpacity>
                    ))
                    :
                    <Text style={{color:'white',fontSize:12,fontWeight:'300'}}>No Emails Found</Text>
                 }
                    </View>
                    :
                    null
                }
            </View>

            <View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingHorizontal:1,
                    marginVertical:5
                }}>
                    <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Contact Numbers</Text>
                    <Entypo
                    onPress={() => setShowPhones(prev => !prev)}
                    name={showPhones ? 'chevron-down' : 'chevron-up'}
                    color='white'
                    size={20}
                    />
                </View>
                {
                    showPhones ? 
                    <View>
                    {
                    item?.Phone?.length > 0  ? item?.Phome?.map(emails => (
                        <TouchableOpacity onPress={async() => {
                            await _getEmailOfOwner(item?.PersonKey);
                         }}>
                                                <Text style={{color:'white'}}>{emails?.linktext}</Text>
                        </TouchableOpacity>
                    ))
                    :
                    <Text style={{color:'white',fontSize:12,fontWeight:'300'}}>No Phone Numbers Found</Text>
                 }
                    </View>
                    :
                    null
                }
            </View>
           
             {
                item?.Phone?.map(phones => (
                    <TouchableOpacity onPress={async() => {
                        await _getPhoneOfOwner(item?.PersonKey);
                     }}>
                                            <Text style={{color:'white'}}>{JSON.stringify(phones?.linktext)}</Text>
                    </TouchableOpacity>
                ))
             }
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Loader
            isVisible={loading}
            />
            <View style={{ width: '100%', paddingLeft: 12, paddingTop: 12, height: 55, borderBottomWidth: 0.3, borderBottomColor: 'white',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10 }}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{
                        flexDirection: 'row', alignItems: 'center'
                    }}>
                    <MaterialCommunityIcons
                        name='keyboard-backspace'
                        color='white'
                        size={25}
                    />
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '500', paddingLeft: 12 }}>{'Property Info'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                    if(portfolioIds.includes(RadarId)) {
                        _removeFromPortfolio();
                    } else {
                        _addToPortfolio();
                    }
                }}
                style={{
                    width:35,
                    height:35,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:35/2,
                    borderColor:'white',
                    borderWidth:2,
                    backgroundColor:portfolioIds.includes(RadarId) ? 'white' : 'transparent'
                }}>
                    <AntDesign
                    name={portfolioIds?.includes(RadarId) ? 'heart' : 'hearto'}
                    color={portfolioIds?.includes(RadarId) ? 'red' : 'white'}
                    size={18}
                    />
                </TouchableOpacity>

                
            </View>
         
          <ScrollView contentContainerStyle={{flexGrow:1}}>

                
            <View style={{
                width:'96%',
                borderRadius:10,
                backgroundColor:COLORS.secondary,
                margin:5,
                padding:15
            }}>
             {data?.Address &&  <IconTab
              icon={
                <Ionicons
                name='location'
                color='white'
                size={22}
                />
              }
              label={data?.Address}
              />}
             {data?.AdvancedPropertyType &&  <IconTab
              icon={
                <MaterialCommunityIcons
                name='hoop-house'
                color='white'
                size={22}
                />
              }
              label={data?.AdvancedPropertyType}
              />}
              {data?.Beds &&  <IconTab
              icon={
                <MaterialCommunityIcons
                name='bed'
                color='white'
                size={22}
                />
              }
              label={`${data?.Beds} Bedrooms`}
              />}
              {data?.Baths &&  <IconTab
              icon={
                <MaterialCommunityIcons
                name='bathtub-outline'
                color='white'
                size={22}
                />
              }
              label={`${data?.Baths} Bathrooms`}
              />}
            </View>


            <View style={{
                width:'96%',
                borderRadius:10,
                backgroundColor:COLORS.secondary,
                margin:5,
                padding:15
            }}>
             {data?.AVM ?  <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>AVM : ${data?.AVM}</Text> : null}
            {data?.City ?  <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>City : {data?.City}</Text> : null}
            {data?.State ?   <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>State : {data?.State}</Text>: null}
            {data?.YearBuilt ?  <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>Year Built : {data?.YearBuilt}</Text> : null}
            {data?.ZipFive ?  <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>Zip Five : {data?.ZipFive}</Text> : null}
             <Text style={{color:'white',fontSize:15,marginVertical:1.5}}>For Sale : {data?.isListedForSale ? 'Yes' : "No"}</Text>

            </View>
            <Text style={{color:'white',fontSize:17,padding:12}}>Owner Info</Text>
            <FlatList
            data={ownerInfo}
            renderItem={({item}) => {
                
                return (
                   <PropertyListItem
                   item={item}
                   />
                )
            }}
            />
          </ScrollView>
        </View>
    )
}