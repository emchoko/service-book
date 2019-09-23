import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './../constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function StartServiceScreen(props) {

  const startService = () => {

  }

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Добави кола</Text>
          </View>

          <View style={styles.fieldsContainer}>
            <Button
              title='Започни обслужване'
              color='purple'
              accessibilityLabel='Започни обслужване'
              onPress={() => startService}
            />

            
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  )
}