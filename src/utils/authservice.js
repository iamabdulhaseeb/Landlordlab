import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async(user) => {
    await AsyncStorage.setItem('user',JSON.stringify(user));
}

export const getUser = async() => {
    const usr = await AsyncStorage.getItem('user');
    return JSON.parse(usr);
}