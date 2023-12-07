import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientSlider = ({lowEstimation,highEstimation}) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, marginVertical: 5 }}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{
                ...styles.lowEstimation,
                
              }}>{lowEstimation}$</Text>
              <Text style={styles.lowEstimation}>Low Estimation</Text>
              </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.highEstimation}>{highEstimation}$</Text>
            <Text style={styles.highEstimation}>High Estimation</Text>

            </View>
            </View>
            <LinearGradient
                colors={['#0BC1DF', '#13ADE8', '#219AF3', '#3184FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.slider}
            />


            {/* <View>

                <View>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>$1227</Text>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>$1.27/sq.ft</Text>
                </View>

            </View> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // marginVertical: 15
    },
    slider: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 30,
    },
    lowEstimation: {
        color: 'white',
        fontSize:15,
        marginVertical:2
    },
    highEstimation: {
        color: 'white',
        fontSize:15,
        marginVertical:2
    },
});

export default GradientSlider;