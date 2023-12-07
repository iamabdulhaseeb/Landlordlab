import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modalize from 'react-native-modalize';

const PropertyTypeModal = ({modalRef}) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
//   const modalRef = React.createRef();

  const propertyTypes = [
    'Single Family',
    'Condo',
    'TownHouse',
    'Multi-Family',
    'Apartment',
  ];

  const handlePropertyTypeSelect = (propertyType) => {
    setSelectedPropertyType(propertyType);
    modalRef.current.close();
  };

  return (
    <Modalize ref={modalRef}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Property Type</Text>
          <Text>Please select one of the property types</Text>
          {propertyTypes.map(propertyType => (
              <TouchableOpacity
              key={propertyType}
              onPress={() => handlePropertyTypeSelect(propertyType)}
            >
              <Text>{propertyType}</Text>
            </TouchableOpacity>
          ))}
          
        </View>
      </Modalize>
  );
};

export default PropertyTypeModal;