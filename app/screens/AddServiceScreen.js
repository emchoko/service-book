import React from 'react';
import { View, Text, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import styles from './../constants/Styles';
import Fetcher from '../utils/Fetcher';

export default function AddServiceScreen() {

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Обслужване</Text>
        </View>

        <View style={styles.fieldsContainer}>

          <TextField
            label='Текущи километри'
            value='101000'
            keyboardType='numeric'
            onChangeText={(text) => { }}
          />

        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};