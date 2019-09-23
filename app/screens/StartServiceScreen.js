import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './../constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Divider from 'react-native-divider';
import { TextField } from 'react-native-material-textfield';

export default function StartServiceScreen(props) {

  const startService = () => {

  }

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Започни обслужване</Text>
          </View>

          <View style={styles.fieldsContainer}>
            <Button
              title='Започни обслужване'
              color='purple'
              accessibilityLabel='Започни обслужване'
              onPress={() => startService}
            />
            <Divider
              style={styles.dividerStartService}
              borderColor='black'
              color='black'
              orientation='center'
            >
              ИЛИ
            </Divider>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Въведи ръчно</Text>
            </View>
            <TextField
              label='регистрационен номер'
              value={'СА0012РТ'}
              onChangeText={(text) => {
              }}
            />
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