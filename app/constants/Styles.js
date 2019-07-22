import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    },
    horizontalButtons: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    error: {
        color: 'red',
        fontSize: 15,
    }
});