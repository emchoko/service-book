import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';

export default class AddClientScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Добави Клиент</Text>
                    </View>

                    <View style={styles.fieldsContainer}>
                        <Text style={styles.fieldLabel}>Мейл *</Text>
                        <TextInput
                            onChange={() => {}}
                            value={'email'}    
                        />

                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    titleContainer: {
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    fieldsContainer: {
        margin: 20
    },
    fieldLabel: {
        fontSize: 15
    }

});