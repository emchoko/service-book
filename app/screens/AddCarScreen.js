import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Connection from './../constants/Connection';
import styles from './../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddCarScreen() {
    const licensePlate = 'CA3123PT';
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Добави кола</Text>
                </View>
                <View style={styles.fieldsContainer}>
                    <TextField
                        label='Регистрационен Номер'
                        value={licensePlate}
                        onChangeText={(text) => { }}
                    />
                </View>

            </ScrollView>
        </View>
    );
}