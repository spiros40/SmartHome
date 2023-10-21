import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, CheckBox } from 'react-native';

const MultiSelectDropdown = ({ options, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleSelection = (itemValue) => {
    const updatedSelection = [...selectedItems];

    if (updatedSelection.includes(itemValue)) {
      // Item is already selected, remove it
      updatedSelection.splice(updatedSelection.indexOf(itemValue), 1);
    } else {
      // Item is not selected, add it
      updatedSelection.push(itemValue);
    }

    setSelectedItems(updatedSelection);
  };

  const renderCheckboxOption = (option) => (
    <TouchableOpacity
      key={option}
      style={styles.optionContainer}
      onPress={() => handleSelection(option)}
    >
      <CheckBox
        value={selectedItems.includes(option)}
        onValueChange={() => handleSelection(option)}
      />
      <Text style={styles.optionText}>{option}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            {selectedItems.length > 0 ? selectedItems.join(', ') : placeholder}
          </Text>
          <Text style={styles.arrow}>{isVisible ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={isVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option) => renderCheckboxOption(option))}
            <TouchableOpacity style={styles.doneButton} onPress={toggleModal}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    flex: 1,
  },
  arrow: {
    marginLeft: 5,
    fontSize:23,
    color:'#2196F3',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'rgba(155, 244, 90, 0.9)',
    padding: 10,
    borderRadius: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    color:"black",
    fontSize:16,
  },
  doneButton: {
    marginTop: 10,
    alignItems: 'flex-end',
    fontWeight:"bold",
    fontSize:20,
  },
  doneText: {
    fontSize:20,
    color:"white",
    backgroundColor:'#2196F3',
    padding:8,
  },
});

export default MultiSelectDropdown;
