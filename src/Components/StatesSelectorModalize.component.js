import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modalize from 'react-native-modalize';
import { USA_STATES } from '../utils/constants';

const StateSelectorModalize = ({modalRef}) => {
  const [selectedState, setSelectedState] = useState(null);
//   const modalRef = React.createRef();

  

  const handleStateSelect = (propertyType) => {
    setSelectedState(propertyType);
    modalRef.current.close();
  };

  return (
   <View>
      <Modalize ref={modalRef}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select State</Text>
          <Text>Please select one of the state</Text>
          {USA_STATES.map(state => (
              <TouchableOpacity
              key={state.value}
              onPress={() => handleStateSelect(state)}
            >
              <Text>{state?.displayName}</Text>
            </TouchableOpacity>
          ))}
          
        </View>
      </Modalize>
   </View>
  );
};

export default StateSelectorModalize;