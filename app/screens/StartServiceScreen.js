import React, { useReducer } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import Spinner from 'react-native-spinkit';
import styles from './../constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Divider from 'react-native-divider';
import { TextField } from 'react-native-material-textfield';

function reducer(state, action) {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        isLoading: true,
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
      }
    case 'fail':
      return {
        ...state,
        isLoading: false,
      }
    case 'cancel':
      return {
        ...state,
        isLoading: false,
      }
  }
}

const initialState = {
  isLoading: false,
}

export default function StartServiceScreen(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading } = state;

  const startService = () => {
    dispatch({ type: 'submit' });
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
              title='Сканирай За Номер'
              color='purple'
              accessibilityLabel='Започни обслужване'
              onPress={startService}
            />

            <Spinner 
              isVisisble={false}
              color='purple'
              size={30}
              type={'Bounce'}
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

            {/* Invisible Content */}
            
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  )
}