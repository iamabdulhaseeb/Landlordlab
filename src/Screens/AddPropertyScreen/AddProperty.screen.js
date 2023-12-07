import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from "../../utils/Colors";

export default AddPropertyScreen = props => {
    const { width, height } = useWindowDimensions();

    const [propertyName, setPropertyName] = useState('');
    const [address, setAddress] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [livingArea, setLivingArea] = useState('');
    const [yearBuilt, setYearBuilt] = useState('');
    const [photo, setPhoto] = useState('');

    const handleAddProperty = () => {
        // Handle adding the property data
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 }}>
                <Ionicons
                    name='arrow-back'
                    color='white'
                    size={30}
                    onPress={() => props.navigation.goBack()}
                />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Property</Text>
                <View style={{ width: 30 }}></View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <View style={{ marginLeft: 20 }}>
                {/* <Text style={{ color: 'white', marginTop: 20, textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>New Property</Text> */}
                <Text style={{
                    color: 'white',
                    fontWeight: '300', width: '90%',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    marginTop: 10,
                    marginBottom: 20
                }}>Track your rental portfolio with real-time alerts and market updates.</Text>

                <Input
                    placeholder='Property Name'
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
                <Input
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
                 <Input
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
                <Input
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
                 <Input
                 width={'48%'}
                    placeholder='Bedrooms'
                    icon={
                        <MaterialCommunityIcons
                            name='ruler'
                            color='white'
                            size={19}
                        />
                    }
                />
                </View>


                <Input
                    placeholder='Living Area (sq.ft)'
                    icon={
                        <Ionicons
                            name='location-outline'
                            color='white'
                            size={19}
                        />
                    }
                />


<Input
                    placeholder='Year built in'
                    icon={
                        <Ionicons
                            name='location-outline'
                            color='white'
                            size={19}
                        />
                    }
                />

                <TouchableOpacity style={{
                    width:'100%',
                    alignSelf:'center',
                    height:50,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:COLORS.primary,
                    borderRadius:5,
                    marginTop:20
                }}>
                    <Text style={{
                        fontWeight:'bold',
                        fontSize:16,
                        color:'white'
                    }}>Add Property</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </View>
    )
}