import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Connection from './../constants/Connection';
import styles from './../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddCarScreen() {
    const licensePlate = 'CA3123PT';
    const data = [
        { value: 'BMW' },
        { value: 'Mercedes' },
        { value: 'Honda' },
    ];

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

                    <View style={styles.horizontalDropDowns}>
                        {/* https://www.npmjs.com/package/react-native-material-dropdown */}
                        {/* FIXME: https://medium.com/@ManningBooks/in-depth-styling-with-react-native-and-flexbox-ee1bda2c5b24 */}
                        <Dropdown
                            label='Марка'
                            data={data}
                        />
                        <Dropdown
                            label='Модел'
                            data={data}
                        />
                    </View>

                    <Dropdown
                        label='Година'
                        data={data}
                    />
                    <Dropdown
                        label='Вариация'
                        data={data}
                    />
                </View>

            </ScrollView>
        </View>
    );
}