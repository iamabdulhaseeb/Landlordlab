import React, { useState,useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    useWindowDimensions,
    ScrollView,
    Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from "../../utils/Colors";
import auth from '@react-native-firebase/auth';
import Loader from "../../Components/Loader.component";
import { showMessage } from "react-native-flash-message";
import Input from "../../Components/Input.component";
import { SCREEN_ROUTES } from "../../utils/Navigation/Routes";
import { getProducts, requestSubscription } from "react-native-iap";
export default myProfileScreen = props => {
    const { width, height } = useWindowDimensions();
    const [products,setProducts] = useState(null);
    const [newPassword,setNewPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);

    const _changePassword = () => {
        setLoading(true);
        const usr = auth().currentUser;
        usr.updatePassword(newPassword).then(res => {
            setLoading(false);
        }).catch(e => {
            setLoading(false);
        })
    }

    useEffect(() => {
        auth().onAuthStateChanged(user => {
        setUser(user);
        })
    },[])

    const changePassword = () => {
        if(!newPassword || newPassword?.length < 6) {
            alert('New Password should be minimum 6 char long');
            return;
        }
        setLoading(true);
        const user = auth().currentUser;
      
       
        user
          .updatePassword(newPassword)
          .then(() => {
            setLoading(false);
            showMessage({
                message:'Password changed successfully',
                type:'success',
                duration:3000
            })
            console.log('Password changed successfully');
          })
          .catch((error) => {
            console.log(error)
            setLoading(false);
            showMessage({
                message:'Password change failed, try again later',
                type:'danger',
                duration:3000
            })
          });
      };

      const _deleteAccount = () => {
      
        setLoading(true);
        const user = auth().currentUser;
      
        // Prompt the user to re-authenticate, if necessary (for security).
        // You might need to ask the user to re-enter their current password.
      
        // Then, update the password.
       
        user
          .delete()
          .then(() => {
            setLoading(false);
            showMessage({
                message:"User deleted successfully",
                type:'danger',
                duration:5000
            })
            props.navigation.navigate(SCREEN_ROUTES.login)
            // alert('User deleted successfully');
          })
          .catch((error) => {
            showMessage({
                message:"Something went wrong, try again please",
                type:'danger',
                duration:5000
            })
            setLoading(false);
          });
      };


    const handleAddProperty = () => {
        // Handle adding the property data
    }

   

    // const Input = ({ placeholder, icon, width,value,onChangeText }) => {
    //     return (
    //         <View style={{
    //             width: width ? width : '100%',
    //             height: 47,
    //             backgroundColor: 'black',
    //             alignSelf: 'center',
    //             borderRadius: 5,
    //             flexDirection: "row", alignItems: 'center', paddingLeft: 10,
    //             marginVertical: 3,

    //         }}>
    //             {icon}
    //             <TextInput
    //                 value={value}
    //                 onChangeText={onChangeText}
    //                 style={{ flex: 1, paddingLeft: 10,color:'white' }}
    //                 placeholder={placeholder}
    //                 placeholderTextColor="#fff"
    //             />
    //         </View>
    //     )
    // }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Loader
            isVisible={loading}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 }}>
                <Ionicons
                    name='arrow-back'
                    color='white'
                    size={30}
                    onPress={() => props.navigation.goBack()}
                />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>My Profile</Text>
                <View style={{ width: 30 }}></View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                {/* <TouchableOpacity
                onPress={() => {
                    getProducts({
                        skus:['landlordlabpro']
                    }).then(res => {
                      setProducts(res);
                      alert(JSON.stringify(res))
                    }).catch(e => {
                        alert(JSON.stringify(e));
                    })
                }}
                >
                    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>get products</Text>
                </TouchableOpacity> */}
               {
                products?.length >= 0 &&   <TouchableOpacity
                onPress={() => {
                    requestSubscription({
                        sku:'landlordlabpro'
                       }).then(result => {
                        alert(JSON.stringify(result))
                       }).catch(e => {
                        alert(JSON.stringify(e))
                       })
                }}
                >
                    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Subscribe</Text>
                </TouchableOpacity>
               }
               
                <View>
                    <View
                        // onPress={() => {
                        //     navigation.navigate(SCREEN_ROUTES.myProfile)
                        // }}
                        style={{
                            width: 150,
                            height: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: 150 / 2,
                            marginLeft: 10,
                            alignSelf: 'center'
                        }}>
                        <Text style={{
                            fontWeight: '900',
                            color: 'black',
                            fontSize: 55
                        }}>{user?.email[0]?.toUpperCase()}{user?.email[1]?.toUpperCase()}</Text>
                    </View>

                    <View style={{
                        width: '100%',
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 20,
                        backgroundColor: COLORS.secondary
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 17,
                            fontWeight: '500',
                            padding: 10
                        }}>Basic Information</Text>
                        <View
                            style={{ width: '100%', borderWidth: 0.4, borderColor: 'black', marginBottom: 10 }}
                        />
                       
                        <Input
                            placeholder={user?.email}
                            width={'94%'}
                            icon={
                                <MaterialCommunityIcons
                                    name='email'
                                    size={22}
                                    color={'white'}
                                />
                            }
                        />

                        {/* <TouchableOpacity style={{
                            width: '90%',
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.primary,
                            borderRadius: 8,
                            alignSelf: 'center',
                            margin: 10
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Changes</Text>
                        </TouchableOpacity> */}
                    </View>




                    <View style={{
                        width: '100%',
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 20,
                        backgroundColor: COLORS.secondary
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 17,
                            fontWeight: '500',
                            padding: 10
                        }}>Change Password</Text>
                        <View
                            style={{ width: '100%', borderWidth: 0.4, borderColor: 'black', marginBottom: 10 }}
                        />
                        {/* <Input
                            placeholder={'Old Password'}
                            width={'94%'}
                            icon={
                                <Ionicons
                                    name='lock-closed-outline'
                                    size={22}
                                    color={'white'}
                                />
                            }
                        /> */}
                        <Input
                            value={newPassword}
                            secureTextEntry={true}
                            onChangeText={value => setNewPassword(value)}
                            placeholder={'New Password'}
                            width={'94%'}
                            icon={
                                <Ionicons
                                    name='lock-closed-outline'
                                    size={22}
                                    color={'white'}
                                />
                            }
                        />

                        <TouchableOpacity 
                        onPress={changePassword}
                        style={{
                            width: '90%',
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.primary,
                            borderRadius: 8,
                            alignSelf: 'center',
                            margin: 10
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{
                        width: '100%',
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 20,
                        backgroundColor: COLORS.secondary
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 17,
                            fontWeight: '500',
                            padding: 10
                        }}>Delete Your Account</Text>
                        <View
                            style={{ width: '100%', borderWidth: 0.4, borderColor: 'black', marginBottom: 10 }}
                        />
                        <Text style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: '300',
                            padding: 10
                        }}>Deleting your account will permanently delete all of your saved properties, historical data and settings. This operation is final and cannot be undone.</Text>

                        <TouchableOpacity 
                        onPress={() => {
                            Alert.alert('Delete Account','Do you really want to delete your account?',[{text:"No"},{text:'Yes',style:'destructive',onPress:_deleteAccount}])
                        }}
                        style={{
                            width: '90%',
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#800000',
                            borderRadius: 8,
                            alignSelf: 'center',
                            margin: 10
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{
                        width: '100%',
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 20,
                        backgroundColor: COLORS.secondary
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 17,
                            fontWeight: '500',
                            padding: 10
                        }}>Logout</Text>
                        <View
                            style={{ width: '100%', borderWidth: 0.4, borderColor: 'black', marginBottom: 10 }}
                        />
                        <Text style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: '300',
                            padding: 10
                        }}>You will not be able to use the app until you login again</Text>

                        <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Logout','Do you really want to logout',[{text:"No"},{text:'Yes',onPress:() => {
                                auth().signOut().then(() => {
                                    props.navigation.replace(SCREEN_ROUTES.Auth)
                                }).catch(e => {
                                    alert(JSON.stringify(e))
                                })
                            }}])
                        }}
                        style={{
                            width: '90%',
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#800000',
                            borderRadius: 8,
                            alignSelf: 'center',
                            margin: 10
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>LOG OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}