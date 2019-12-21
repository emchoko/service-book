import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center'
    },
    mailExtensionButton: {
        margin: 3,
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    horizontalDropdownsContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizontalDropdown: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 15,
        color: 'grey',
        marginTop: 20,
        marginBottom: 5,
    },
    divider: {
        marginTop: 20,
        marginBottom: 5,
    },
    dividerStartService: {
        marginTop: 100,
        marginBottom: 10,
    },
    fieldsContainer: {
        margin: 20,
        width: '80%',
    },
    fieldLabel: {
        fontSize: 15
    },
    horizontalButtons: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    horizontalContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    error: {
        color: 'red',
        fontSize: 15,
    },
    serviceIcon: {
        marginTop: 25,
        width: 50,
        height: 50
    },
});